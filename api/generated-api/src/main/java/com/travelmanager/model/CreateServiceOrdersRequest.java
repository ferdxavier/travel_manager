package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.travelmanager.model.Category;
import com.travelmanager.model.Impact;
import com.travelmanager.model.MaintenanceNature;
import com.travelmanager.model.Priority;
import com.travelmanager.model.Status;
import com.travelmanager.model.Type;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.UUID;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;
import java.util.NoSuchElementException;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * Dados necessários para criar uma nova ordem de serviço.
 */

@Schema(name = "CreateServiceOrdersRequest", description = "Dados necessários para criar uma nova ordem de serviço.")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class CreateServiceOrdersRequest {

  private UUID vehicleId;

  private UUID userId;

  private String description;

  private Type type;

  private Category category;

  private MaintenanceNature maintenanceNature;

  private Impact impact;

  private Priority priority = Priority.MEDIUM;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private JsonNullable<LocalDate> serviceDate = JsonNullable.<LocalDate>undefined();

  private Status status = Status.OPEN;

  public CreateServiceOrdersRequest() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public CreateServiceOrdersRequest(UUID vehicleId, UUID userId, String description, Type type, Category category, MaintenanceNature maintenanceNature, Impact impact, Priority priority) {
    this.vehicleId = vehicleId;
    this.userId = userId;
    this.description = description;
    this.type = type;
    this.category = category;
    this.maintenanceNature = maintenanceNature;
    this.impact = impact;
    this.priority = priority;
  }

  public CreateServiceOrdersRequest vehicleId(UUID vehicleId) {
    this.vehicleId = vehicleId;
    return this;
  }

  /**
   * ID do veículo ao qual a ordem de serviço está associada.
   * @return vehicleId
   */
  @NotNull @Valid 
  @Schema(name = "vehicleId", example = "a1b2c3d4-e5f6-7890-1234-567890abcdef", description = "ID do veículo ao qual a ordem de serviço está associada.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("vehicleId")
  public UUID getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(UUID vehicleId) {
    this.vehicleId = vehicleId;
  }

  public CreateServiceOrdersRequest userId(UUID userId) {
    this.userId = userId;
    return this;
  }

  /**
   * ID do usuário que inseriu/criou a ordem de serviço.
   * @return userId
   */
  @NotNull @Valid 
  @Schema(name = "userId", example = "f0e9d8c7-b6a5-4321-fedc-ba9876543210", description = "ID do usuário que inseriu/criou a ordem de serviço.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("userId")
  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public CreateServiceOrdersRequest description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Descrição detalhada do problema ou serviço a ser realizado.
   * @return description
   */
  @NotNull @Size(max = 500) 
  @Schema(name = "description", description = "Descrição detalhada do problema ou serviço a ser realizado.", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("description")
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public CreateServiceOrdersRequest type(Type type) {
    this.type = type;
    return this;
  }

  /**
   * Get type
   * @return type
   */
  @NotNull @Valid 
  @Schema(name = "type", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("type")
  public Type getType() {
    return type;
  }

  public void setType(Type type) {
    this.type = type;
  }

  public CreateServiceOrdersRequest category(Category category) {
    this.category = category;
    return this;
  }

  /**
   * Get category
   * @return category
   */
  @NotNull @Valid 
  @Schema(name = "category", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("category")
  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public CreateServiceOrdersRequest maintenanceNature(MaintenanceNature maintenanceNature) {
    this.maintenanceNature = maintenanceNature;
    return this;
  }

  /**
   * Get maintenanceNature
   * @return maintenanceNature
   */
  @NotNull @Valid 
  @Schema(name = "maintenanceNature", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("maintenanceNature")
  public MaintenanceNature getMaintenanceNature() {
    return maintenanceNature;
  }

  public void setMaintenanceNature(MaintenanceNature maintenanceNature) {
    this.maintenanceNature = maintenanceNature;
  }

  public CreateServiceOrdersRequest impact(Impact impact) {
    this.impact = impact;
    return this;
  }

  /**
   * Get impact
   * @return impact
   */
  @NotNull @Valid 
  @Schema(name = "impact", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("impact")
  public Impact getImpact() {
    return impact;
  }

  public void setImpact(Impact impact) {
    this.impact = impact;
  }

  public CreateServiceOrdersRequest priority(Priority priority) {
    this.priority = priority;
    return this;
  }

  /**
   * Get priority
   * @return priority
   */
  @NotNull @Valid 
  @Schema(name = "priority", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("priority")
  public Priority getPriority() {
    return priority;
  }

  public void setPriority(Priority priority) {
    this.priority = priority;
  }

  public CreateServiceOrdersRequest serviceDate(LocalDate serviceDate) {
    this.serviceDate = JsonNullable.of(serviceDate);
    return this;
  }

  /**
   * Data em que o serviço foi agendado ou concluído.
   * @return serviceDate
   */
  @Valid 
  @Schema(name = "serviceDate", example = "2025-11-24", description = "Data em que o serviço foi agendado ou concluído.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("serviceDate")
  public JsonNullable<LocalDate> getServiceDate() {
    return serviceDate;
  }

  public void setServiceDate(JsonNullable<LocalDate> serviceDate) {
    this.serviceDate = serviceDate;
  }

  public CreateServiceOrdersRequest status(Status status) {
    this.status = status;
    return this;
  }

  /**
   * Get status
   * @return status
   */
  @Valid 
  @Schema(name = "status", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("status")
  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
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
    CreateServiceOrdersRequest createServiceOrdersRequest = (CreateServiceOrdersRequest) o;
    return Objects.equals(this.vehicleId, createServiceOrdersRequest.vehicleId) &&
        Objects.equals(this.userId, createServiceOrdersRequest.userId) &&
        Objects.equals(this.description, createServiceOrdersRequest.description) &&
        Objects.equals(this.type, createServiceOrdersRequest.type) &&
        Objects.equals(this.category, createServiceOrdersRequest.category) &&
        Objects.equals(this.maintenanceNature, createServiceOrdersRequest.maintenanceNature) &&
        Objects.equals(this.impact, createServiceOrdersRequest.impact) &&
        Objects.equals(this.priority, createServiceOrdersRequest.priority) &&
        equalsNullable(this.serviceDate, createServiceOrdersRequest.serviceDate) &&
        Objects.equals(this.status, createServiceOrdersRequest.status);
  }

  private static <T> boolean equalsNullable(JsonNullable<T> a, JsonNullable<T> b) {
    return a == b || (a != null && b != null && a.isPresent() && b.isPresent() && Objects.deepEquals(a.get(), b.get()));
  }

  @Override
  public int hashCode() {
    return Objects.hash(vehicleId, userId, description, type, category, maintenanceNature, impact, priority, hashCodeNullable(serviceDate), status);
  }

  private static <T> int hashCodeNullable(JsonNullable<T> a) {
    if (a == null) {
      return 1;
    }
    return a.isPresent() ? Arrays.deepHashCode(new Object[]{a.get()}) : 31;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateServiceOrdersRequest {\n");
    sb.append("    vehicleId: ").append(toIndentedString(vehicleId)).append("\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    category: ").append(toIndentedString(category)).append("\n");
    sb.append("    maintenanceNature: ").append(toIndentedString(maintenanceNature)).append("\n");
    sb.append("    impact: ").append(toIndentedString(impact)).append("\n");
    sb.append("    priority: ").append(toIndentedString(priority)).append("\n");
    sb.append("    serviceDate: ").append(toIndentedString(serviceDate)).append("\n");
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

