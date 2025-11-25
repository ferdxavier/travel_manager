// Este arquivo foi gerado automaticamente por generate_all_metadata.py
// Fonte: serviceOrders.yaml
// Estrutura: {schema_name (camelCase): {PropertyName: {...todos os metadados relevantes...} } }

export const SERVICEORDERS_SCHEMA_DETAILS = {
  "serviceOrders": {
    "id": {
      "type": "string",
      "format": "uuid",
      "description": "ID único gerado pelo sistema."
    },
    "vehicleId": {
      "type": "string",
      "format": "uuid",
      "description": "ID do veículo ao qual a ordem de serviço está associada.",
      "example": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
    },
    "userId": {
      "type": "string",
      "format": "uuid",
      "description": "ID do usuário que inseriu/criou a ordem de serviço.",
      "example": "f0e9d8c7-b6a5-4321-fedc-ba9876543210"
    },
    "status": {
      "type": "string",
      "description": "Status atual da ordem de serviço.",
      "enum": [
        "open",
        "in_progress",
        "closed",
        "canceled"
      ]
    },
    "type": {
      "type": "string",
      "description": "Tipo de manutenção: interna (frota própria) ou externa (terceirizada).",
      "enum": [
        "internal",
        "external"
      ],
      "example": "internal"
    },
    "category": {
      "type": "string",
      "description": "Categoria da manutenção, focando na área do veículo.",
      "enum": [
        "engine_and_transmission",
        "chassis_and_suspension",
        "body_and_interior",
        "electric_system",
        "tires_and_wheels",
        "general_inspection"
      ],
      "example": "chassis_and_suspension"
    },
    "maintenanceNature": {
      "type": "string",
      "description": "Natureza da manutenção: preventiva (agendada), corretiva (necessária/quebra) ou preditiva (baseada em dados).",
      "enum": [
        "preventive",
        "corrective",
        "predictive"
      ],
      "example": "corrective"
    },
    "impact": {
      "type": "string",
      "description": "Impacto imediato no veículo: bloqueante (impede uso) ou não-bloqueante.",
      "enum": [
        "blocking",
        "necessary",
        "non_critical"
      ],
      "example": "blocking"
    },
    "priority": {
      "type": "string",
      "description": "Prioridade atribuída à ordem de serviço (afeta o SLA).",
      "enum": [
        "low",
        "medium",
        "high",
        "critical"
      ]
    },
    "description": {
      "type": "string",
      "description": "Descrição detalhada do problema ou serviço a ser realizado.",
      "maxLength": 500
    },
    "serviceDate": {
      "type": "string",
      "format": "date",
      "description": "Data em que o serviço foi agendado ou concluído.",
      "nullable": true,
      "example": "2025-11-24"
    },
    "cost": {
      "type": "number",
      "format": "float",
      "description": "Custo total da ordem de serviço, se aplicável.",
      "nullable": true,
      "example": 450.75
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Carimbo de data/hora da criação do registo."
    }
  }
} as const;
