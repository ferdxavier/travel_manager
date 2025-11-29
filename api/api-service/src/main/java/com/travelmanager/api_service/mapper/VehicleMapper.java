package com.travelmanager.api_service.mapper;

import com.travelmanager.api_service.model.VehicleEntity;
import com.travelmanager.model.CreateVehicleRequest;
// DTO de Resposta CORRETO para a operação createVehicle e getVehicleById (resolve erro 1)
import com.travelmanager.model.Vehicle;

import org.springframework.stereotype.Component;

/**
 * Classe responsável por mapear entre DTOs (contrato OpenAPI) e a Entidade JPA.
 * Garante a conversão correta de tipos, especialmente para o StatusEnum.
 */
@Component
public class VehicleMapper {

    /**
     * Mapeia CreateVehicleRequest DTO (entrada) para VehicleEntity (JPA).
     */
    public VehicleEntity toEntity(CreateVehicleRequest dto) {
        if (dto == null) {
            return null;
        }

        VehicleEntity entity = new VehicleEntity();

        // Mapeamento dos campos
        entity.setLicensePlate(dto.getLicensePlate());
        entity.setModel(dto.getModel());
        entity.setVehicleManufacturer(dto.getVehicleManufacturer());
        entity.setModelYear(dto.getModelYear());
        entity.setManufacturerYear(dto.getManufacturerYear());
        entity.setRenavan(dto.getRenavan());
        entity.setPassengerNumber(dto.getPassengerNumber());
        entity.setMotorNumber(dto.getMotorNumber());
        entity.setChassisNumber(dto.getChassisNumber());
        entity.setFleetNumber(dto.getFleetNumber());
        entity.setFuelTankCapacity(dto.getFuelTankCapacity());
        entity.setEntryMileage(dto.getEntryMileage());
        entity.setAverageConsumption(dto.getAverageConsumption());
        entity.setBodyManufacturer(dto.getBodyManufacturer());
        entity.setBodyModel(dto.getBodyModel());
        entity.setAxesNumber(dto.getAxesNumber());
        entity.setEngineDescription(dto.getEngineDescription());
        entity.setHasBathroom(dto.getHasBathroom());

        // Mapeamento do Status: Enum (DTO) para String (Entidade)
        // CORREÇÃO: Uso do .getValue() para obter a String (resolve Error 2)
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus().getValue());
        } else {
            // Se for null (embora o contrato possa exigir), assume-se um valor padrão seguro
            entity.setStatus(CreateVehicleRequest.StatusEnum.AVAILABLE.getValue());
        }

        return entity;
    }

    /**
     * Mapeia VehicleEntity (JPA) para Vehicle DTO (saída/resposta).
     * CORREÇÃO: A assinatura do método foi ajustada para retornar Vehicle (resolve Error 1).
     */
    public Vehicle toDto(VehicleEntity entity) {
        if (entity == null) {
            return null;
        }

        Vehicle dto = new Vehicle();

        // Mapeamento dos campos
        dto.setId(entity.getId());
        dto.setCreatedAt(entity.getCreatedAt()); 
        dto.setLicensePlate(entity.getLicensePlate());
        dto.setModel(entity.getModel());
        dto.setVehicleManufacturer(entity.getVehicleManufacturer());
        dto.setModelYear(entity.getModelYear());
        dto.setManufacturerYear(entity.getManufacturerYear());
        dto.setRenavan(entity.getRenavan());
        dto.setPassengerNumber(entity.getPassengerNumber());
        dto.setMotorNumber(entity.getMotorNumber());
        dto.setChassisNumber(entity.getChassisNumber());
        dto.setFleetNumber(entity.getFleetNumber());
        dto.setFuelTankCapacity(entity.getFuelTankCapacity());
        dto.setEntryMileage(entity.getEntryMileage());
        dto.setAverageConsumption(entity.getAverageConsumption());
        dto.setBodyManufacturer(entity.getBodyManufacturer());
        dto.setBodyModel(entity.getBodyModel());
        dto.setAxesNumber(entity.getAxesNumber());
        dto.setEngineDescription(entity.getEngineDescription());
        dto.setHasBathroom(entity.getHasBathroom());

        // Mapeamento do Status: String (Entidade) para Enum (DTO)
        // CORREÇÃO: Uso de fromValue() da StatusEnum interna do Vehicle (resolve Error 3)
        if (entity.getStatus() != null) {
             dto.setStatus(Vehicle.StatusEnum.fromValue(entity.getStatus()));
        } else {
            dto.setStatus(Vehicle.StatusEnum.AVAILABLE);
        }

        return dto;
    }
}