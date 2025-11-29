package com.travelmanager.api_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Table; // 🛑 Import necessário para @Table
import jakarta.persistence.UniqueConstraint; // 🛑 Import necessário para UniqueConstraint

import java.time.OffsetDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
// 🛑 AJUSTE CRUCIAL AQUI: Define nomes legíveis e previsíveis para todas as constraints únicas.
@Table(name = "vehicle", uniqueConstraints = {
    // Constraint para a Placa
    @UniqueConstraint(columnNames = {"license_plate"}, name = "UK_VEHICLE_PLATE"), 
    
    // Constraint para o Chassi
    @UniqueConstraint(columnNames = {"chassis_number"}, name = "UK_VEHICLE_CHASSIS"), 
    
    // Constraint para o Motor
    @UniqueConstraint(columnNames = {"motor_number"}, name = "UK_VEHICLE_MOTOR"),
    
    // Constraint para o Renavan
    @UniqueConstraint(columnNames = {"renavan"}, name = "UK_VEHICLE_RENAVAN"),
    
    // Constraint para o Número da Frota
    // Nota: Colunas do tipo Integer geralmente são geradas com nome de coluna minúsculo.
    @UniqueConstraint(columnNames = {"fleet_number"}, name = "UK_VEHICLE_FLEET") 
})
public class VehicleEntity {

    // O ID é UUID e é sempre a chave primária, que já é única. Não precisa de UniqueConstraint explícita.
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @CreationTimestamp // Esta anotação define a data/hora atual no momento da persistência (INSERT)
    @Column(nullable = false, updatable = false) // Garante que nunca é nulo e nunca pode ser modificado após a criação
    private OffsetDateTime createdAt;

    @Column(nullable = false) // Placa deve ser não nula. A unicidade é definida no @Table.
    private String licensePlate;

    @Column(nullable = false)
    private String model;

    private String vehicleManufacturer;
    private Integer modelYear;
    private Integer manufacturerYear;
    
    // ✅ Removido unique = true daqui, pois já está no @Table
    private String renavan;
    
    private Integer passengerNumber;
    
    // ✅ Removido unique = true daqui, pois já está no @Table
    private String motorNumber;
    
    // ✅ Removido unique = true daqui, pois já está no @Table
    private String chassisNumber;
    
    // ✅ Removido unique = true daqui, pois já está no @Table
    private Integer fleetNumber;
    
    private Float fuelTankCapacity;
    private Integer entryMileage;
    private Float averageConsumption;
    private String bodyManufacturer;
    private String bodyModel;
    private Integer axesNumber;
    private String engineDescription;
    private Boolean hasBathroom;

    // Adicionado para ser consistente com o VehicleMapper (que usa entity.setStatus())
    @Column(nullable = false)
    private String status; 
}