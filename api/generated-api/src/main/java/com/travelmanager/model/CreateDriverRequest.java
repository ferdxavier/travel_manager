package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.time.LocalDate;
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
 * Dados necessários para criar ou atualizar um motorista (sem o ID gerado).
 */

@Schema(name = "CreateDriverRequest", description = "Dados necessários para criar ou atualizar um motorista (sem o ID gerado).")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class CreateDriverRequest {

  private String name;

  private String cpf;

  private @Nullable String rg;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate dateBirth;

  private String cnhNumber;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate validityCnh;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate validityToxicological;

  public CreateDriverRequest() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public CreateDriverRequest(String name, String cpf, LocalDate dateBirth, String cnhNumber, LocalDate validityCnh, LocalDate validityToxicological) {
    this.name = name;
    this.cpf = cpf;
    this.dateBirth = dateBirth;
    this.cnhNumber = cnhNumber;
    this.validityCnh = validityCnh;
    this.validityToxicological = validityToxicological;
  }

  public CreateDriverRequest name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Nome do motorista.
   * @return name
   */
  @NotNull @Size(min = 3, max = 60) 
  @Schema(name = "name", example = "Fernando Castro de Abreu", description = "Nome do motorista.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public CreateDriverRequest cpf(String cpf) {
    this.cpf = cpf;
    return this;
  }

  /**
   * Número do CPF (apenas 11 dígitos).
   * @return cpf
   */
  @NotNull @Pattern(regexp = "^[0-9]{11}$") @Size(min = 11, max = 11) 
  @Schema(name = "cpf", example = "06556256359", description = "Número do CPF (apenas 11 dígitos).", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("cpf")
  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public CreateDriverRequest rg(@Nullable String rg) {
    this.rg = rg;
    return this;
  }

  /**
   * Número do RG ou Carteira de Identidade.
   * @return rg
   */
  @Size(min = 3, max = 15) 
  @Schema(name = "rg", example = "13569569", description = "Número do RG ou Carteira de Identidade.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("rg")
  public @Nullable String getRg() {
    return rg;
  }

  public void setRg(@Nullable String rg) {
    this.rg = rg;
  }

  public CreateDriverRequest dateBirth(LocalDate dateBirth) {
    this.dateBirth = dateBirth;
    return this;
  }

  /**
   * Data de Nascimento (YYYY-MM-DD). Requer validação de idade (+18) no código da API.
   * @return dateBirth
   */
  @NotNull @Valid 
  @Schema(name = "dateBirth", example = "1985-06-15", description = "Data de Nascimento (YYYY-MM-DD). Requer validação de idade (+18) no código da API.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("dateBirth")
  public LocalDate getDateBirth() {
    return dateBirth;
  }

  public void setDateBirth(LocalDate dateBirth) {
    this.dateBirth = dateBirth;
  }

  public CreateDriverRequest cnhNumber(String cnhNumber) {
    this.cnhNumber = cnhNumber;
    return this;
  }

  /**
   * Número da Carteira Nacional de Habilitação (CNH).
   * @return cnhNumber
   */
  @NotNull @Pattern(regexp = "^[0-9]{8,15}$") @Size(max = 15) 
  @Schema(name = "cnhNumber", example = "2536565936616546", description = "Número da Carteira Nacional de Habilitação (CNH).", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("cnhNumber")
  public String getCnhNumber() {
    return cnhNumber;
  }

  public void setCnhNumber(String cnhNumber) {
    this.cnhNumber = cnhNumber;
  }

  public CreateDriverRequest validityCnh(LocalDate validityCnh) {
    this.validityCnh = validityCnh;
    return this;
  }

  /**
   * Data de validade da CNH. Requer validação para ser no futuro no código da API.
   * @return validityCnh
   */
  @NotNull @Valid 
  @Schema(name = "validityCnh", example = "2027-10-25", description = "Data de validade da CNH. Requer validação para ser no futuro no código da API.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("validityCnh")
  public LocalDate getValidityCnh() {
    return validityCnh;
  }

  public void setValidityCnh(LocalDate validityCnh) {
    this.validityCnh = validityCnh;
  }

  public CreateDriverRequest validityToxicological(LocalDate validityToxicological) {
    this.validityToxicological = validityToxicological;
    return this;
  }

  /**
   * Data de validade do exame toxicológico. Requer validação para ser no futuro no código da API.
   * @return validityToxicological
   */
  @NotNull @Valid 
  @Schema(name = "validityToxicological", example = "2024-03-01", description = "Data de validade do exame toxicológico. Requer validação para ser no futuro no código da API.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("validityToxicological")
  public LocalDate getValidityToxicological() {
    return validityToxicological;
  }

  public void setValidityToxicological(LocalDate validityToxicological) {
    this.validityToxicological = validityToxicological;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreateDriverRequest createDriverRequest = (CreateDriverRequest) o;
    return Objects.equals(this.name, createDriverRequest.name) &&
        Objects.equals(this.cpf, createDriverRequest.cpf) &&
        Objects.equals(this.rg, createDriverRequest.rg) &&
        Objects.equals(this.dateBirth, createDriverRequest.dateBirth) &&
        Objects.equals(this.cnhNumber, createDriverRequest.cnhNumber) &&
        Objects.equals(this.validityCnh, createDriverRequest.validityCnh) &&
        Objects.equals(this.validityToxicological, createDriverRequest.validityToxicological);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, cpf, rg, dateBirth, cnhNumber, validityCnh, validityToxicological);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateDriverRequest {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    cpf: ").append(toIndentedString(cpf)).append("\n");
    sb.append("    rg: ").append(toIndentedString(rg)).append("\n");
    sb.append("    dateBirth: ").append(toIndentedString(dateBirth)).append("\n");
    sb.append("    cnhNumber: ").append(toIndentedString(cnhNumber)).append("\n");
    sb.append("    validityCnh: ").append(toIndentedString(validityCnh)).append("\n");
    sb.append("    validityToxicological: ").append(toIndentedString(validityToxicological)).append("\n");
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

