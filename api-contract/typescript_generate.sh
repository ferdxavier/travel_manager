#!/bin/bash

# =======================================================================
# SCRIPT: Geração de Cliente API (TypeScript/Fetch) - MODO CONSOLIDADO
# Propósito: 1. Verifica a existência da especificação consolidada.
#            2. Gera o cliente TypeScript (DTOs e APIs) para o Frontend.
#            3. Roda o script Python para gerar os metadados de UI.
#
# PRÉ-REQUISITO: O ficheiro './consolidated-spec.yaml' deve ser gerado 
# manualmente (ou por outro script) antes de executar este.
# =======================================================================

# Diretórios e Configurações
# O ficheiro de entrada principal é agora o consolidado, assumindo que já existe.
INPUT_SPEC_CONSOLIDATED="./openapi.yaml"
# O diretório de saída que deve ser usado pelo seu app frontend (e.g., React/Angular/Vue)
OUTPUT_DIR="../app/src/generated-api" 
# O gerador escolhido
GENERATOR="typescript-fetch"
# Nome do script vizinho que gera os metadados estruturados de UI
METADATA_SCRIPT="./generate_metadata_ts.py"

echo "--- 1. Verificação de Pré-requisitos e Ficheiro de Contrato ---"

# --- VERIFICAÇÃO DE PRÉ-REQUISITOS ---
if ! command -v openapi-generator-cli &> /dev/null
then
  echo "ERRO: openapi-generator-cli não encontrado."
  echo "Por favor, instale-o globalmente: npm install @openapitools/openapi-generator-cli -g"
  exit 1
fi

if ! command -v python3 &> /dev/null
then
  echo "ERRO: python3 não encontrado."
  echo "Por favor, instale o Python 3."
  exit 1
fi

if [ ! -f "$METADATA_SCRIPT" ]; then
  echo "ERRO: O script de metadados ('$METADATA_SCRIPT') não foi encontrado."
  echo "Certifique-se de que ele está no mesmo diretório que este script."
  exit 1
fi

# --- VERIFICAÇÃO DO FICHEIRO CONSOLIDADO (NOVO REQUISITO) ---
if [ ! -f "$INPUT_SPEC_CONSOLIDATED" ]; then
  echo "=================================================================="
  echo "❌ ERRO: O ficheiro de especificação consolidada ('$INPUT_SPEC_CONSOLIDATED') não foi encontrado."
  echo "Por favor, execute o processo de consolidação primeiro (ex: com o Redocly CLI)."
  echo "O processo de geração não pode continuar sem o ficheiro consolidado."
  echo "=================================================================="
  exit 1
fi

echo "Pré-requisitos OK. Ficheiro de especificação consolidada encontrado."

echo "--- 2. Limpeza (Remoção do diretório anterior) ---"
if [ -d "$OUTPUT_DIR" ]; then
  echo "Removendo o diretório de saída anterior: $OUTPUT_DIR"
  rm -rf "$OUTPUT_DIR" 
  if [ $? -ne 0 ]; then
    echo "AVISO: Falha ao remover o diretório. Verifique as permissões."
  else
    echo "Limpeza de Diretório Frontend concluída."
  fi
else
  echo "O diretório de saída ($OUTPUT_DIR) não existe. Não é necessária limpeza."
fi

echo "--- 3. Geração do Contrato API (typescript-fetch) ---"
echo "Usando o gerador '$GENERATOR' para gerar um contrato TypeScript a partir de '$INPUT_SPEC_CONSOLIDATED'."

# Comando de Geração
# Propriedades adicionais:
# supportsES6=true          -> Usa sintaxe ES6 (Promises, etc.)
# typescriptThreePlus=true  -> Otimizado para TS 3+
# useSingleRequestParameter=true -> Agrupa todos os parâmetros em um único objeto (DTO) para chamadas de API
# modelPropertyNaming=camelCase  -> Usa camelCase para nomes de propriedades (TypeScript style)
openapi-generator-cli generate \
-i "$INPUT_SPEC_CONSOLIDATED" \
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

echo "=================================================================="
echo "✅ Geração do Contrato TypeScript concluída!"
echo "Iniciando a geração dos Metadados estruturados para o Frontend..."
echo "=================================================================="

# --- PASSO ADICIONAL: Geração de Metadados de UI ---
python3 "$METADATA_SCRIPT"

if [ $? -ne 0 ]; then
  echo "=================================================================="
  echo "❌ ERRO na Geração dos Metadados ('$METADATA_SCRIPT')."
  echo "Verifique a consola para mensagens de erro do script Python."
  echo "=================================================================="
  exit 1
fi

echo "=================================================================="
echo "🎉 FLUXO CONCLUÍDO COM SUCESSO!"
echo "Contrato TypeScript e Metadados de UI gerados."
echo "Todos os DTOs e Metadados estão em: $OUTPUT_DIR"
echo "=================================================================="