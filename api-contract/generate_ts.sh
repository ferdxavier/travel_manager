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

    # ==> MUDANÇA CRÍTICA: Usa a função containsElement para verificar se o nome deve ser ignorado.
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
echo "Entidades detectadas dinamicamente: ${ENTITIES[@]}"

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
# --- 3.5. NOVO PASSO: Limpeza de Modelos Abstratos/Auxiliares ---
# Remove explicitamente modelos que o OpenAPI Generator não conseguiu 
# ignorar via x-abstract: true.
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
        
        # Remove a linha de exportação exata (ex: 'export * from './VehicleCommonProperties';')
        # e linhas em branco subsequentes que podem ser criadas.
        perl -i -pe "s|^export \* from '\.\/$MODEL_NAME';\n*||g" "$INDEX_FILE"
        
        echo "Exportação removida com sucesso."
    fi
else
    echo "Modelo $MODEL_NAME.ts não encontrado (como esperado, se o x-abstract tiver funcionado). Nada a remover."
fi


echo "--- 4. Pós-Processamento: Reorganização de Modelos por Entidade ---"
MODELS_DIR="$OUTPUT_DIR/models"

# Executa modularização apenas se houver entidades detectadas
if [ ${#ENTITIES[@]} -gt 0 ] && [ -d "$MODELS_DIR" ]; then
    for ENTITY in "${ENTITIES[@]}"; do
        
        # 🟢 ALTERAÇÃO 1: Converte a primeira letra para minúscula (Ex: Vehicle -> vehicle)
        TARGET_ENTITY_NAME=$(echo "$ENTITY" | sed 's/\(.\)/\L\1/')
        
        # O TARGET_DIR agora usa o nome da entidade com a primeira letra minúscula (camelCase)
        TARGET_DIR="$MODELS_DIR/$TARGET_ENTITY_NAME"

        echo "Criando diretório modularizado: $TARGET_DIR (Base: $ENTITY)"
        mkdir -p "$TARGET_DIR"

        # Move TODOS os ficheiros que CONTÊM o nome da entidade, usando o wildcard abrangente.
        # Continua usando $ENTITY (PascalCase) para encontrar os nomes dos arquivos gerados.
        find "$MODELS_DIR" -maxdepth 1 -type f -name "*${ENTITY}*.ts" -exec mv {} "$TARGET_DIR/" \;

        if [ $? -eq 0 ]; then
            echo "Ficheiros de modelo '$ENTITY' movidos com sucesso para $TARGET_DIR."
        else
            echo "AVISO: Falha na movimentação de ficheiros para '$ENTITY'. Verifique a nomenclatura dos ficheiros gerados."
        fi
    done
else
    echo "AVISO: O diretório de modelos ($MODELS_DIR) não foi encontrado ou nenhuma entidade foi detectada. Pulando o passo 4."
fi

echo "--- 5. Pós-Processamento: Correção Abrangente dos Caminhos de Importação do Runtime ---"
# Corrige as referências a '../runtime' para '../../runtime'
if [ ${#ENTITIES[@]} -gt 0 ]; then
    for ENTITY in "${ENTITIES[@]}"; do
        # 🟢 ALTERAÇÃO 2A: Converte a primeira letra para minúscula para usar no caminho do diretório
        TARGET_ENTITY_NAME=$(echo "$ENTITY" | sed 's/\(.\)/\L\1/')
        
        # Usa o novo nome do diretório minúsculo para verificar a pasta
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
    
    # 🟢 ALTERAÇÃO 3: Converte a primeira letra para minúscula para usar no caminho de exportação
    TARGET_ENTITY_NAME=$(echo "$ENTITY" | sed 's/\(.\)/\L\1/')

    # 1. Correção para modelos principais 
    # Ex: export * from './Vehicle'; -> export * from './vehicle/Vehicle';
    perl -i -pe "s|export \* from '\.\/${ENTITY}';|export \* from '.\/${TARGET_ENTITY_NAME}\/${ENTITY}';|g" "$INDEX_FILE"

    # 2. Correção para modelos Request, Response e Update
    MODELS_TO_CHECK=("Create${ENTITY}Request" "Update${ENTITY}Request" "${ENTITY}Response")
    
    for MODEL_NAME in "${MODELS_TO_CHECK[@]}"; do
        # Verifica se a exportação existe antes de substituir
        if grep -q "export \* from '.\/${MODEL_NAME}';" "$INDEX_FILE"; then
            # Ex: export * from './CreateVehicleRequest'; -> export * from './vehicle/CreateVehicleRequest';
            perl -i -pe "s|export \* from '\.\/${MODEL_NAME}';|export \* from '.\/${TARGET_ENTITY_NAME}\/${MODEL_NAME}';|g" "$INDEX_FILE"
        fi
    done
done

echo "Ficheiro models/index.ts corrigido com sucesso."
else
    echo "Pulando o passo 6: models/index.ts não encontrado ou nenhuma entidade modularizada."
fi

# =======================================================================
# --- 7. Geração de Documentação Estruturada TS (Metadados de Schema) ---
# =======================================================================
echo "--- 7. Geração de Documentação Estruturada TS (Metadados de Schema) ---"
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
echo "As pastas de entidades estão agora em camelCase (e.g., /models/vehicle)."
echo "=================================================================="