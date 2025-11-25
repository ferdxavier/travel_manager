// Este arquivo foi gerado automaticamente por generate_all_metadata.py
// Fonte: reportReason.yaml
// Estrutura: {schema_name (camelCase): {PropertyName: {...todos os metadados relevantes...} } }

export const REPORTREASON_SCHEMA_DETAILS = {
  "createPassengerReportRequest": {
    "vehicleId": {
      "type": "string",
      "format": "uuid",
      "description": "ID do veículo (obtido via QR Code).",
      "example": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      ['x-ui-label']: "ID do Veículo"
    },
    "description": {
      "type": "string",
      "description": "Breve descrição do problema (máx. 250 caracteres).",
      "maxLength": 250,
      ['x-ui-label']: "Descrição do Problema"
    },
    "imageBase64": {
      "type": "string",
      "description": "Imagem opcional do problema em Base64.",
      "nullable": true,
      ['x-ui-label']: "Adicionar Foto (Opcional)"
    },
    "videoBase64": {
      "type": "string",
      "description": "Vídeo curto opcional do problema em Base64 (máx. 10MB).",
      "nullable": true,
      ['x-ui-label']: "Adicionar Vídeo (Opcional)"
    }
  },
  "createDriverReportRequest": {
    "userId": {
      "type": "string",
      "format": "uuid",
      "description": "ID do usuário do motorista. (Backend pode ignorar para triagem, mas é importante para auditoria).",
      "example": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
      ['x-ui-label']: "ID do Motorista"
    },
    "odometerReading": {
      "type": "number",
      "format": "integer",
      "description": "Leitura atual do hodômetro do veículo (em km).",
      "example": 125430,
      ['x-ui-label']: "Quilometragem (Km)"
    },
    "locationCoordinates": {
      "type": "string",
      "description": "Coordenadas GPS no momento do relato (ex: 'lat: -23.55, lon: -46.63').",
      "nullable": true,
      ['x-ui-label']: "Coordenadas GPS"
    }
  }
} as const;
