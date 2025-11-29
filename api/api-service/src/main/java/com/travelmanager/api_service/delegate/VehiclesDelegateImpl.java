package com.travelmanager.api_service.delegate;

import com.travelmanager.api_service.repository.VehicleRepository;
import com.travelmanager.api_service.mapper.VehicleMapper;
import com.travelmanager.api_service.model.VehicleEntity;
import com.travelmanager.api.VehiclesApi;
import com.travelmanager.model.CreateVehicleRequest;
import com.travelmanager.model.UpdateVehicleRequest;
import com.travelmanager.model.Vehicle;
// Imports das exceções de negócio
import com.travelmanager.api_service.exception.ResourceConflictException;
import com.travelmanager.api_service.exception.ResourceNotFoundException;
import com.travelmanager.api_service.exception.InternalServerErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.dao.DataIntegrityViolationException;
import org.hibernate.exception.ConstraintViolationException; 

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class VehiclesDelegateImpl implements VehiclesApi {

    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;

    @Autowired
    public VehiclesDelegateImpl(VehicleRepository vehicleRepository, VehicleMapper vehicleMapper) {
        this.vehicleRepository = vehicleRepository;
        this.vehicleMapper = vehicleMapper;
    }

    // ----------------------------------------------------------------------
    // LÓGICA DE TRATAMENTO DE CONFLITOS (SOBRECARGA)
    // ----------------------------------------------------------------------

    /**
     * Sobrecarga para lidar com a requisição de criação/substituição (CreateVehicleRequest).
     *
     * @param ex A exceção DataIntegrityViolationException capturada.
     * @param defaultMessage A mensagem padrão a ser usada.
     * @param request O DTO de requisição (CreateVehicleRequest).
     */
    private void handleConflictException(DataIntegrityViolationException ex, String defaultMessage, CreateVehicleRequest request) throws ResourceConflictException {
        // Delega para o método centralizado
        this.handleConflictInternal(ex, defaultMessage, request);
    }

    /**
     * Sobrecarga para lidar com a requisição de atualização parcial (UpdateVehicleRequest).
     *
     * @param ex A exceção DataIntegrityViolationException capturada.
     * @param defaultMessage A mensagem padrão a ser usada.
     * @param request O DTO de requisição (UpdateVehicleRequest).
     */
    private void handleConflictException(DataIntegrityViolationException ex, String defaultMessage, UpdateVehicleRequest request) throws ResourceConflictException {
        // Delega para o método centralizado
        this.handleConflictInternal(ex, defaultMessage, request);
    }


    /**
     * Lógica central para tratamento de conflitos de integridade de dados.
     * Usa Object para aceitar qualquer DTO de veículo.
     *
     * @param ex A exceção DataIntegrityViolationException.
     * @param defaultMessage A mensagem padrão.
     * @param request Objeto da requisição (pode ser CreateVehicleRequest ou UpdateVehicleRequest).
     */
    private void handleConflictInternal(DataIntegrityViolationException ex, String defaultMessage, Object request) throws ResourceConflictException {
        Throwable cause = ex.getRootCause();
        String constraintName = "N/A";
        String conflictingField = "N/A";
        
        // 1. Tenta obter o nome da constraint pelo método padrão do Hibernate
        if (cause instanceof ConstraintViolationException) {
            ConstraintViolationException cve = (ConstraintViolationException) cause;
            constraintName = cve.getConstraintName();
            System.err.println("👉 [DELEGATE LOG] Constraint Name Recebida (Hibernate): " + constraintName);
            
        } else {
            // 🛑 2. FLUXO ROBUSTO: Tenta extrair o nome da constraint da mensagem de erro (PostgreSQL)
            String fullErrorMessage = ex.getMessage().toUpperCase();
            System.err.println("👉 [DELEGATE LOG] Tentando extrair da mensagem completa: " + fullErrorMessage);
            
            // Verifica se a mensagem contém os nomes legíveis que definimos na Entidade
            if (fullErrorMessage.contains("UK_VEHICLE_CHASSIS")) {
                constraintName = "UK_VEHICLE_CHASSIS"; 
            } else if (fullErrorMessage.contains("UK_VEHICLE_PLATE")) {
                constraintName = "UK_VEHICLE_PLATE"; 
            } else if (fullErrorMessage.contains("UK_VEHICLE_MOTOR")) {
                constraintName = "UK_VEHICLE_MOTOR"; 
            } else if (fullErrorMessage.contains("UK_VEHICLE_RENAVAN")) {
                constraintName = "UK_VEHICLE_RENAVAN"; 
            } else if (fullErrorMessage.contains("UK_VEHICLE_FLEET")) {
                constraintName = "UK_VEHICLE_FLEET"; 
            }
        }
        
        // Mapeia o nome da constraint para o nome do campo amigável
        conflictingField = mapConstraintToField(constraintName);
        
        System.err.println("👉 [DELEGATE LOG] Campo Mapeado Retornado: " + conflictingField); 

        String friendlyConflictType = "Duplicidade de Chave Única";

        // 🛑 NOVO FLUXO: Encontrar o valor duplicado no DTO de requisição
        String conflictingValue = "N/A";
        
        // Define a mensagem de detalhe: usa o campo se foi identificado, senão usa a mensagem padrão
        String detailMessage;
        
        if (conflictingField.equalsIgnoreCase("N/A") || conflictingField.contains("desconhecido")) {
             detailMessage = defaultMessage; 
             conflictingField = "campo único desconhecido"; 
        } else {
            // 🛑 Lógica para extrair o valor do Request DTO com base no nome do campo
            // Chama a função auxiliar sobrecarregada
            conflictingValue = extractConflictingValue(conflictingField, request); 
            String friendlyFieldName = conflictingField.toUpperCase().replace("_", " ");
            detailMessage = String.format("Conflito de Recurso: O valor '%s' para o campo '%s' já existe.", conflictingValue, friendlyFieldName);
        }

        // Lança a exceção de negócio
        throw new ResourceConflictException(
            detailMessage, 
            friendlyConflictType,
            conflictingField,
            conflictingValue
        );
    }
    
    // ====================================================================
    // --- Sobrecargas do método auxiliar extractConflictingValue ---
    // ====================================================================

    private String extractConflictingValue(String fieldName, Object request) {
        if (request instanceof CreateVehicleRequest) {
            return extractConflictingValue(fieldName, (CreateVehicleRequest) request);
        } else if (request instanceof UpdateVehicleRequest) {
            return extractConflictingValue(fieldName, (UpdateVehicleRequest) request);
        }
        return "N/A: Tipo de Requisição Desconhecido";
    }

    private String extractConflictingValue(String fieldName, CreateVehicleRequest request) {
        if (request == null) return "N/A";

        // Mapeamento para CreateVehicleRequest (valores não opcionais).
        return switch (fieldName.toLowerCase()) {
            case "chassisnumber" -> request.getChassisNumber();
            case "licenseplate" -> request.getLicensePlate();
            case "motornumber" -> request.getMotorNumber();
            case "renavan" -> request.getRenavan();
            case "fleetnumber" -> request.getFleetNumber() != null ? String.valueOf(request.getFleetNumber()) : "N/A";
            default -> "Valor Desconhecido/Não Mapeado";
        };
    }

    private String extractConflictingValue(String fieldName, UpdateVehicleRequest request) {
        if (request == null) return "N/A";
        
        // Mapeamento para UpdateVehicleRequest (valores parciais/opcionais)
        // Assume que se o campo está em conflito, o valor foi fornecido no DTO.
        return switch (fieldName.toLowerCase()) {
            case "chassisnumber" -> request.getChassisNumber();
            case "licenseplate" -> request.getLicensePlate();
            case "motornumber" -> request.getMotorNumber();
            case "renavan" -> request.getRenavan();
            case "fleetnumber" -> request.getFleetNumber() != null ? String.valueOf(request.getFleetNumber()) : "N/A";
            default -> "Valor Desconhecido/Não Mapeado";
        };
    }
    
    /**
     * Mapeia o nome da constraint do BD (agora legível) para o nome do campo amigável.
     */
    private String mapConstraintToField(String constraintName) {
        if (constraintName == null) {
            return "N/A";
        }
        
        String name = constraintName.toUpperCase();
        
        // 🛑 FLUXO DE MAPAEAMENTO: Usando os nomes definidos no @Table (UK_VEHICLE_*)
        if (name.contains("UK_VEHICLE_CHASSIS")) {
            return "chassisNumber";
        }
        if (name.contains("UK_VEHICLE_PLATE")) { 
            return "licensePlate";
        }
        if (name.contains("UK_VEHICLE_MOTOR")) {
            return "motorNumber";
        }
        if (name.contains("UK_VEHICLE_RENAVAN")) {
            return "renavan";
        }
        if (name.contains("UK_VEHICLE_FLEET")) {
            return "fleetNumber";
        }

        // 3. Fallback genérico (Caso o erro não venha com o prefixo UK_)
        if (name.contains("CHASSIS") || name.contains("CHASSI")) {
            return "chassisNumber";
        }
        if (name.contains("PLATE") || name.contains("PLACA")) {
            return "licensePlate";
        }
        if (name.contains("MOTOR")) {
            return "motorNumber";
        }
        if (name.contains("RENAVAN")) {
            return "renavan";
        }
        if (name.contains("FLEET")) {
            return "fleetNumber";
        }
        
        return "campo único desconhecido";
    }

    // ----------------------------------------------------------------------
    // 1. POST /vehicles (CREATE) ---
    // ----------------------------------------------------------------------
    @Override
    public ResponseEntity<Vehicle> createVehicle(
            @Valid @RequestBody CreateVehicleRequest createVehicleRequest) {
        try {
            VehicleEntity newEntity = vehicleMapper.toEntity(createVehicleRequest);
            VehicleEntity savedEntity = vehicleRepository.save(newEntity);
            Vehicle responseDto = vehicleMapper.toDto(savedEntity);

            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

} catch (DataIntegrityViolationException e) {
            System.err.println("Erro de Integridade de Dados ao criar veículo. Tentando mapear campo...");
            // Chama a sobrecarga para CreateVehicleRequest
            handleConflictException(e, "Um veículo com esta placa ou chassi já está em uso.", createVehicleRequest); 
            
            throw new InternalServerErrorException("Falha inesperada no fluxo de exceção 409.", e);
        } catch (Exception e) {
            System.err.println("Erro inesperado ao criar veículo: " + e.getMessage());
            throw new InternalServerErrorException("Falha ao processar criação de veículo.", e);
        }
    }

    // ----------------------------------------------------------------------
    // 4. PUT /vehicles/{id} (REPLACE) ---
    // ----------------------------------------------------------------------
    @Override
    public ResponseEntity<Vehicle> replaceVehicle(
            @NotNull @PathVariable("id") UUID id,
            @Valid @RequestBody CreateVehicleRequest createVehicleRequest) {
        try {
            Optional<VehicleEntity> existingEntity = vehicleRepository.findById(id);

            VehicleEntity entityToSave = vehicleMapper.toEntity(createVehicleRequest);
            entityToSave.setId(id);
            entityToSave.setCreatedAt(existingEntity.map(VehicleEntity::getCreatedAt).orElse(OffsetDateTime.now()));

            VehicleEntity savedEntity = vehicleRepository.save(entityToSave);
            Vehicle responseDto = vehicleMapper.toDto(savedEntity);

            HttpStatus status = existingEntity.isPresent() ? HttpStatus.OK : HttpStatus.CREATED;

            return new ResponseEntity<>(responseDto, status);

} catch (DataIntegrityViolationException e) {
            System.err.println("Erro de Integridade de Dados ao substituir veículo.");
            // Chama a sobrecarga para CreateVehicleRequest
            handleConflictException(e, "Um veículo com esta placa, chassi ou outro identificador já está em uso.", createVehicleRequest);
            
            throw new InternalServerErrorException("Falha inesperada no fluxo de exceção 409.", e);
        } catch (Exception e) {
            System.err.println("Erro ao substituir veículo: " + e.getMessage());
            throw new InternalServerErrorException("Falha ao substituir veículo.", e);
        }
    }

    // ----------------------------------------------------------------------
    // 5. PATCH /vehicles/{id} (UPDATE PARTIAL) ---
    // ----------------------------------------------------------------------
    @Override
    public ResponseEntity<Vehicle> updateVehicle(
            @NotNull @PathVariable("id") UUID id,
            @Valid @RequestBody UpdateVehicleRequest updateVehicleRequest) {
        try {
            VehicleEntity existingEntity = vehicleRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Veículo", id.toString()));

            // Mapeamento parcial dos campos que foram fornecidos no DTO
            if (updateVehicleRequest.getLicensePlate() != null) {
                existingEntity.setLicensePlate(updateVehicleRequest.getLicensePlate());
            }
            if (updateVehicleRequest.getModel() != null) {
                existingEntity.setModel(updateVehicleRequest.getModel());
            }
            if (updateVehicleRequest.getStatus() != null) {
                existingEntity.setStatus(updateVehicleRequest.getStatus().getValue());
            }
            if (updateVehicleRequest.getChassisNumber() != null) {
                existingEntity.setChassisNumber(updateVehicleRequest.getChassisNumber());
            }
            if (updateVehicleRequest.getMotorNumber() != null) {
                existingEntity.setMotorNumber(updateVehicleRequest.getMotorNumber());
            }
            if (updateVehicleRequest.getRenavan() != null) {
                existingEntity.setRenavan(updateVehicleRequest.getRenavan());
            }
            if (updateVehicleRequest.getFleetNumber() != null) {
                existingEntity.setFleetNumber(updateVehicleRequest.getFleetNumber());
            }
                        if (updateVehicleRequest.getChassisNumber() != null) {
                existingEntity.setChassisNumber(updateVehicleRequest.getChassisNumber());
            }

            VehicleEntity updatedEntity = vehicleRepository.save(existingEntity);

            Vehicle responseDto = vehicleMapper.toDto(updatedEntity);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);

} catch (DataIntegrityViolationException e) {
            System.err.println("Erro de Integridade de Dados ao atualizar veículo (PATCH).");
            // Chama a sobrecarga para UpdateVehicleRequest
            handleConflictException(e, "Um veículo com esta placa, chassi ou outro identificador já está em uso.", updateVehicleRequest);
            
            throw new InternalServerErrorException("Falha inesperada no fluxo de exceção 409.", e); 
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            System.err.println("Erro ao atualizar veículo (PATCH): " + e.getMessage());
            throw new InternalServerErrorException("Falha ao atualizar veículo.", e);
        }
    }
    
    // --- 2. GET /vehicles/{id} (READ by ID) ---
    @Override
    public ResponseEntity<Vehicle> getVehicleById(
            @NotNull @PathVariable("id") UUID id) {
        try {
            VehicleEntity entity = vehicleRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Veículo", id.toString()));

            Vehicle dto = vehicleMapper.toDto(entity);
            return new ResponseEntity<>(dto, HttpStatus.OK);

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            System.err.println("Erro ao buscar veículo por ID: " + e.getMessage());
            throw new InternalServerErrorException("Falha ao buscar veículo por ID.", e);
        }
    }

    // --- 3. GET /vehicles (LIST) ---
    @Override
    public ResponseEntity<List<Vehicle>> listVehicles(
            @Min(1) @Max(100) @Valid @RequestParam(value = "limit", required = false, defaultValue = "50") Integer limit,
            @Min(0) @Valid @RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) {
        try {
            int pageNumber = offset / limit;
            Pageable pageRequest = PageRequest.of(pageNumber, limit);

            List<VehicleEntity> entities = vehicleRepository.findAll(pageRequest).getContent();

            List<Vehicle> dtos = entities.stream()
                    .map(vehicleMapper::toDto)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(dtos, HttpStatus.OK);

        } catch (Exception e) {
            System.err.println("Erro ao listar veículos: " + e.getMessage());
            throw new InternalServerErrorException("Falha ao listar veículos.", e);
        }
    }

    // --- 6. DELETE /vehicles/{id} (DELETE) ---
    @Override
    public ResponseEntity<Void> deleteVehicle(
            @NotNull @PathVariable("id") UUID id) {
        try {
            if (!vehicleRepository.existsById(id)) {
                throw new ResourceNotFoundException("Veículo", id.toString());
            }

            vehicleRepository.deleteById(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            System.err.println("Erro ao deletar veículo: " + e.getMessage());
            throw new InternalServerErrorException("Falha ao deletar veículo.", e);
        }
    }
}