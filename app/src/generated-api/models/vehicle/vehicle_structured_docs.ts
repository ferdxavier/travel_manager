// Este arquivo foi gerado automaticamente por generate_all_metadata.py
// Fonte: vehicle.yaml
// Estrutura: {schema_name (camelCase): {PropertyName: {...todos os metadados relevantes...} } }

export const VEHICLE_SCHEMA_DETAILS = {
  "vehicle": {
    "licensePlate": {
      "type": "string",
      "description": "Placa do veículo. Formato Mercosul (LLLNLNN).",
      "example": "ABC1F34",
      "minLength": 8,
      "maxLength": 8,
      "pattern": "^[a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2}$",
      ['x-ui-label']: "Placa"
    },
    "model": {
      "type": "string",
      "description": "Modelo e nome do veículo.",
      "example": "520 HP",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Modelo"
    },
    "vehicleManufacturer": {
      "type": "string",
      "description": "Fabricante do veículo.",
      "example": "Scânia",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Fabricante (Marca)"
    },
    "modelYear": {
      "type": "integer",
      "description": "Ano do Modelo do veículo.",
      "example": 2024,
      "minimum": 1980,
      "maximum": 2099,
      ['x-ui-label']: "Ano do Modelo"
    },
    "manufacturerYear": {
      "type": "integer",
      "description": "Ano de fabricação do veículo.",
      "example": 2023,
      "minimum": 1980,
      "maximum": 2099,
      ['x-ui-label']: "Ano de Fabricação"
    },
    "renavan": {
      "type": "string",
      "description": "Número do RENAVAN do veículo.",
      "example": "4566546465",
      "minLength": 6,
      "maxLength": 10,
      ['x-ui-label']: "Número do RENAVAN"
    },
    "passengerNumber": {
      "type": "integer",
      "description": "Em caso de veículo de transporte, o número de passageiros.",
      "example": 50,
      "minimum": 1,
      "maximum": 80,
      ['x-ui-label']: "Nº de Passageiros"
    },
    "motorNumber": {
      "type": "string",
      "description": "Número do motor do veículo.",
      "example": "20234565",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Número do Motor"
    },
    "chassisNumber": {
      "type": "string",
      "description": "Número do chassis do veículo.",
      "example": "BDH546SDFG565465SD5656BR",
      "minLength": 10,
      "maxLength": 40,
      ['x-ui-label']: "Número do Chassi"
    },
    "fleetNumber": {
      "type": "integer",
      "description": "Número interno que corresponte ao id do veículo da frota da empresa.",
      "example": 1803,
      "minimum": 1,
      "maximum": 99999999,
      ['x-ui-label']: "Número de Frota (ID Interno)"
    },
    "fuelTankCapacity": {
      "type": "number",
      "format": "float",
      "description": "Capacidade do tanque de combustivel do veículo.",
      "example": 500.5,
      "minimum": 1,
      "maximum": 10000,
      ['x-ui-label']: "Capacidade do Tanque em (Litros)"
    },
    "entryMileage": {
      "type": "integer",
      "description": "Quilometragem do veículo na entrada da empresa (no cadastro).",
      "example": 3000000,
      "minimum": 0,
      "maximum": 10000000,
      ['x-ui-label']: "Quilometragem de Entrada (Km)"
    },
    "averageConsumption": {
      "type": "number",
      "format": "float",
      "description": "Média de Quilômetros por litro de conbustivel.",
      "example": 2.6,
      "minimum": 0.1,
      "maximum": 50.0,
      ['x-ui-label']: "Consumo Médio (Km/L)"
    },
    "bodyManufacturer": {
      "type": "string",
      "description": "Fabricante da carroceria.",
      "example": "Marcopolo",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Fabricante da Carroceria"
    },
    "bodyModel": {
      "type": "string",
      "description": "Nome do modelo da carroceria.",
      "example": "G6 1200",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Modelo da Carroceria"
    },
    "axesNumber": {
      "type": "integer",
      "description": "Número de eixos que o veículo possui.",
      "example": 3,
      "minimum": 2,
      "maximum": 20,
      ['x-ui-label']: "Número de Eixos"
    },
    "engineDescription": {
      "type": "string",
      "description": "Descrição do motor.",
      "example": "B10 M Intercooler",
      "minLength": 3,
      "maxLength": 100,
      ['x-ui-label']: "Descrição do Motor"
    },
    "hasBathroom": {
      "type": "boolean",
      "description": "Se o veículo possui banheiro",
      "example": true,
      ['x-ui-label']: "Possui banheiro"
    },
    "status": {
      "type": "string",
      "enum": [
        "available",
        "maintenance",
        "retired"
      ],
      "description": "Status operacional atual/desejado do veículo.",
      ['x-ui-label']: "Status Operacional"
    },
    "id": {
      "type": "string",
      "format": "uuid",
      "description": "ID único gerado pelo sistema.",
      "example": 35
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp de criação do registro.",
      "example": "2025-25-01"
    }
  },
  "createVehicleRequest": {
    "licensePlate": {
      "type": "string",
      "description": "Placa do veículo. Formato Mercosul (LLLNLNN).",
      "example": "ABC1F34",
      "minLength": 8,
      "maxLength": 8,
      "pattern": "^[a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2}$",
      ['x-ui-label']: "Placa"
    },
    "model": {
      "type": "string",
      "description": "Modelo e nome do veículo.",
      "example": "520 HP",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Modelo"
    },
    "vehicleManufacturer": {
      "type": "string",
      "description": "Fabricante do veículo.",
      "example": "Scânia",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Fabricante (Marca)"
    },
    "modelYear": {
      "type": "integer",
      "description": "Ano do Modelo do veículo.",
      "example": 2024,
      "minimum": 1980,
      "maximum": 2099,
      ['x-ui-label']: "Ano do Modelo"
    },
    "manufacturerYear": {
      "type": "integer",
      "description": "Ano de fabricação do veículo.",
      "example": 2023,
      "minimum": 1980,
      "maximum": 2099,
      ['x-ui-label']: "Ano de Fabricação"
    },
    "renavan": {
      "type": "string",
      "description": "Número do RENAVAN do veículo.",
      "example": "4566546465",
      "minLength": 6,
      "maxLength": 10,
      ['x-ui-label']: "Número do RENAVAN"
    },
    "passengerNumber": {
      "type": "integer",
      "description": "Em caso de veículo de transporte, o número de passageiros.",
      "example": 50,
      "minimum": 1,
      "maximum": 80,
      ['x-ui-label']: "Nº de Passageiros"
    },
    "motorNumber": {
      "type": "string",
      "description": "Número do motor do veículo.",
      "example": "20234565",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Número do Motor"
    },
    "chassisNumber": {
      "type": "string",
      "description": "Número do chassis do veículo.",
      "example": "BDH546SDFG565465SD5656BR",
      "minLength": 10,
      "maxLength": 40,
      ['x-ui-label']: "Número do Chassi"
    },
    "fleetNumber": {
      "type": "integer",
      "description": "Número interno que corresponte ao id do veículo da frota da empresa.",
      "example": 1803,
      "minimum": 1,
      "maximum": 99999999,
      ['x-ui-label']: "Número de Frota (ID Interno)"
    },
    "fuelTankCapacity": {
      "type": "number",
      "format": "float",
      "description": "Capacidade do tanque de combustivel do veículo.",
      "example": 500.5,
      "minimum": 1,
      "maximum": 10000,
      ['x-ui-label']: "Capacidade do Tanque em (Litros)"
    },
    "entryMileage": {
      "type": "integer",
      "description": "Quilometragem do veículo na entrada da empresa (no cadastro).",
      "example": 3000000,
      "minimum": 0,
      "maximum": 10000000,
      ['x-ui-label']: "Quilometragem de Entrada (Km)"
    },
    "averageConsumption": {
      "type": "number",
      "format": "float",
      "description": "Média de Quilômetros por litro de conbustivel.",
      "example": 2.6,
      "minimum": 0.1,
      "maximum": 50.0,
      ['x-ui-label']: "Consumo Médio (Km/L)"
    },
    "bodyManufacturer": {
      "type": "string",
      "description": "Fabricante da carroceria.",
      "example": "Marcopolo",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Fabricante da Carroceria"
    },
    "bodyModel": {
      "type": "string",
      "description": "Nome do modelo da carroceria.",
      "example": "G6 1200",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Modelo da Carroceria"
    },
    "axesNumber": {
      "type": "integer",
      "description": "Número de eixos que o veículo possui.",
      "example": 3,
      "minimum": 2,
      "maximum": 20,
      ['x-ui-label']: "Número de Eixos"
    },
    "engineDescription": {
      "type": "string",
      "description": "Descrição do motor.",
      "example": "B10 M Intercooler",
      "minLength": 3,
      "maxLength": 100,
      ['x-ui-label']: "Descrição do Motor"
    },
    "hasBathroom": {
      "type": "boolean",
      "description": "Se o veículo possui banheiro",
      "example": true,
      ['x-ui-label']: "Possui banheiro"
    },
    "status": {
      "type": "string",
      "enum": [
        "available",
        "maintenance",
        "retired"
      ],
      "description": "Status operacional atual/desejado do veículo.",
      ['x-ui-label']: "Status Operacional"
    }
  },
  "updateVehicleRequest": {
    "licensePlate": {
      "type": "string",
      "description": "Placa do veículo. Formato Mercosul (LLLNLNN).",
      "example": "ABC1F34",
      "minLength": 8,
      "maxLength": 8,
      "pattern": "^[a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2}$",
      ['x-ui-label']: "Placa"
    },
    "model": {
      "type": "string",
      "description": "Modelo e nome do veículo.",
      "example": "520 HP",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Modelo"
    },
    "vehicleManufacturer": {
      "type": "string",
      "description": "Fabricante do veículo.",
      "example": "Scânia",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Fabricante (Marca)"
    },
    "modelYear": {
      "type": "integer",
      "description": "Ano do Modelo do veículo.",
      "example": 2024,
      "minimum": 1980,
      "maximum": 2099,
      ['x-ui-label']: "Ano do Modelo"
    },
    "manufacturerYear": {
      "type": "integer",
      "description": "Ano de fabricação do veículo.",
      "example": 2023,
      "minimum": 1980,
      "maximum": 2099,
      ['x-ui-label']: "Ano de Fabricação"
    },
    "renavan": {
      "type": "string",
      "description": "Número do RENAVAN do veículo.",
      "example": "4566546465",
      "minLength": 6,
      "maxLength": 10,
      ['x-ui-label']: "Número do RENAVAN"
    },
    "passengerNumber": {
      "type": "integer",
      "description": "Em caso de veículo de transporte, o número de passageiros.",
      "example": 50,
      "minimum": 1,
      "maximum": 80,
      ['x-ui-label']: "Nº de Passageiros"
    },
    "motorNumber": {
      "type": "string",
      "description": "Número do motor do veículo.",
      "example": "20234565",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Número do Motor"
    },
    "chassisNumber": {
      "type": "string",
      "description": "Número do chassis do veículo.",
      "example": "BDH546SDFG565465SD5656BR",
      "minLength": 10,
      "maxLength": 40,
      ['x-ui-label']: "Número do Chassi"
    },
    "fleetNumber": {
      "type": "integer",
      "description": "Número interno que corresponte ao id do veículo da frota da empresa.",
      "example": 1803,
      "minimum": 1,
      "maximum": 99999999,
      ['x-ui-label']: "Número de Frota (ID Interno)"
    },
    "fuelTankCapacity": {
      "type": "number",
      "format": "float",
      "description": "Capacidade do tanque de combustivel do veículo.",
      "example": 500.5,
      "minimum": 1,
      "maximum": 10000,
      ['x-ui-label']: "Capacidade do Tanque em (Litros)"
    },
    "entryMileage": {
      "type": "integer",
      "description": "Quilometragem do veículo na entrada da empresa (no cadastro).",
      "example": 3000000,
      "minimum": 0,
      "maximum": 10000000,
      ['x-ui-label']: "Quilometragem de Entrada (Km)"
    },
    "averageConsumption": {
      "type": "number",
      "format": "float",
      "description": "Média de Quilômetros por litro de conbustivel.",
      "example": 2.6,
      "minimum": 0.1,
      "maximum": 50.0,
      ['x-ui-label']: "Consumo Médio (Km/L)"
    },
    "bodyManufacturer": {
      "type": "string",
      "description": "Fabricante da carroceria.",
      "example": "Marcopolo",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Fabricante da Carroceria"
    },
    "bodyModel": {
      "type": "string",
      "description": "Nome do modelo da carroceria.",
      "example": "G6 1200",
      "minLength": 2,
      "maxLength": 20,
      ['x-ui-label']: "Modelo da Carroceria"
    },
    "axesNumber": {
      "type": "integer",
      "description": "Número de eixos que o veículo possui.",
      "example": 3,
      "minimum": 2,
      "maximum": 20,
      ['x-ui-label']: "Número de Eixos"
    },
    "engineDescription": {
      "type": "string",
      "description": "Descrição do motor.",
      "example": "B10 M Intercooler",
      "minLength": 3,
      "maxLength": 100,
      ['x-ui-label']: "Descrição do Motor"
    },
    "hasBathroom": {
      "type": "boolean",
      "description": "Se o veículo possui banheiro",
      "example": true,
      ['x-ui-label']: "Possui banheiro"
    },
    "status": {
      "type": "string",
      "enum": [
        "available",
        "maintenance",
        "retired"
      ],
      "description": "Status operacional atual/desejado do veículo.",
      ['x-ui-label']: "Status Operacional"
    }
  }
} as const;
