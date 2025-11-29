package com.travelmanager.api_service.controller;

import com.travelmanager.api.VehiclesApi;
import com.travelmanager.api_service.delegate.VehiclesDelegateImpl;
import com.travelmanager.model.CreateVehicleRequest;
import com.travelmanager.model.Vehicle;
import com.travelmanager.model.UpdateVehicleRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID; // Necessário para o tipo de parâmetro ID

/**
 * Controller principal que implementa a interface gerada (VehiclesApi) 
 * e delega todas as operações de negócio para o VehiclesDelegateImpl.
 * Todas as anotações de validação (ex: @Valid, @NotNull, @Min) 
 * foram removidas, pois elas já estão na interface VehiclesApi e no Delegate, 
 * evitando erros de validação duplicada.
 */
@RestController
@RequestMapping("/api")
public class VehiclesApiController implements VehiclesApi {

    private final VehiclesDelegateImpl delegate;

    @Autowired
    public VehiclesApiController(VehiclesDelegateImpl delegate) {
        this.delegate = delegate;
    }

    // --- 1. POST /api/vehicles (CREATE) ---
    @Override
    public ResponseEntity<Vehicle> createVehicle(
        @RequestBody CreateVehicleRequest createVehicleRequest 
    ) {
        return delegate.createVehicle(createVehicleRequest);
    }

    // --- 2. GET /api/vehicles/{id} (READ by ID) ---
    @Override
    public ResponseEntity<Vehicle> getVehicleById(
        @PathVariable("id") UUID id 
    ) {
        return delegate.getVehicleById(id);
    }

    // --- 3. GET /api/vehicles (LIST) ---
    @Override
    public ResponseEntity<List<Vehicle>> listVehicles(
        @RequestParam(value = "limit", required = false, defaultValue = "50") Integer limit,
        @RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset
    ) {
        return delegate.listVehicles(limit, offset);
    }

    // --- 4. PUT /api/vehicles/{id} (REPLACE) ---
    @Override
    public ResponseEntity<Vehicle> replaceVehicle(
        @PathVariable("id") UUID id,
        @RequestBody CreateVehicleRequest createVehicleRequest
    ) {
        return delegate.replaceVehicle(id, createVehicleRequest);
    }

    // --- 5. PATCH /api/vehicles/{id} (UPDATE PARTIAL) ---
    @Override
    public ResponseEntity<Vehicle> updateVehicle(
        @PathVariable("id") UUID id,
        @RequestBody UpdateVehicleRequest updateVehicleRequest
    ) {
        // Removido System.out.println. O logging deve ser feito no Delegate/Service, se necessário.
        return delegate.updateVehicle(id, updateVehicleRequest);
    }

    // --- 6. DELETE /api/vehicles/{id} (DELETE) ---
    @Override
    public ResponseEntity<Void> deleteVehicle(
        @PathVariable("id") UUID id
    ) {
        return delegate.deleteVehicle(id);
    }
}