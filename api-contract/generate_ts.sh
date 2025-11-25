#!/bin/bash

# =======================================================================
# FUNÇÃO: Verifica se um elemento está presente no array
# =======================================================================
containsElement () {
  local e match="$1"
  shift
  # Itera sobre os elementos restantes do array ($@)
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

# Diretórios e Configurações
INPUT_SPEC="./openapi.yaml"
OUTPUT_DIR="../app/src/generated-api"
ENTITY_PATHS_DIR="./specs/schemas" 
GENERATOR="typescript-fetch"

# =======================================================================
# Variável para desconsiderar arquivos (Coloque o nome do arquivo SEM a extensão .yaml)
# Use MINÚSCULAS para os nomes. Ex: "common_error"
# =======================================================================
IGNORED_ENTITIES=("common_error" "health_check" "timestamp") 

# =======================================================================
# LISTA EXPLÍCITA DE ENUMS GENÉRICOS (SEM PREFIXO DA ENTIDADE)
# Esses nomes de arquivo são gerados diretamente do schema ServiceOrders.
# =======================================================================
declare -a GENERIC_SERVICE_ORDER_ENUMS=("Status.ts" "Type.ts" "Category.ts" "MaintenanceNature.ts" "Impact.ts" "Priority.ts")

# =======================================================================
# LISTA EXPLÍCITA DE DTOs DE RELATO (BREAKS SUBSTRING MATCHING)
# Estes são os DTOs que o script precisa saber que pertencem à pasta 'reportreason'.
# =======================================================================
declare -a REPORT_REASON_DTOS=("PassengerReportReason.ts" "DriverReportReason.ts" "CreatePassengerReportRequest.ts" "CreateDriverReportRequest.ts")

echo "--- 1. Verificação de Pré-requisitos ---"
if ! command -v openapi-generator-cli &> /dev/null
then
echo "ERRO: openapi-generator-cli não encontrado."
echo "Por favor, instale-o globalmente: npm install @openapitools/openapi-generator-cli -g"
exit 1
fi

if [ ! -f "$INPUT_SPEC" ]; then
echo "ERRO: O ficheiro de especificação OpenAPI ('$INPUT_SPEC') não foi encontrado."
echo "Certifique-se de que está a executar este script no diretório correto."
exit 1
fi

echo "--- 1.5. Detecção Dinâmica de Entidades ---"
# Array para armazenar os nomes das entidades capitalizados (Ex: Driver, Vehicle)
ENTITIES=()

# Converte o caminho relativo para absoluto para garantir a leitura
FULL_ENTITY_PATHS_DIR=$(realpath "$ENTITY_PATHS_DIR")

# Encontra todos os ficheiros .yaml no diretório de schemas
for FILE in "$FULL_ENTITY_PATHS_DIR"/*.yaml; do
if [ -f "$FILE" ]; then
    # Obtém o nome do ficheiro (ex: common_error, driver)
    NAME_WITHOUT_EXT=$(basename "$FILE" .yaml)
    
    # Converte o nome do ficheiro para minúsculas para comparação robusta
    LOWERCASE_NAME=$(echo "$NAME_WITHOUT_EXT" | tr '[:upper:]' '[:lower:]')

    # ==> Verifica se o nome deve ser ignorado.
    if containsElement "$LOWERCASE_NAME" "${IGNORED_ENTITIES[@]}"; then
        echo "   -> Ignorando ficheiro: $NAME_WITHOUT_EXT"
        continue # Pula o processamento para este arquivo
    fi
    
    # Se não for ignorado, capitaliza a primeira letra (Ex: driver -> Driver)
    CAPITALIZED_NAME=$(echo "$NAME_WITHOUT_EXT" | sed 's/\(.\)/\U\1/')
    
    ENTITIES+=("$CAPITALIZED_NAME")
fi
done

if [ ${#ENTITIES[@]} -eq 0 ]; then
echo "AVISO: Nenhuma entidade modularizável foi detectada em '$ENTITY_PATHS_DIR'. A geração continuará sem modularização."
fi
echo "Entidades detectadas dinamicamente: $*{ENTITIES[@]}"

echo "--- 2. Limpeza (Remoção do diretório anterior) ---"
if [ -d "$OUTPUT_DIR" ]; then
echo "Removendo o diretório de saída anterior: $OUTPUT_DIR"
rm -rf "$OUTPUT_DIR"
if [ $? -ne 0 ]; then
echo "AVISO: Falha ao remover o diretório. A geração pode prosseguir, mas verifique as permissões."
else
echo "Limpeza concluída."
fi
else
echo "O diretório de saída ($OUTPUT_DIR) não existe. Não é necessária limpeza."
fi

echo "--- 3. Geração do Cliente API (typescript-fetch) ---"
# Comando em várias linhas com \ para evitar problemas de limite de linha
openapi-generator-cli generate \
-i "$INPUT_SPEC" \
-g "$GENERATOR" \
-o "$OUTPUT_DIR" \
--additional-properties=supportsES6=true,typescriptThreePlus=true,useSingleRequestParameter=true,modelPropertyNaming=camelCase,apiPackage=api,modelPackage=models \
--skip-validate-spec

# Verificação de Sucesso
if [ $? -ne 0 ]; then
echo "=================================================================="
echo "❌ ERRO na Geração do Cliente API."
echo "Verifique a consola para mensagens de erro do OpenAPI Generator."
echo "=================================================================="
exit 1
fi

# =======================================================================
# --- 3.5. Limpeza de Modelos Abstratos/Auxiliares ---
# =======================================================================
echo "--- 3.5. Limpeza de Modelos Abstratos/Auxiliares ---"
MODEL_NAME="VehicleCommonProperties"
MODEL_TO_DELETE="$OUTPUT_DIR/models/$MODEL_NAME.ts"
INDEX_FILE="$OUTPUT_DIR/models/index.ts"

if [ -f "$MODEL_TO_DELETE" ]; then
    echo "Removendo modelo auxiliar indesejado gerado: $MODEL_TO_DELETE"
    rm "$MODEL_TO_DELETE"
    
    # CRÍTICO: Removendo a exportação deste modelo do index.ts
    if [ -f "$INDEX_FILE" ]; then
        echo "Removendo exportação de $MODEL_NAME de $INDEX_FILE"
        perl -i -pe "s|^export \* from '\.\/$MODEL_NAME';\n*||g" "$INDEX_FILE"
        echo "Exportação removida com sucesso."
    fi
else
    echo "Modelo $MODEL_NAME.ts não encontrado. Nada a remover."
fi


echo "--- 4. Pós-Processamento: Reorganização de Modelos por Entidade ---"
MODELS_DIR="$OUTPUT_DIR/models"

# Executa modularização apenas se houver entidades detectadas
if [ ${#ENTITIES[@]} -gt 0 ] && [ -d "$MODELS_DIR" ]; then
    for ENTITY in "${ENTITIES[@]}"; do
        
        # Converte a primeira letra para minúscula (Ex: ServiceOrders -> serviceOrders)
        TARGET_ENTITY_NAME=$(echo "$ENTITY" | sed 's/\(.\)/\L\1/')
        
        TARGET_DIR="$MODELS_DIR/$TARGET_ENTITY_NAME"

        echo "Criando diretório modularizado: $TARGET_DIR (Base: $ENTITY)"
        mkdir -p "$TARGET_DIR"

        # --------------------------------------------------------------------------------------------------
        # TRATAMENTO ESPECIAL PARA REPORTREASON
        # Deve mover os DTOs explicitamente nomeados que não possuem o prefixo da entidade.
        # --------------------------------------------------------------------------------------------------
        if [ "$ENTITY" == "ReportReason" ]; then
            echo "   -> Movendo ficheiros específicos de ReportReason (com nomes não convencionais)..."
            for REPORT_FILE in "${REPORT_REASON_DTOS[@]}"; do
                FILE_PATH="$MODELS_DIR/$REPORT_FILE"
                if [ -f "$FILE_PATH" ]; then
                    mv "$FILE_PATH" "$TARGET_DIR/"
                    echo "      -> Movido: $REPORT_FILE"
                fi
            done
            
            # Pula o find genérico, pois os arquivos de ReportReason não seguem o padrão *ReportReason*.ts
            continue 
        fi
        
        # --------------------------------------------------------------------------------------------------
        # TRATAMENTO GENÉRICO (para Vehicle, Driver, ServiceOrders)
        # --------------------------------------------------------------------------------------------------
        
        # 1. Move DTOs e Modelos com o nome da entidade (e.g., ServiceOrders.ts, CreateDriverRequest.ts)
        #
        # CORREÇÃO CRÍTICA: Se a entidade for 'Driver', excluímos arquivos que contenham 'Report' para
        # evitar o BUG de mover 'CreateDriverReportRequest' (que já foi movido acima se ReportReason existir).
        
        # Cria a expressão de exclusão
        EXCLUDE_EXPRESSION=""
        if [ "$ENTITY" == "Driver" ]; then
            EXCLUDE_EXPRESSION='! -name "*Report*.ts"'
        fi
        
        # Executa o find e move os arquivos.
        # Usa um loop while/read para processar os resultados do find de forma segura.
        # O eval é necessário para que a variável $EXCLUDE_EXPRESSION seja interpretada corretamente pelo find.
        eval find "$MODELS_DIR" -maxdepth 1 -type f -name "*${ENTITY}*.ts" $EXCLUDE_EXPRESSION -print0 | while IFS= read -r -d $'\0' FILE; do
            FILE_NAME=$(basename "$FILE")
            mv "$FILE" "$TARGET_DIR/"
            echo "      -> Movido: $FILE_NAME"
        done
        
        # 2. TRATAMENTO ESPECÍFICO PARA ENUMS GENÉRICOS DE SERVICEORDERS
        if [ "$ENTITY" == "ServiceOrders" ]; then
            echo "   -> Movendo Enums genéricos relacionados (Status, Priority, etc.)..."
            for GENERIC_ENUM in "${GENERIC_SERVICE_ORDER_ENUMS[@]}"; do
                FILE_PATH="$MODELS_DIR/$GENERIC_ENUM"
                if [ -f "$FILE_PATH" ]; then
                    # Mover o Enum
                    mv "$FILE_PATH" "$TARGET_DIR/"
                    echo "      -> Movido: $GENERIC_ENUM"
                fi
            done
        fi
        
        if [ $? -eq 0 ]; then
            echo "Ficheiros de modelo e Enums '$ENTITY' movidos com sucesso para $TARGET_DIR."
        else
            echo "AVISO: Falha na movimentação de ficheiros para '$ENTITY'. Verifique a nomenclatura dos ficheiros gerados."
        fi
    done
else
    echo "AVISO: O diretório de modelos ($MODELS_DIR) não foi encontrado ou nenhuma entidade foi detectada. Pulando o passo 4."
fi

# ... Resto dos Passos 5, 6 e 7 (manter inalterados) ...

echo "--- 5. Pós-Processamento: Correção Abrangente dos Caminhos de Importação do Runtime ---"
# Corrige as referências a '../runtime' para '../../runtime'
if [ ${#ENTITIES[@]} -gt 0 ]; then
    for ENTITY in "${ENTITIES[@]}"; do
        # Converte a primeira letra para minúscula para usar no caminho do diretório
        TARGET_ENTITY_NAME=$(echo "$ENTITY" | sed 's/\(.\)/\L\1/')
        
        ENTITY_DIR="$MODELS_DIR/$TARGET_ENTITY_NAME"

        if [ -d "$ENTITY_DIR" ]; then
            echo "Corrigindo imports de runtime para entidade: $ENTITY (Diretório: $TARGET_ENTITY_NAME)"
            
            # Encontra todos os ficheiros .ts no novo diretório da entidade
            find "$ENTITY_DIR" -type f -name "*.ts" -print0 | while IFS= read -r -d $'\0' FILE; do
                # Procura por '../runtime' e substitui por '../../runtime'
                perl -i -pe "s|'\.\.\/runtime'|'\.\.\/\.\.\/runtime'|g" "$FILE"
            done
            
            echo "Caminhos de runtime corrigidos em $ENTITY_DIR."
        fi
    done
else
    echo "Pulando o passo 5: Nenhuma entidade modularizada para correção."
fi

echo "--- 6. Pós-Processamento: Correção dos Exports em models/index.ts ---"
INDEX_FILE="$MODELS_DIR/index.ts"
if [ ${#ENTITIES[@]} -gt 0 ] && [ -f "$INDEX_FILE" ]; then
echo "Corrigindo caminhos de exportação em: $INDEX_FILE"

for ENTITY in "${ENTITIES[@]}"; do
    
    # Converte a primeira letra para minúscula para usar no caminho de exportação
    TARGET_ENTITY_NAME=$(echo "$ENTITY" | sed 's/\(.\)/\L\1/')

    # 1. CRÍTICO: Correção abrangente para ficheiros que contêm o nome da entidade (e.g., ServiceOrders.ts, CreateDriverRequest.ts)
    # A regex agora captura qualquer nome de ficheiro que contenha o nome da ENTIDADE CAPITALIZADO.
    # Exemplo: '.\/CreateDriverRequest' será substituído por './driver/CreateDriverRequest'
    perl -i -pe "s|export \* from '\.\/([^']*${ENTITY}[^']*)';|export \* from '.\/${TARGET_ENTITY_NAME}\/\1';|g" "$INDEX_FILE"


    # 2. TRATAMENTO ESPECÍFICO PARA REPORTREASON (Corrige exportação de DTOs não convencionais)
    # Garante que os DTOs de ReportReason sejam explicitamente corrigidos para o caminho './reportReason/'
    if [ "$ENTITY" == "ReportReason" ]; then
        echo "   -> Corrigindo exportações de DTOs de ReportReason..."
        for REPORT_FILE in "${REPORT_REASON_DTOS[@]}"; do
            # Remove a extensão .ts do nome do ficheiro para obter o nome da exportação
            EXPORT_NAME=$(basename "$REPORT_FILE" .ts)
            
            # Define a exportação CORRETA
            CORRECT_EXPORT="export * from '.\/${TARGET_ENTITY_NAME}\/${EXPORT_NAME}';"

            # A regex procura por QUALQUER exportação que contenha o nome do DTO (mesmo que com o caminho incorreto 'driver/')
            # e a substitui pela exportação correta. Isso garante a limpeza e o caminho final correto.
            perl -i -pe "s|export \* from '.\/.*${EXPORT_NAME}';|${CORRECT_EXPORT}|g" "$INDEX_FILE"
            
            echo "      -> Exportação de ${EXPORT_NAME} corrigida para ${TARGET_ENTITY_NAME}."
        done
    fi

    # 3. TRATAMENTO ESPECÍFICO PARA ENUMS GENÉRICOS DE SERVICEORDERS
    if [ "$ENTITY" == "ServiceOrders" ]; then
        echo "   -> Corrigindo exportações de Enums genéricos (Status, Priority, etc.)..."
        for GENERIC_ENUM in "${GENERIC_SERVICE_ORDER_ENUMS[@]}"; do
            # Remove a extensão .ts do nome do ficheiro para obter o nome da exportação
            EXPORT_NAME=$(basename "$GENERIC_ENUM" .ts)
            
            # Substitui a exportação genérica pela exportação modularizada
            perl -i -pe "s|export \* from '\.\/${EXPORT_NAME}';|export \* from '.\/${TARGET_ENTITY_NAME}\/${EXPORT_NAME}';|g" "$INDEX_FILE"
        done
    fi

done

echo "Ficheiro models/index.ts corrigido com sucesso."
else
    echo "Pulando o passo 6: models/index.ts não encontrado ou nenhuma entidade modularizada."
fi

# =======================================================================
# --- 7. Geração de Documentação Estruturada TS (Metadados de Schema) ---
# =======================================================================
echo "--- 7. Geração de Documentação Estruturada TS (Metadatos de Schema) ---"
echo "Aguardando 1 segundo para garantir a estabilidade do sistema de arquivos..."
sleep 1

# Chama o script Python que gera os arquivos *_structured_docs.ts e atualiza models/index.ts
python3 generate_all_metadata.py

if [ $? -ne 0 ]; then
    echo "=================================================================="
    echo "❌ ERRO na Geração da Documentação Estruturada (generate_ts.py)."
    echo "Verifique a consola para mensagens de erro do script Python."
    echo "=================================================================="
    exit 1
fi
echo "Geração de documentação estruturada concluída com sucesso."

echo "=================================================================="
echo "✅ Geração e Pós-Processamento concluído com sucesso!"
echo "A estrutura modularizada está em: $OUTPUT_DIR"
echo "As pastas de entidades estão agora em camelCase (e.g., /models/serviceorders)."
echo "=================================================================="