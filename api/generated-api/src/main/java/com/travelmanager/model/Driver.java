package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.time.LocalDate;
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
 * Representação completa de um motorista da empresa.
 */

@Schema(name = "Driver", description = "Representação completa de um motorista da empresa.")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class Driver {

  private UUID id;

  private String name;

  private @Nullable String cpf;

  private @Nullable String rg;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate dateBirth;

  private String cnhNumber;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate validityCnh;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate validityToxicological;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private @Nullable OffsetDateTime createdAt;

  public Driver() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public Driver(UUID id, String name, LocalDate dateBirth, String cnhNumber, LocalDate validityCnh, LocalDate validityToxicological) {
    this.id = id;
    this.name = name;
    this.dateBirth = dateBirth;
    this.cnhNumber = cnhNumber;
    this.validityCnh = validityCnh;
    this.validityToxicological = validityToxicological;
  }

  public Driver id(UUID id) {
    this.id = id;
    return this;
  }

  /**
   * ID único gerado pelo sistema.
   * @return id
   */
  @NotNull @Valid 
  @Schema(name = "id", description = "ID único gerado pelo sistema.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("id")
  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public Driver name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Nome do motorista.
   * @return name
   */
  @NotNull 
  @Schema(name = "name", example = "Fernando Castro de Abreu", description = "Nome do motorista.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Driver cpf(@Nullable String cpf) {
    this.cpf = cpf;
    return this;
  }

  /**
   * Número do CPF (apenas dígitos).
   * @return cpf
   */
  
  @Schema(name = "cpf", example = "06556256359", description = "Número do CPF (apenas dígitos).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("cpf")
  public @Nullable String getCpf() {
    return cpf;
  }

  public void setCpf(@Nullable String cpf) {
    this.cpf = cpf;
  }

  public Driver rg(@Nullable String rg) {
    this.rg = rg;
    return this;
  }

  /**
   * Número do RG (ex: MG 13.569.569).
   * @return rg
   */
  
  @Schema(name = "rg", example = "MG 13569569", description = "Número do RG (ex: MG 13.569.569).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("rg")
  public @Nullable String getRg() {
    return rg;
  }

  public void setRg(@Nullable String rg) {
    this.rg = rg;
  }

  public Driver dateBirth(LocalDate dateBirth) {
    this.dateBirth = dateBirth;
    return this;
  }

  /**
   * Data de Nascimento (formato YYYY-MM-DD).
   * @return dateBirth
   */
  @NotNull @Valid 
  @Schema(name = "dateBirth", example = "1985-06-15", description = "Data de Nascimento (formato YYYY-MM-DD).", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("dateBirth")
  public LocalDate getDateBirth() {
    return dateBirth;
  }

  public void setDateBirth(LocalDate dateBirth) {
    this.dateBirth = dateBirth;
  }

  public Driver cnhNumber(String cnhNumber) {
    this.cnhNumber = cnhNumber;
    return this;
  }

  /**
   * Número da Carteira Nacional de Habilitação (CNH).
   * @return cnhNumber
   */
  @NotNull 
  @Schema(name = "cnhNumber", example = "2536565936616546", description = "Número da Carteira Nacional de Habilitação (CNH).", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("cnhNumber")
  public String getCnhNumber() {
    return cnhNumber;
  }

  public void setCnhNumber(String cnhNumber) {
    this.cnhNumber = cnhNumber;
  }

  public Driver validityCnh(LocalDate validityCnh) {
    this.validityCnh = validityCnh;
    return this;
  }

  /**
   * Data de validade da CNH.
   * @return validityCnh
   */
  @NotNull @Valid 
  @Schema(name = "validityCnh", example = "2027-10-25", description = "Data de validade da CNH.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("validityCnh")
  public LocalDate getValidityCnh() {
    return validityCnh;
  }

  public void setValidityCnh(LocalDate validityCnh) {
    this.validityCnh = validityCnh;
  }

  public Driver validityToxicological(LocalDate validityToxicological) {
    this.validityToxicological = validityToxicological;
    return this;
  }

  /**
   * Data de validade do exame toxicológico.
   * @return validityToxicological
   */
  @NotNull @Valid 
  @Schema(name = "validityToxicological", example = "2024-03-01", description = "Data de validade do exame toxicológico.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("validityToxicological")
  public LocalDate getValidityToxicological() {
    return validityToxicological;
  }

  public void setValidityToxicological(LocalDate validityToxicological) {
    this.validityToxicological = validityToxicological;
  }

  public Driver createdAt(@Nullable OffsetDateTime createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Timestamp de criação do registro.
   * @return createdAt
   */
  @Valid 
  @Schema(name = "createdAt", description = "Timestamp de criação do registro.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
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
    Driver driver = (Driver) o;
    return Objects.equals(this.id, driver.id) &&
        Objects.equals(this.name, driver.name) &&
        Objects.equals(this.cpf, driver.cpf) &&
        Objects.equals(this.rg, driver.rg) &&
        Objects.equals(this.dateBirth, driver.dateBirth) &&
        Objects.equals(this.cnhNumber, driver.cnhNumber) &&
        Objects.equals(this.validityCnh, driver.validityCnh) &&
        Objects.equals(this.validityToxicological, driver.validityToxicological) &&
        Objects.equals(this.createdAt, driver.createdAt);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, cpf, rg, dateBirth, cnhNumber, validityCnh, validityToxicological, createdAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Driver {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    cpf: ").append(toIndentedString(cpf)).append("\n");
    sb.append("    rg: ").append(toIndentedString(rg)).append("\n");
    sb.append("    dateBirth: ").append(toIndentedString(dateBirth)).append("\n");
    sb.append("    cnhNumber: ").append(toIndentedString(cnhNumber)).append("\n");
    sb.append("    validityCnh: ").append(toIndentedString(validityCnh)).append("\n");
    sb.append("    validityToxicological: ").append(toIndentedString(validityToxicological)).append("\n");
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

