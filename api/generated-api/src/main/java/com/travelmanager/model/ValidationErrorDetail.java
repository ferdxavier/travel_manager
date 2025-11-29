package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * Detalhes de falha de validação em um campo específico.
 */

@Schema(name = "ValidationErrorDetail", description = "Detalhes de falha de validação em um campo específico.")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class ValidationErrorDetail {

  private @Nullable String field;

  private @Nullable String issue;

  private @Nullable String targetValue;

  public ValidationErrorDetail field(@Nullable String field) {
    this.field = field;
    return this;
  }

  /**
   * Nome do campo que falhou na validação.
   * @return field
   */
  
  @Schema(name = "field", description = "Nome do campo que falhou na validação.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("field")
  public @Nullable String getField() {
    return field;
  }

  public void setField(@Nullable String field) {
    this.field = field;
  }

  public ValidationErrorDetail issue(@Nullable String issue) {
    this.issue = issue;
    return this;
  }

  /**
   * Descrição do problema de validação (e.g., 'must be a positive number', 'is required').
   * @return issue
   */
  
  @Schema(name = "issue", description = "Descrição do problema de validação (e.g., 'must be a positive number', 'is required').", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("issue")
  public @Nullable String getIssue() {
    return issue;
  }

  public void setIssue(@Nullable String issue) {
    this.issue = issue;
  }

  public ValidationErrorDetail targetValue(@Nullable String targetValue) {
    this.targetValue = targetValue;
    return this;
  }

  /**
   * O valor alvo do opração que gerou o erro caso exista.
   * @return targetValue
   */
  
  @Schema(name = "targetValue", description = "O valor alvo do opração que gerou o erro caso exista.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("targetValue")
  public @Nullable String getTargetValue() {
    return targetValue;
  }

  public void setTargetValue(@Nullable String targetValue) {
    this.targetValue = targetValue;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ValidationErrorDetail validationErrorDetail = (ValidationErrorDetail) o;
    return Objects.equals(this.field, validationErrorDetail.field) &&
        Objects.equals(this.issue, validationErrorDetail.issue) &&
        Objects.equals(this.targetValue, validationErrorDetail.targetValue);
  }

  @Override
  public int hashCode() {
    return Objects.hash(field, issue, targetValue);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ValidationErrorDetail {\n");
    sb.append("    field: ").append(toIndentedString(field)).append("\n");
    sb.append("    issue: ").append(toIndentedString(issue)).append("\n");
    sb.append("    targetValue: ").append(toIndentedString(targetValue)).append("\n");
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

