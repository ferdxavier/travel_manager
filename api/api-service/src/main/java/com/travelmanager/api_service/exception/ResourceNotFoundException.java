package com.travelmanager.api_service.exception;

/**
 * Exceção de negócio para o erro 404 NOT FOUND.
 * Lançada quando um recurso solicitado (ou um recurso pai referenciado) não é encontrado.
 */
public class ResourceNotFoundException extends RuntimeException {
    
    // Código de erro de negócio específico para o contrato OpenAPI
    private static final String ERROR_CODE = "RESOURCE_NOT_FOUND";

    /**
     * Construtor para exceções 404.
     * @param resourceType O tipo de recurso (ex: "Veículo").
     * @param id O identificador do recurso (ex: o UUID).
     */
    public ResourceNotFoundException(String resourceType, String id) {
        super(String.format("%s com ID %s não foi encontrado.", resourceType, id));
    }
    
    public String getErrorCode() {
        return ERROR_CODE;
    }
}