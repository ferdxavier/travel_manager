// Este arquivo foi gerado automaticamente por generate_all_metadata.py
// Fonte: driver.yaml
// Estrutura: {schema_name (camelCase): {PropertyName: {...todos os metadados relevantes...} } }

export const DRIVER_SCHEMA_DETAILS = {
  "driver": {
    "id": {
      "type": "string",
      "format": "uuid",
      "description": "ID único gerado pelo sistema."
    },
    "name": {
      "type": "string",
      "description": "Nome do motorista.",
      "example": "Fernando Castro de Abreu"
    },
    "cpf": {
      "type": "string",
      "description": "Número do CPF (apenas dígitos).",
      "example": "06556256359"
    },
    "rg": {
      "type": "string",
      "description": "Número do RG (ex: MG 13.569.569).",
      "example": "MG 13569569"
    },
    "dateBirth": {
      "type": "string",
      "format": "date",
      "description": "Data de Nascimento (formato YYYY-MM-DD).",
      "example": "1985-06-15"
    },
    "cnhNumber": {
      "type": "string",
      "description": "Número da Carteira Nacional de Habilitação (CNH).",
      "example": "2536565936616546"
    },
    "validityCnh": {
      "type": "string",
      "format": "date",
      "description": "Data de validade da CNH.",
      "example": "2027-10-25"
    },
    "validityToxicological": {
      "type": "string",
      "format": "date",
      "description": "Data de validade do exame toxicológico.",
      "example": "2024-03-01"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp de criação do registro."
    }
  },
  "createDriverRequest": {
    "name": {
      "type": "string",
      "description": "Nome do motorista.",
      "example": "Fernando Castro de Abreu",
      "minLength": 3,
      "maxLength": 60,
      ['x-ui-label']: "Nome Completo"
    },
    "cpf": {
      "type": "string",
      "description": "Número do CPF (apenas 11 dígitos).",
      "example": "06556256359",
      "minLength": 11,
      "maxLength": 11,
      "pattern": "^[0-9]{11}$",
      ['x-ui-label']: "CPF"
    },
    "rg": {
      "type": "string",
      "description": "Número do RG ou Carteira de Identidade.",
      "example": "13569569",
      "minLength": 3,
      "maxLength": 15,
      ['x-ui-label']: "RG"
    },
    "dateBirth": {
      "type": "string",
      "format": "date",
      "description": "Data de Nascimento (YYYY-MM-DD). Requer validação de idade (+18) no código da API.",
      "example": "1985-06-15",
      ['x-ui-label']: "Data de Nascimento"
    },
    "cnhNumber": {
      "type": "string",
      "description": "Número da Carteira Nacional de Habilitação (CNH).",
      "example": "2536565936616546",
      "maxLength": 15,
      "pattern": "^[0-9]{8,15}$",
      ['x-ui-label']: "Número da CNH"
    },
    "validityCnh": {
      "type": "string",
      "format": "date",
      "description": "Data de validade da CNH. Requer validação para ser no futuro no código da API.",
      "example": "2027-10-25",
      ['x-ui-label']: "Validade da CNH"
    },
    "validityToxicological": {
      "type": "string",
      "format": "date",
      "description": "Data de validade do exame toxicológico. Requer validação para ser no futuro no código da API.",
      "example": "2024-03-01",
      ['x-ui-label']: "Validade do Exame Toxicológico"
    }
  }
} as const;
