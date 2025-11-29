package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.travelmanager.model.ValidationErrorDetail;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * Representa a resposta padrão de erro da API.
 */

@Schema(name = "ErrorResponse", description = "Representa a resposta padrão de erro da API.")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class ErrorResponse {

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime timestamp;

  private Integer status;

  private String errorCode;

  private String message;

  private @Nullable String traceId;

  @Valid
  private List<@Valid ValidationErrorDetail> details = new ArrayList<>();

  public ErrorResponse() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public ErrorResponse(OffsetDateTime timestamp, Integer status, String errorCode, String message) {
    this.timestamp = timestamp;
    this.status = status;
    this.errorCode = errorCode;
    this.message = message;
  }

  public ErrorResponse timestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Data e hora em que o erro ocorreu.
   * @return timestamp
   */
  @NotNull @Valid 
  @Schema(name = "timestamp", description = "Data e hora em que o erro ocorreu.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("timestamp")
  public OffsetDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public ErrorResponse status(Integer status) {
    this.status = status;
    return this;
  }

  /**
   * Código de status HTTP (e.g., 400, 404).
   * @return status
   */
  @NotNull 
  @Schema(name = "status", description = "Código de status HTTP (e.g., 400, 404).", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("status")
  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public ErrorResponse errorCode(String errorCode) {
    this.errorCode = errorCode;
    return this;
  }

  /**
   * Código de erro de negócio específico (e.g., 'VEHICLE_ALREADY_EXISTS', 'INVALID_PLATE_FORMAT').
   * @return errorCode
   */
  @NotNull 
  @Schema(name = "errorCode", description = "Código de erro de negócio específico (e.g., 'VEHICLE_ALREADY_EXISTS', 'INVALID_PLATE_FORMAT').", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("errorCode")
  public String getErrorCode() {
    return errorCode;
  }

  public void setErrorCode(String errorCode) {
    this.errorCode = errorCode;
  }

  public ErrorResponse message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Mensagem de erro legível e concisa para o desenvolvedor ou usuário.
   * @return message
   */
  @NotNull 
  @Schema(name = "message", description = "Mensagem de erro legível e concisa para o desenvolvedor ou usuário.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("message")
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ErrorResponse traceId(@Nullable String traceId) {
    this.traceId = traceId;
    return this;
  }

  /**
   * ID de rastreamento (trace ID) para correlacionar o erro com os logs do servidor.
   * @return traceId
   */
  
  @Schema(name = "traceId", description = "ID de rastreamento (trace ID) para correlacionar o erro com os logs do servidor.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("traceId")
  public @Nullable String getTraceId() {
    return traceId;
  }

  public void setTraceId(@Nullable String traceId) {
    this.traceId = traceId;
  }

  public ErrorResponse details(List<@Valid ValidationErrorDetail> details) {
    this.details = details;
    return this;
  }

  public ErrorResponse addDetailsItem(ValidationErrorDetail detailsItem) {
    if (this.details == null) {
      this.details = new ArrayList<>();
    }
    this.details.add(detailsItem);
    return this;
  }

  /**
   * Detalhes adicionais, normalmente usados para erros de validação de campo (400).
   * @return details
   */
  @Valid 
  @Schema(name = "details", description = "Detalhes adicionais, normalmente usados para erros de validação de campo (400).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("details")
  public List<@Valid ValidationErrorDetail> getDetails() {
    return details;
  }

  public void setDetails(List<@Valid ValidationErrorDetail> details) {
    this.details = details;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ErrorResponse errorResponse = (ErrorResponse) o;
    return Objects.equals(this.timestamp, errorResponse.timestamp) &&
        Objects.equals(this.status, errorResponse.status) &&
        Objects.equals(this.errorCode, errorResponse.errorCode) &&
        Objects.equals(this.message, errorResponse.message) &&
        Objects.equals(this.traceId, errorResponse.traceId) &&
        Objects.equals(this.details, errorResponse.details);
  }

  @Override
  public int hashCode() {
    return Objects.hash(timestamp, status, errorCode, message, traceId, details);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ErrorResponse {\n");
    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    errorCode: ").append(toIndentedString(errorCode)).append("\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    traceId: ").append(toIndentedString(traceId)).append("\n");
    sb.append("    details: ").append(toIndentedString(details)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

