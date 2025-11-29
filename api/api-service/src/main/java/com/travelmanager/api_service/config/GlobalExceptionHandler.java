package com.travelmanager.api_service.config;

import com.travelmanager.api_service.exception.InternalServerErrorException;
import com.travelmanager.api_service.exception.ResourceConflictException;
import com.travelmanager.api_service.exception.ResourceNotFoundException;
import com.travelmanager.model.ErrorResponse; 
// import com.travelmanager.model.ValidationErrorDetail; // 🛑 Removido/Comentado
import com.travelmanager.model.ValidationErrorDetail; // ✅ Tipo Incorreto que o DTO Gerado Espera

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Manipulador global de exceções (@ControllerAdvice).
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    // ----------------------------------------------------------------------
    // Helpers para Construção do ErrorResponse
    // ----------------------------------------------------------------------

    /**
     * Constrói o DTO ErrorResponse. Usa o DTO incorreto para compilar.
     */
private ErrorResponse buildErrorResponse(HttpStatus status, String errorCode, String message, List<ValidationErrorDetail> details) {
        ErrorResponse response = new ErrorResponse();
        response.setTimestamp(OffsetDateTime.now());
        response.setStatus(status.value());
        response.setErrorCode(errorCode);
        response.setMessage(message);
        response.setTraceId(UUID.randomUUID().toString()); 
        response.setDetails(details); 
        return response;
    }
    // ----------------------------------------------------------------------
    // 1. Tratamento de Exceções de Negócio Customizadas (404, 409)
    // ----------------------------------------------------------------------

    /**
     * Mapeia ResourceNotFoundException para 404 NOT FOUND.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        
        ErrorResponse errorResponse = buildErrorResponse(
            status, 
            ex.getErrorCode(),
            ex.getMessage(), 
            null
        );
        
        return new ResponseEntity<>(errorResponse, status);
    }

    /**
     * Mapeia ResourceConflictException para 409 CONFLICT.
     */
   @ExceptionHandler(ResourceConflictException.class)
    public ResponseEntity<ErrorResponse> handleResourceConflictException(ResourceConflictException ex, WebRequest request) {
        HttpStatus status = HttpStatus.CONFLICT;
        
        String field = ex.getConflictingField();
        String conflictingValue = ex.getConflictingValue(); // 🛑 NOVO: PEGA O VALOR
        String specificMessage = ex.getMessage(); 

        System.err.println("✅ [HANDLER LOG] Campo de Conflito Recebido: " + field); 
        System.err.println("✅ [HANDLER LOG] Valor de Conflito Recebido: " + conflictingValue); // 🛑 LOG 6

        // Tenta criar uma mensagem mais amigável usando o nome do campo
        if (field != null && !field.equalsIgnoreCase("N/A") && !field.equalsIgnoreCase("campo único desconhecido")) {
            
            System.err.println("✅ [HANDLER LOG] Condição IF: TRUE. Gerando mensagem específica."); 
            
            String displayField = field.replace('_', ' '); 
            // Mensagem atualizada para incluir o valor
            specificMessage = String.format("Conflito de Recurso: O valor '%s' para o campo '%s' já existe.", conflictingValue, displayField);
        } else {
            System.err.println("✅ [HANDLER LOG] Condição IF: FALSE. Usando mensagem genérica: " + specificMessage); 
        }
        
        List<ValidationErrorDetail> details = null;
        if (field != null && !field.equalsIgnoreCase("N/A") && !field.equalsIgnoreCase("campo único desconhecido")) {
             ValidationErrorDetail detail = new ValidationErrorDetail();
             detail.setField(field);
             detail.setIssue("Valor duplicado. Já está em uso.");
             detail.setTargetValue(conflictingValue); // 🛑 NOVO: INSERE O VALOR EM CONFLITO
             details = List.of(detail);
        }
        
        ErrorResponse errorResponse = buildErrorResponse(
            status, 
            ex.getErrorCode(),
            specificMessage, 
            details          
        );
        
        return new ResponseEntity<>(errorResponse, status);
    }
     // 2. Tratamento de Exceções de Validação (Spring / 400 Bad Request)
    // ----------------------------------------------------------------------
    
    /**
     * Mapeia MethodArgumentNotValidException para 400 BAD REQUEST.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        
        List<ValidationErrorDetail> details = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> {
                // Instancia o DTO de detalhe que o ErrorResponse espera
                ValidationErrorDetail detail = new ValidationErrorDetail();
                
                detail.setField(error.getField());
                detail.setIssue(error.getDefaultMessage()); 
                return detail;
            })
            .collect(Collectors.toList());

        ErrorResponse errorResponse = buildErrorResponse(
            status, 
            "VALIDATION_ERROR",
            "A requisição contém um ou mais erros de validação.", 
            details
        );
        
        return new ResponseEntity<>(errorResponse, status);
    }


    // ----------------------------------------------------------------------
    // 3. Tratamento de Exceções Genéricas (Fallback para 500 INTERNAL SERVER ERROR)
    // ----------------------------------------------------------------------

    /**
     * Mapeia InternalServerErrorException e qualquer outra exceção não tratada 
     * para 500 INTERNAL SERVER ERROR.
     */
    @ExceptionHandler({InternalServerErrorException.class, Exception.class})
    public ResponseEntity<ErrorResponse> handleAllUncaughtExceptions(Exception ex, WebRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        // Loga o erro completo para investigação
        System.err.println("Erro 500 não tratado: " + ex.getMessage());
        ex.printStackTrace();

        // Determina o código de erro
        String errorCode = (ex instanceof InternalServerErrorException) 
                           ? ((InternalServerErrorException) ex).getErrorCode()
                           : "UNEXPECTED_ERROR";
        
        ErrorResponse errorResponse = buildErrorResponse(
            status, 
            errorCode,
            "Ocorreu um erro interno inesperado no servidor.", 
            null
        );
        
        return new ResponseEntity<>(errorResponse, status);
    }
}