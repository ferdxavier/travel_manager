#!/bin/bash

# =======================================================================
# SCRIPT: CONSOLIDAÇÃO (BUNDLING) DA ESPECIFICAÇÃO OPENAPI MODULAR
# PROPOSITO: JUNTAR o openapi.yaml e todos os ficheiros $ref num único ficheiro,
#            o consolidated-spec.yaml, para que possa ser validado ou
#            consumido por geradores de código.
# =======================================================================

# Diretórios e Configurações
INPUT_SPEC="./openapi.yaml"
CONSOLIDATED_SPEC="./consolidated-spec.yaml" # Ficheiro de saída

echo "--- 1. Verificação de Pré-requisitos ---"
# Verificação do swagger-cli (necessário para consolidação)
if ! command -v swagger-cli &> /dev/null
then
  echo "ERRO: swagger-cli não encontrado. Necessário para a consolidação (bundling)."
  echo "Por favor, instale-o globalmente: npm install -g swagger-cli"
  exit 1
fi

# ==================================================================
# ✅ VERIFICAÇÃO SOLICITADA
# Se o ficheiro de entrada não for encontrado, exibe o erro e encerra (exit 1).
# ==================================================================
if [ ! -f "$INPUT_SPEC" ]; then
  echo "❌ ERRO: O ficheiro de especificação OpenAPI ('$INPUT_SPEC') não foi encontrado."
  echo "Certifique-se de que está a executar este script no diretório correto."
  exit 1
fi

echo "--- 2. Limpeza ---"
# Limpando o ficheiro consolidado anterior, se existir.
if [ -f "$CONSOLIDATED_SPEC" ]; then
  echo "Removendo o ficheiro consolidado anterior: $CONSOLIDATED_SPEC"
  rm -f "$CONSOLIDATED_SPEC"
fi

echo "--- 3. Consolidação (Bundling) da Especificação Modular ---"
echo "Consolidando '$INPUT_SPEC' para '$CONSOLIDATED_SPEC'..."

# Executa o bundling. O --dereference garante que todas as referências são resolvidas.
swagger-cli bundle "$INPUT_SPEC" -o "$CONSOLIDATED_SPEC" --dereference

if [ $? -ne 0 ]; then
  echo "=================================================================="
  echo "❌ ERRO na Consolidação (Bundling) da Especificação OpenAPI."
  echo "Verifique se todos os \$refs (caminhos e conteúdo) estão corretos."
  echo "=================================================================="
  exit 1
fi

echo "=================================================================="
echo "✅ CONSOLIDAÇÃO CONCLUÍDA COM SUCESSO!"
echo "O ficheiro consolidado e válido está em: $CONSOLIDATED_SPEC"
echo "=================================================================="