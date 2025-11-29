package com.travelmanager.api_service.exception;

/**
 * Exceção de negócio para o erro 409 CONFLICT.
 * Lançada quando há uma violação de integridade de dados (ex: chave única duplicada).
 */
public class ResourceConflictException extends RuntimeException {

    private static final String ERROR_CODE = "RESOURCE_CONFLICT";
    
    // 🛑 NOVO CAMPO: Armazena o nome do campo que causou a violação de unicidade
    private final String conflictingField;

    // 🛑 NOVO CAMPO
    private final String conflictingValue;

    /**
     * Construtor para exceções 409 (Conflito de integridade de dados).
     * * @param message Mensagem de erro.
     * @param conflictType O tipo de conflito (ex: "Duplicidade de Chave Única").
     * @param conflictingField O nome do campo que falhou (ex: "license_plate" ou "chassis_number").
     */
    public ResourceConflictException(String message, String conflictType, String conflictingField, String conflictingValue) {
        // A mensagem super fica mais concisa. O GlobalExceptionHandler adicionará o detalhe do campo.
        super(String.format("%s. Detalhe: %s", conflictType, message)); 
        this.conflictingField = conflictingField;
        this.conflictingValue = conflictingValue; // 🛑 ATRIBUIÇÃO
    }

    public String getErrorCode() {
        return ERROR_CODE;
    }
    
    /**
     * 🛑 NOVO MÉTODO: Retorna o nome do campo em conflito.
     */
    public String getConflictingField() {
        return conflictingField;
    }

    /**
     * 🛑 NOVO MÉTODO: Retorna o valor em conflito.
     */
    public String getConflictingValue() {
        return conflictingValue;
    }
}