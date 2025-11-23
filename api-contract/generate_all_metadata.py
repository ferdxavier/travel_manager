import yaml
import json
import os
import re

# ====================================================================
# --- CONFIGURAÇÃO DE CAMINHOS E EXCLUSÕES ---
# ====================================================================

# Diretório base onde o script está localizado (e onde a execução começa)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 1. Diretório de LEITURA (onde estão os arquivos YAML)
YAML_INPUT_DIR = os.path.join(BASE_DIR, "specs", "schemas")

# 2. Diretório RAIZ de ESCRITA (onde os modelos TS serão salvos em subpastas)
TS_OUTPUT_ROOT_DIR = os.path.join(BASE_DIR, "..", "app", "src", "generated-api", "models")


# Lista de arquivos (ou prefixos/nomes base) a serem IGNORADOS.
FILES_TO_IGNORE = [
    "common_error", 
    "health_check", 
    "timestamp",    
    "another_file_to_skip" 
]

# Nome da variável TypeScript para o objeto de detalhes do schema
TS_VAR_NAME = "SCHEMA_DETAILS" 

# Lista de propriedades a serem ignoradas na saída de schemas que são "Request" ou "Input"
PROPERTIES_TO_IGNORE_IN_INPUTS = ["id", "createdAt", "updatedAt"] 

# Lista de palavras-chave a serem ignoradas na extração de metadados (para não poluir)
KEYS_TO_EXCLUDE_FROM_METADATA = ['x-abstract', 'required', 'default', 'allOf'] 


# ====================================================================
# --- FUNÇÕES DE TRANSFORMAÇÃO E EXTRAÇÃO ---
# ====================================================================

def transform_schema_name(name):
    """
    Aplica as regras de renomeação de schemas para camelCase (para as chaves internas do objeto JSON).
    """
    if name and name[0].isupper():
        return name[0].lower() + name[1:]
    
    return name 

def format_example_value(example):
    """
    Formata o valor do 'example' (mantendo tipos, mas limpando strings).
    """
    if example is None:
        return None 
    elif isinstance(example, (int, float, bool, list, dict)):
        return example
    else:
        cleaned = str(example).strip()
        return cleaned if cleaned else None

def is_empty_value(value):
    """
    Verifica se um valor é considerado vazio (string vazia, None, lista/dict vazios).
    """
    return value is None or (isinstance(value, str) and value.strip() == '') or (isinstance(value, (list, dict)) and not value)

def extract_structured_details(yaml_data):
    """
    Extrai detalhes (TODOS os metadados relevantes) agrupados por Schema e Propriedade.
    
    Implementa a lógica de herança (allOf), exclusão de abstratos e filtragem de vazios.
    """
    result = {}
    
    if not yaml_data:
        return result

    resolved_schemas = {}
    
    # 1. Primeira passagem: Resolve a herança (allOf) para obter a definição completa de cada schema
    for schema_name_yaml, schema_data in yaml_data.items():
        
        if not isinstance(schema_data, dict):
             continue

        if schema_data.get('x-abstract') is True:
            resolved_schemas[schema_name_yaml] = {'properties': {}, 'original_data': schema_data}
            continue
        
        combined_properties = schema_data.get('properties', {}).copy()
        
        if 'allOf' in schema_data:
            
            all_property_blocks = []
            
            for ref_block in schema_data['allOf']:
                
                if '$ref' in ref_block:
                    ref_name = ref_block['$ref'].split('/')[-1]
                    
                    if ref_name in yaml_data:
                        ref_schema_data = yaml_data[ref_name]
                        all_property_blocks.append(ref_schema_data.get('properties', {}))
                        
                elif 'properties' in ref_block:
                    all_property_blocks.append(ref_block['properties'])
            
            # Lógica de Mesclagem: Mescla o Base com os Overrides.
            for prop_block in all_property_blocks:
                
                for prop_name, prop_data in prop_block.items():
                    
                    if prop_name not in combined_properties:
                        combined_properties[prop_name] = prop_data.copy()
                    else:
                        # Mesclagem rasa (shallow merge): Preserva chaves do original que não estão no override.
                        combined_properties[prop_name] = {**combined_properties[prop_name], **prop_data}

        # Mescla propriedades diretas de nível superior (se houver, que não é o caso aqui)
        combined_properties = {**combined_properties, **schema_data.get('properties', {})}

        resolved_schemas[schema_name_yaml] = {
            'properties': combined_properties,
            'original_data': schema_data 
        }


    # 2. Segunda passagem: Extrai e Filtra os metadados dos schemas RESOLVIDOS
    for schema_name_yaml, resolved_data in resolved_schemas.items():
        
        if resolved_data.get('original_data', {}).get('x-abstract') is True:
            continue
            
        schema_name_transformed = transform_schema_name(schema_name_yaml)
        schema_details = {}
        
        if 'properties' not in resolved_data:
            continue
        
        is_request_schema = schema_name_yaml.endswith('Request') or schema_name_yaml.endswith('Input')
            
        for prop_name, prop_data in resolved_data['properties'].items():
            
            if is_request_schema and prop_name in PROPERTIES_TO_IGNORE_IN_INPUTS:
                continue

            if '$ref' in prop_data:
                continue 

            prop_detail = {}

            # Itera sobre todas as chaves/valores da propriedade resolvida (Base + Override)
            for key, raw_value in prop_data.items():
                
                if key in KEYS_TO_EXCLUDE_FROM_METADATA:
                    continue
                
                # Tratamento especial para 'example' (limpeza de string)
                if key == 'example':
                    value = format_example_value(raw_value)
                # Tratamento especial para 'description' (limpeza de string)
                elif key == 'description':
                    value = raw_value.strip() if isinstance(raw_value, str) else raw_value
                # Tratamento especial para 'x-ui-label' (limpeza de string)
                elif key == 'x-ui-label':
                    value = raw_value.strip() if isinstance(raw_value, str) else raw_value
                else:
                    value = raw_value
                
                # FILTRAGEM: Só adiciona se o valor não for vazio/nulo (omite metadados vazios)
                if not is_empty_value(value):
                    # Se for x-ui-label, usamos a sintaxe de chave especial para o output final do TS
                    if key == 'x-ui-label':
                        prop_detail["['x-ui-label']"] = value
                    else:
                        prop_detail[key] = value

            
            # Só inclui a propriedade se houver metadados extraídos
            if prop_detail:
                schema_details[prop_name] = prop_detail
        
        if schema_details:
            result[schema_name_transformed] = schema_details

    return result

# ====================================================================
# --- FUNÇÃO PRINCIPAL ---
# ====================================================================

def process_all_yaml_files():
    """
    Varre o diretório de entrada, processa cada arquivo e salva no diretório de saída correspondente.
    """
    print("--- INÍCIO DO PROCESSO DE GERAÇÃO DE METADADOS TS ---")
    print(f"Diretório de Schemas YAML (Entrada): {os.path.abspath(YAML_INPUT_DIR)}")
    print(f"Diretório de Modelos TS (Saída): {os.path.abspath(TS_OUTPUT_ROOT_DIR)}")
    print(f"Arquivos a serem ignorados: {', '.join(FILES_TO_IGNORE)}")
    print("-" * 40)
    
    exports_list = []
    os.makedirs(TS_OUTPUT_ROOT_DIR, exist_ok=True)

    try:
        files_to_process = os.listdir(YAML_INPUT_DIR)
        
        # Filtrar apenas arquivos yaml/yml
        files_to_process = [f for f in files_to_process if f.endswith(('.yaml', '.yml'))]
        
        if not files_to_process:
            print(f"❌ ERRO CRÍTICO: Nenhum arquivo YAML/YML encontrado em: {os.path.abspath(YAML_INPUT_DIR)}")
            print("Certifique-se de que os seus schemas (ex: 'vehicle.yaml') estão neste diretório.")
            return

    except FileNotFoundError:
        print(f"❌ ERRO CRÍTICO: O diretório de entrada {os.path.abspath(YAML_INPUT_DIR)} não foi encontrado.")
        return

    for file_name in files_to_process:
        
        base_name = file_name.rsplit('.', 1)[0]
        
        if base_name in FILES_TO_IGNORE:
            print(f"⏩ IGNORANDO: {file_name} (na lista de exclusão)")
            continue
        
        yaml_file_path = os.path.join(YAML_INPUT_DIR, file_name)
        
        output_sub_dir = os.path.join(TS_OUTPUT_ROOT_DIR, base_name)
        os.makedirs(output_sub_dir, exist_ok=True)
        
        ts_output_path = os.path.join(output_sub_dir, f"{base_name}_structured_docs.ts")
        
        print(f"✅ PROCESSANDO: {file_name} ({yaml_file_path})")

        try:
            with open(yaml_file_path, 'r', encoding='utf-8') as f:
                yaml_data = yaml.safe_load(f)
            
            extracted_data = extract_structured_details(yaml_data)
        except Exception as e:
            print(f"   ❌ ERRO: Falha ao ler/analisar {file_name}: {e}")
            continue

        if not extracted_data:
            print(f"   AVISO: Nenhum schema final (não abstrato) extraído de {file_name}.")
            continue
        
        try:
            # 1. Formatação JSON padrão
            json_content = json.dumps(extracted_data, indent=2, ensure_ascii=False)
            
            # 2. Substituir a chave de string "['x-ui-label']" pelo formato de chave TypeScript desejado
            json_content_fixed = json_content.replace('"[\'x-ui-label\']":', "['x-ui-label']:")


            # 3. Geração do conteúdo TS
            ts_content = f"""// Este arquivo foi gerado automaticamente por {os.path.basename(__file__)}
// Fonte: {file_name}
// Estrutura: {{schema_name (camelCase): {{PropertyName: {{...todos os metadados relevantes...}} }} }}

export const {base_name.upper()}_{TS_VAR_NAME} = {json_content_fixed} as const;
"""
            with open(ts_output_path, 'w', encoding='utf-8') as f:
                f.write(ts_content)
            print(f"   SUCESSO: Gerado em {os.path.relpath(ts_output_path, BASE_DIR)}")
            
            exports_list.append(f"./{base_name}/{base_name}_structured_docs")
        
        except Exception as e:
            print(f"   ❌ ERRO: Falha ao escrever {ts_output_path}: {e}")
    
    # -----------------------------------------------------------
    # 7. CORREÇÃO DA GERAÇÃO/ATUALIZAÇÃO DO ARQUIVO DE ÍNDICE
    # -----------------------------------------------------------
    print("-" * 40)
    print("Processamento de schemas concluído. Iniciando atualização do arquivo de índice...")
    
    INDEX_TS_PATH = os.path.join(TS_OUTPUT_ROOT_DIR, "index.ts")

    # 1. Tenta ler o conteúdo existente para PRESERVAR os exports de modelo originais.
    existing_content = ""
    if os.path.exists(INDEX_TS_PATH):
        try:
            with open(INDEX_TS_PATH, 'r', encoding='utf-8') as f:
                existing_content = f.read().strip()
            print(f"   Conteúdo existente lido de {os.path.basename(INDEX_TS_PATH)}. Será PRESERVADO.")
        except Exception as e:
            print(f"   AVISO: Não foi possível ler o conteúdo existente. Criando novo conteúdo. Erro: {e}")
            existing_content = ""
            
    # Marcadores para encontrar e remover o bloco antigo de documentação
    START_MARKER = "// --- DOCUMENTAÇÃO ESTRUTURADA DE SCHEMAS"
    END_MARKER = "// ==================================================================================================================="

    # Remove o bloco de documentação antigo (se existir) para evitar duplicação.
    if START_MARKER in existing_content:
        # Preserva o conteúdo ANTES do bloco de documentação (os exports de modelos)
        start_index = existing_content.find(START_MARKER)
        
        # Encontra o fim da linha do bloco de documentação (após o último export)
        # Assume que o bloco termina após o último export e o último END_MARKER (se estiver lá)
        # O rstrip() remove quebras de linha/espaços em branco no final do conteúdo preservado.
        combined_content = existing_content[:start_index].rstrip() + "\n"
    else:
        # Não encontrou o bloco, usa todo o conteúdo existente
        combined_content = existing_content + "\n"


    if exports_list:
        
        # 2. Define o novo bloco de documentação
        new_docs_content = [
            "// ===================================================================================================================",
            "// --- DOCUMENTAÇÃO ESTRUTURADA DE SCHEMAS (Gerado por generate_ts.py) ---",
            "// Este bloco re-exporta todas as constantes de documentação (description/example/x-ui-label) para fácil acesso em um único ponto.",
            "// ===================================================================================================================",
            ""
        ]
        
        for export_path in sorted(exports_list): 
            new_docs_content.append(f"export * from '{export_path}';")
        
        new_docs_block = "\n".join(new_docs_content) + "\n"

        # Anexa o novo bloco de documentação
        if not combined_content.endswith('\n'):
            combined_content += '\n'
            
        combined_content += new_docs_block
            
        try:
            with open(INDEX_TS_PATH, 'w', encoding='utf-8') as f:
                f.write(combined_content)
            print(f"✅ SUCESSO: Arquivo de índice ({os.path.basename(INDEX_TS_PATH)}) atualizado com os exports de documentação.")
        except Exception as e:
            print(f"   ❌ ERRO: Falha ao escrever {INDEX_TS_PATH}: {e}")
    else:
        print("AVISO: Nenhuma entidade processada. O arquivo models/index.ts (documentação) não foi alterado.")

    print("-" * 40)
    print("✅ Geração de Metadados TS concluída!")

if __name__ == "__main__":
    # Verificação de dependência
    try:
        import yaml
    except ImportError:
        print("ERRO: A biblioteca 'pyyaml' não está instalada.")
        print("Por favor, instale com: pip install pyyaml")
    else:
        process_all_yaml_files()