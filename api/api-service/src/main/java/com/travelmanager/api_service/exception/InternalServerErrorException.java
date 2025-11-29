package com.travelmanager.api_service.exception;

/**
 * Exceção de negócio para o erro 500 INTERNAL SERVER ERROR.
 * Lançada para encapsular erros inesperados ou de baixo nível na camada Delegate,
 * garantindo que a resposta ao cliente use o código de erro padrão do contrato.
 */
public class InternalServerErrorException extends RuntimeException {

    private static final String ERROR_CODE = "INTERNAL_SERVER_ERROR";

    /**
     * Construtor para exceções 500.
     * @param message Mensagem de erro.
     * @param cause A exceção raiz (stack trace).
     */
    public InternalServerErrorException(String message, Throwable cause) {
        super(message, cause);
    }

    public String getErrorCode() {
        return ERROR_CODE;
    }
}