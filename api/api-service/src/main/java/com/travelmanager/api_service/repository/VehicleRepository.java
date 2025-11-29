package com.travelmanager.api_service.repository;

import com.travelmanager.api_service.model.VehicleEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Interface Repository para a entidade Vehicle. 
 * Estende JpaRepository para fornecer métodos CRUD prontos.
 */
@Repository
public interface VehicleRepository extends JpaRepository<VehicleEntity, UUID> {
    // O JpaRepository fornece: save(), findById(), findAll(), delete(), etc.
    // Você pode adicionar métodos de consulta customizados aqui se necessário, 
    // mas para o seu caso de uso atual, o JpaRepository básico é suficiente.
}