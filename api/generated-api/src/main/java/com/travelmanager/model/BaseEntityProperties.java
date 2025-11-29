package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.time.OffsetDateTime;
import java.util.UUID;
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
 * BaseEntityProperties
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class BaseEntityProperties {

  private @Nullable UUID id;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private @Nullable OffsetDateTime createdAt;

  public BaseEntityProperties id(@Nullable UUID id) {
    this.id = id;
    return this;
  }

  /**
   * ID único gerado pelo sistema.
   * @return id
   */
  @Valid 
  @Schema(name = "id", example = "a1b2c3d4-e5f6-7890-1234-567890abcdef", description = "ID único gerado pelo sistema.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("id")
  public @Nullable UUID getId() {
    return id;
  }

  public void setId(@Nullable UUID id) {
    this.id = id;
  }

  public BaseEntityProperties createdAt(@Nullable OffsetDateTime createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Timestamp de criação do registro.
   * @return createdAt
   */
  @Valid 
  @Schema(name = "createdAt", example = "2025-01-25T10:00Z", description = "Timestamp de criação do registro.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("createdAt")
  public @Nullable OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(@Nullable OffsetDateTime createdAt) {
    this.createdAt = createdAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseEntityProperties baseEntityProperties = (BaseEntityProperties) o;
    return Objects.equals(this.id, baseEntityProperties.id) &&
        Objects.equals(this.createdAt, baseEntityProperties.createdAt);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, createdAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseEntityProperties {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    createdAt: ").append(toIndentedString(createdAt)).append("\n");
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

