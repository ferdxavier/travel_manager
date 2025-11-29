#!/bin/bash

# Este script usa a versão do OpenAPI Generator 7.17.0 para gerar
# um projeto Spring Boot 3.x e Java 21 (LTS).

# --- CONFIGURAÇÕES DE VERSÃO (Mais Novas e Estáveis) ---
CLI_VERSION="7.17.0" # A versão que queremos usar
SPEC_FILE="openapi.yaml"
OUTPUT_DIR="../api/generated-api"
CONFIG_FILE="config.json"

# Versão da CLI do OpenAPI Generator (7.17.0, conforme solicitado)
OPENAPI_CLI="openapi-generator-cli.jar"
# URL construída dinamicamente com a variável CLI_VERSION para garantir consistência e evitar especificar o número diretamente
OPENAPI_URL="https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${CLI_VERSION}/openapi-generator-cli-${CLI_VERSION}.jar"

echo "🚗 Iniciando a Geração da API Spring Boot (Versão $CLI_VERSION)..."
echo "------------------------------------------------------"

# 1. Verificar se o arquivo de especificação existe
if [ ! -f "$SPEC_FILE" ]; then
    echo "❌ ERRO: O arquivo de especificação \"$SPEC_FILE\" não foi encontrado no diretório atual."
    echo "Por favor, certifique-se de que ele está presente para continuar."
    exit 1
fi

# 2. Verificar/Baixar a ferramenta OpenAPI Generator CLI
if [ ! -f "$OPENAPI_CLI" ]; then
    echo "⚠️ OpenAPI Generator CLI não encontrado. Baixando a versão $CLI_VERSION..."
    if command -v wget &> /dev/null; then
        # Usa o URL de download e renomeia para o nome simples
        wget "$OPENAPI_URL" -O "$OPENAPI_CLI"
    elif command -v curl &> /dev/null; then
        # Usa o URL de download e renomeia para o nome simples
        curl -o "$OPENAPI_CLI" "$OPENAPI_URL"
    else
        echo "❌ ERRO: Nem 'wget' nem 'curl' estão instalados. Instale um para baixar a CLI ou coloque o '$OPENAPI_CLI' manualmente."
        exit 1
    fi
    if [ $? -ne 0 ]; then
        echo "❌ ERRO ao baixar o OpenAPI Generator CLI. Abortando."
        exit 1
    fi
    echo "✅ Download concluído."
fi

# 3. Criar o arquivo de configuração (config.json) se não existir
if [ ! -f "$CONFIG_FILE" ]; then
    echo "⚙️ Criando o arquivo de configuração ($CONFIG_FILE) para Java 21 e Spring Boot 3.x mais estável..."
    cat << EOF > "$CONFIG_FILE"
{
  "dateLibrary": "java8",
  "java8": true,
  "useJakartaEe": true,
  "useSpringBoot3": true,
  "javaVersion": "21",
  "useLombok": false,
  "interfaceOnly": true,
  "skipDefaultInterface": false,
  "implicitHeaders": true,
  "documentationProvider": "springdoc"
}
EOF
    echo "✅ Arquivo de configuração criado com sucesso."
fi

# 4. Limpar o diretório de saída (para garantir uma nova geração limpa)
if [ -d "$OUTPUT_DIR" ]; then
    echo "🧹 Limpando o diretório de saída anterior: $OUTPUT_DIR"
    rm -rf "$OUTPUT_DIR"
fi

# 5. Executar a geração do código
echo "🚀 Gerando o código Spring Boot no diretório $OUTPUT_DIR..."
# O parâmetro 'javaVersion: 21' forçará o pom.xml a usar o Java 21
# O uso da CLI 7.17.0 garantirá que as dependências Spring Boot 3.x e SpringDoc mais recentes sejam escolhidas.
java -jar "$OPENAPI_CLI" generate \
  -i "$SPEC_FILE" \
  -g spring \
  -o "$OUTPUT_DIR" \
  --api-package "com.travelmanager.api" \
  --model-package "com.travelmanager.model" \
  --invoker-package "com.travelmanager.invoker" \
  --artifact-id "travel-manager-api" \
  --group-id "com.travelmanager" \
  -c "$CONFIG_FILE"

# 6. Verificar o status da execução
if [ $? -eq 0 ]; then
    echo "------------------------------------------------------"
    echo "✨ SUCESSO! Projeto gerado com Spring Boot 3.x e Java 21 em: $OUTPUT_DIR"
    echo "PRÓXIMO PASSO: Navegue para o diretório e compile: cd $OUTPUT_DIR && ./mvnw clean install"
    echo "ATENÇÃO: Verifique manualmente o pom.xml para confirmar que a versão do parent é a 3.x mais estável disponível."
else
    echo "------------------------------------------------------"
    echo "❌ FALHA na geração do projeto. Verifique as mensagens de erro acima."
fi