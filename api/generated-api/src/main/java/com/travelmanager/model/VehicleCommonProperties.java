package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * VehicleCommonProperties
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class VehicleCommonProperties {

  private @Nullable String licensePlate;

  private @Nullable String model;

  private @Nullable String vehicleManufacturer;

  private @Nullable Integer modelYear;

  private @Nullable Integer manufacturerYear;

  private @Nullable String renavan;

  private @Nullable Integer passengerNumber;

  private @Nullable String motorNumber;

  private @Nullable String chassisNumber;

  private @Nullable Integer fleetNumber;

  private @Nullable Float fuelTankCapacity;

  private @Nullable Integer entryMileage;

  private @Nullable Float averageConsumption;

  private @Nullable String bodyManufacturer;

  private @Nullable String bodyModel;

  private @Nullable Integer axesNumber;

  private @Nullable String engineDescription;

  private @Nullable Boolean hasBathroom;

  /**
   * Status operacional atual/desejado do veículo.
   */
  public enum StatusEnum {
    AVAILABLE("available"),
    
    MAINTENANCE("maintenance"),
    
    RETIRED("retired");

    private final String value;

    StatusEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static StatusEnum fromValue(String value) {
      for (StatusEnum b : StatusEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  private StatusEnum status = StatusEnum.AVAILABLE;

  public VehicleCommonProperties licensePlate(@Nullable String licensePlate) {
    this.licensePlate = licensePlate;
    return this;
  }

  /**
   * Placa do veículo. Formato Mercosul (LLLNLNN).
   * @return licensePlate
   */
  @Pattern(regexp = "^[a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2}$") @Size(min = 7, max = 7) 
  @Schema(name = "licensePlate", example = "ABC1F34", description = "Placa do veículo. Formato Mercosul (LLLNLNN).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("licensePlate")
  public @Nullable String getLicensePlate() {
    return licensePlate;
  }

  public void setLicensePlate(@Nullable String licensePlate) {
    this.licensePlate = licensePlate;
  }

  public VehicleCommonProperties model(@Nullable String model) {
    this.model = model;
    return this;
  }

  /**
   * Modelo e nome do veículo.
   * @return model
   */
  @Size(min = 2, max = 20) 
  @Schema(name = "model", example = "520 HP", description = "Modelo e nome do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("model")
  public @Nullable String getModel() {
    return model;
  }

  public void setModel(@Nullable String model) {
    this.model = model;
  }

  public VehicleCommonProperties vehicleManufacturer(@Nullable String vehicleManufacturer) {
    this.vehicleManufacturer = vehicleManufacturer;
    return this;
  }

  /**
   * Fabricante do veículo.
   * @return vehicleManufacturer
   */
  @Size(min = 2, max = 20) 
  @Schema(name = "vehicleManufacturer", example = "Scania", description = "Fabricante do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("vehicleManufacturer")
  public @Nullable String getVehicleManufacturer() {
    return vehicleManufacturer;
  }

  public void setVehicleManufacturer(@Nullable String vehicleManufacturer) {
    this.vehicleManufacturer = vehicleManufacturer;
  }

  public VehicleCommonProperties modelYear(@Nullable Integer modelYear) {
    this.modelYear = modelYear;
    return this;
  }

  /**
   * Ano do Modelo do veículo.
   * minimum: 1980
   * maximum: 2099
   * @return modelYear
   */
  @Min(value = 1980) @Max(value = 2099) 
  @Schema(name = "modelYear", example = "2024", description = "Ano do Modelo do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("modelYear")
  public @Nullable Integer getModelYear() {
    return modelYear;
  }

  public void setModelYear(@Nullable Integer modelYear) {
    this.modelYear = modelYear;
  }

  public VehicleCommonProperties manufacturerYear(@Nullable Integer manufacturerYear) {
    this.manufacturerYear = manufacturerYear;
    return this;
  }

  /**
   * Ano de fabricação do veículo.
   * minimum: 1980
   * maximum: 2099
   * @return manufacturerYear
   */
  @Min(value = 1980) @Max(value = 2099) 
  @Schema(name = "manufacturerYear", example = "2023", description = "Ano de fabricação do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("manufacturerYear")
  public @Nullable Integer getManufacturerYear() {
    return manufacturerYear;
  }

  public void setManufacturerYear(@Nullable Integer manufacturerYear) {
    this.manufacturerYear = manufacturerYear;
  }

  public VehicleCommonProperties renavan(@Nullable String renavan) {
    this.renavan = renavan;
    return this;
  }

  /**
   * Número do RENAVAN do veículo.
   * @return renavan
   */
  @Size(min = 6, max = 10) 
  @Schema(name = "renavan", example = "4566546465", description = "Número do RENAVAN do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("renavan")
  public @Nullable String getRenavan() {
    return renavan;
  }

  public void setRenavan(@Nullable String renavan) {
    this.renavan = renavan;
  }

  public VehicleCommonProperties passengerNumber(@Nullable Integer passengerNumber) {
    this.passengerNumber = passengerNumber;
    return this;
  }

  /**
   * Em caso de veículo de transporte, o número de passageiros.
   * minimum: 1
   * maximum: 80
   * @return passengerNumber
   */
  @Min(value = 1) @Max(value = 80) 
  @Schema(name = "passengerNumber", example = "50", description = "Em caso de veículo de transporte, o número de passageiros.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("passengerNumber")
  public @Nullable Integer getPassengerNumber() {
    return passengerNumber;
  }

  public void setPassengerNumber(@Nullable Integer passengerNumber) {
    this.passengerNumber = passengerNumber;
  }

  public VehicleCommonProperties motorNumber(@Nullable String motorNumber) {
    this.motorNumber = motorNumber;
    return this;
  }

  /**
   * Número do motor do veículo.
   * @return motorNumber
   */
  @Size(min = 2, max = 20) 
  @Schema(name = "motorNumber", example = "20234565", description = "Número do motor do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("motorNumber")
  public @Nullable String getMotorNumber() {
    return motorNumber;
  }

  public void setMotorNumber(@Nullable String motorNumber) {
    this.motorNumber = motorNumber;
  }

  public VehicleCommonProperties chassisNumber(@Nullable String chassisNumber) {
    this.chassisNumber = chassisNumber;
    return this;
  }

  /**
   * Número do chassis do veículo.
   * @return chassisNumber
   */
  @Size(min = 10, max = 40) 
  @Schema(name = "chassisNumber", example = "BDH546SDFG565465SD5656BR", description = "Número do chassis do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("chassisNumber")
  public @Nullable String getChassisNumber() {
    return chassisNumber;
  }

  public void setChassisNumber(@Nullable String chassisNumber) {
    this.chassisNumber = chassisNumber;
  }

  public VehicleCommonProperties fleetNumber(@Nullable Integer fleetNumber) {
    this.fleetNumber = fleetNumber;
    return this;
  }

  /**
   * Número interno que corresponte ao id do veículo da frota da empresa.
   * minimum: 1
   * maximum: 99999999
   * @return fleetNumber
   */
  @Min(value = 1) @Max(value = 99999999) 
  @Schema(name = "fleetNumber", example = "1803", description = "Número interno que corresponte ao id do veículo da frota da empresa.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("fleetNumber")
  public @Nullable Integer getFleetNumber() {
    return fleetNumber;
  }

  public void setFleetNumber(@Nullable Integer fleetNumber) {
    this.fleetNumber = fleetNumber;
  }

  public VehicleCommonProperties fuelTankCapacity(@Nullable Float fuelTankCapacity) {
    this.fuelTankCapacity = fuelTankCapacity;
    return this;
  }

  /**
   * Capacidade do tanque de combustivel do veículo.
   * minimum: 1
   * maximum: 10000
   * @return fuelTankCapacity
   */
  @DecimalMin(value = "1") @DecimalMax(value = "10000") 
  @Schema(name = "fuelTankCapacity", example = "500.5", description = "Capacidade do tanque de combustivel do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("fuelTankCapacity")
  public @Nullable Float getFuelTankCapacity() {
    return fuelTankCapacity;
  }

  public void setFuelTankCapacity(@Nullable Float fuelTankCapacity) {
    this.fuelTankCapacity = fuelTankCapacity;
  }

  public VehicleCommonProperties entryMileage(@Nullable Integer entryMileage) {
    this.entryMileage = entryMileage;
    return this;
  }

  /**
   * Quilometragem do veículo na entrada da empresa (no cadastro).
   * minimum: 0
   * maximum: 10000000
   * @return entryMileage
   */
  @Min(value = 0) @Max(value = 10000000) 
  @Schema(name = "entryMileage", example = "3000000", description = "Quilometragem do veículo na entrada da empresa (no cadastro).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("entryMileage")
  public @Nullable Integer getEntryMileage() {
    return entryMileage;
  }

  public void setEntryMileage(@Nullable Integer entryMileage) {
    this.entryMileage = entryMileage;
  }

  public VehicleCommonProperties averageConsumption(@Nullable Float averageConsumption) {
    this.averageConsumption = averageConsumption;
    return this;
  }

  /**
   * Média de Quilômetros por litro de conbustivel.
   * minimum: 0.1
   * maximum: 50.0
   * @return averageConsumption
   */
  @DecimalMin(value = "0.1") @DecimalMax(value = "50.0") 
  @Schema(name = "averageConsumption", example = "2.6", description = "Média de Quilômetros por litro de conbustivel.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("averageConsumption")
  public @Nullable Float getAverageConsumption() {
    return averageConsumption;
  }

  public void setAverageConsumption(@Nullable Float averageConsumption) {
    this.averageConsumption = averageConsumption;
  }

  public VehicleCommonProperties bodyManufacturer(@Nullable String bodyManufacturer) {
    this.bodyManufacturer = bodyManufacturer;
    return this;
  }

  /**
   * Fabricante da carroceria.
   * @return bodyManufacturer
   */
  @Size(min = 2, max = 20) 
  @Schema(name = "bodyManufacturer", example = "Marcopolo", description = "Fabricante da carroceria.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("bodyManufacturer")
  public @Nullable String getBodyManufacturer() {
    return bodyManufacturer;
  }

  public void setBodyManufacturer(@Nullable String bodyManufacturer) {
    this.bodyManufacturer = bodyManufacturer;
  }

  public VehicleCommonProperties bodyModel(@Nullable String bodyModel) {
    this.bodyModel = bodyModel;
    return this;
  }

  /**
   * Nome do modelo da carroceria.
   * @return bodyModel
   */
  @Size(min = 2, max = 20) 
  @Schema(name = "bodyModel", example = "G6 1200", description = "Nome do modelo da carroceria.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("bodyModel")
  public @Nullable String getBodyModel() {
    return bodyModel;
  }

  public void setBodyModel(@Nullable String bodyModel) {
    this.bodyModel = bodyModel;
  }

  public VehicleCommonProperties axesNumber(@Nullable Integer axesNumber) {
    this.axesNumber = axesNumber;
    return this;
  }

  /**
   * Número de eixos que o veículo possui.
   * minimum: 2
   * maximum: 20
   * @return axesNumber
   */
  @Min(value = 2) @Max(value = 20) 
  @Schema(name = "axesNumber", example = "3", description = "Número de eixos que o veículo possui.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("axesNumber")
  public @Nullable Integer getAxesNumber() {
    return axesNumber;
  }

  public void setAxesNumber(@Nullable Integer axesNumber) {
    this.axesNumber = axesNumber;
  }

  public VehicleCommonProperties engineDescription(@Nullable String engineDescription) {
    this.engineDescription = engineDescription;
    return this;
  }

  /**
   * Descrição do motor.
   * @return engineDescription
   */
  @Size(min = 3, max = 100) 
  @Schema(name = "engineDescription", example = "B10 M Intercooler", description = "Descrição do motor.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("engineDescription")
  public @Nullable String getEngineDescription() {
    return engineDescription;
  }

  public void setEngineDescription(@Nullable String engineDescription) {
    this.engineDescription = engineDescription;
  }

  public VehicleCommonProperties hasBathroom(@Nullable Boolean hasBathroom) {
    this.hasBathroom = hasBathroom;
    return this;
  }

  /**
   * Se o veículo possui banheiro
   * @return hasBathroom
   */
  
  @Schema(name = "hasBathroom", example = "true", description = "Se o veículo possui banheiro", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("hasBathroom")
  public @Nullable Boolean getHasBathroom() {
    return hasBathroom;
  }

  public void setHasBathroom(@Nullable Boolean hasBathroom) {
    this.hasBathroom = hasBathroom;
  }

  public VehicleCommonProperties status(StatusEnum status) {
    this.status = status;
    return this;
  }

  /**
   * Status operacional atual/desejado do veículo.
   * @return status
   */
  
  @Schema(name = "status", description = "Status operacional atual/desejado do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("status")
  public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    VehicleCommonProperties vehicleCommonProperties = (VehicleCommonProperties) o;
    return Objects.equals(this.licensePlate, vehicleCommonProperties.licensePlate) &&
        Objects.equals(this.model, vehicleCommonProperties.model) &&
        Objects.equals(this.vehicleManufacturer, vehicleCommonProperties.vehicleManufacturer) &&
        Objects.equals(this.modelYear, vehicleCommonProperties.modelYear) &&
        Objects.equals(this.manufacturerYear, vehicleCommonProperties.manufacturerYear) &&
        Objects.equals(this.renavan, vehicleCommonProperties.renavan) &&
        Objects.equals(this.passengerNumber, vehicleCommonProperties.passengerNumber) &&
        Objects.equals(this.motorNumber, vehicleCommonProperties.motorNumber) &&
        Objects.equals(this.chassisNumber, vehicleCommonProperties.chassisNumber) &&
        Objects.equals(this.fleetNumber, vehicleCommonProperties.fleetNumber) &&
        Objects.equals(this.fuelTankCapacity, vehicleCommonProperties.fuelTankCapacity) &&
        Objects.equals(this.entryMileage, vehicleCommonProperties.entryMileage) &&
        Objects.equals(this.averageConsumption, vehicleCommonProperties.averageConsumption) &&
        Objects.equals(this.bodyManufacturer, vehicleCommonProperties.bodyManufacturer) &&
        Objects.equals(this.bodyModel, vehicleCommonProperties.bodyModel) &&
        Objects.equals(this.axesNumber, vehicleCommonProperties.axesNumber) &&
        Objects.equals(this.engineDescription, vehicleCommonProperties.engineDescription) &&
        Objects.equals(this.hasBathroom, vehicleCommonProperties.hasBathroom) &&
        Objects.equals(this.status, vehicleCommonProperties.status);
  }

  @Override
  public int hashCode() {
    return Objects.hash(licensePlate, model, vehicleManufacturer, modelYear, manufacturerYear, renavan, passengerNumber, motorNumber, chassisNumber, fleetNumber, fuelTankCapacity, entryMileage, averageConsumption, bodyManufacturer, bodyModel, axesNumber, engineDescription, hasBathroom, status);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class VehicleCommonProperties {\n");
    sb.append("    licensePlate: ").append(toIndentedString(licensePlate)).append("\n");
    sb.append("    model: ").append(toIndentedString(model)).append("\n");
    sb.append("    vehicleManufacturer: ").append(toIndentedString(vehicleManufacturer)).append("\n");
    sb.append("    modelYear: ").append(toIndentedString(modelYear)).append("\n");
    sb.append("    manufacturerYear: ").append(toIndentedString(manufacturerYear)).append("\n");
    sb.append("    renavan: ").append(toIndentedString(renavan)).append("\n");
    sb.append("    passengerNumber: ").append(toIndentedString(passengerNumber)).append("\n");
    sb.append("    motorNumber: ").append(toIndentedString(motorNumber)).append("\n");
    sb.append("    chassisNumber: ").append(toIndentedString(chassisNumber)).append("\n");
    sb.append("    fleetNumber: ").append(toIndentedString(fleetNumber)).append("\n");
    sb.append("    fuelTankCapacity: ").append(toIndentedString(fuelTankCapacity)).append("\n");
    sb.append("    entryMileage: ").append(toIndentedString(entryMileage)).append("\n");
    sb.append("    averageConsumption: ").append(toIndentedString(averageConsumption)).append("\n");
    sb.append("    bodyManufacturer: ").append(toIndentedString(bodyManufacturer)).append("\n");
    sb.append("    bodyModel: ").append(toIndentedString(bodyModel)).append("\n");
    sb.append("    axesNumber: ").append(toIndentedString(axesNumber)).append("\n");
    sb.append("    engineDescription: ").append(toIndentedString(engineDescription)).append("\n");
    sb.append("    hasBathroom: ").append(toIndentedString(hasBathroom)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
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

