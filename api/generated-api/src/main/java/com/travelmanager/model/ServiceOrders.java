package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.time.LocalDate;
import java.time.OffsetDateTime;
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
 * Representação completa de ordem de serviço para veiculos, com detalhes granulares sobre o tipo e prioridade da manutenção.
 */

@Schema(name = "ServiceOrders", description = "Representação completa de ordem de serviço para veiculos, com detalhes granulares sobre o tipo e prioridade da manutenção.")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class ServiceOrders {

  private @Nullable UUID id;

  private @Nullable UUID vehicleId;

  private @Nullable UUID userId;

  /**
   * Status atual da ordem de serviço.
   */
  public enum StatusEnum {
    OPEN("open"),
    
    IN_PROGRESS("in_progress"),
    
    CLOSED("closed"),
    
    CANCELED("canceled");

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

  private StatusEnum status = StatusEnum.OPEN;

  /**
   * Tipo de manutenção: interna (frota própria) ou externa (terceirizada).
   */
  public enum TypeEnum {
    INTERNAL("internal"),
    
    EXTERNAL("external");

    private final String value;

    TypeEnum(String value) {
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
    public static TypeEnum fromValue(String value) {
      for (TypeEnum b : TypeEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  private @Nullable TypeEnum type;

  /**
   * Categoria da manutenção, focando na área do veículo.
   */
  public enum CategoryEnum {
    ENGINE_AND_TRANSMISSION("engine_and_transmission"),
    
    CHASSIS_AND_SUSPENSION("chassis_and_suspension"),
    
    BODY_AND_INTERIOR("body_and_interior"),
    
    ELECTRIC_SYSTEM("electric_system"),
    
    TIRES_AND_WHEELS("tires_and_wheels"),
    
    GENERAL_INSPECTION("general_inspection");

    private final String value;

    CategoryEnum(String value) {
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
    public static CategoryEnum fromValue(String value) {
      for (CategoryEnum b : CategoryEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  private @Nullable CategoryEnum category;

  /**
   * Natureza da manutenção: preventiva (agendada), corretiva (necessária/quebra) ou preditiva (baseada em dados).
   */
  public enum MaintenanceNatureEnum {
    PREVENTIVE("preventive"),
    
    CORRECTIVE("corrective"),
    
    PREDICTIVE("predictive");

    private final String value;

    MaintenanceNatureEnum(String value) {
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
    public static MaintenanceNatureEnum fromValue(String value) {
      for (MaintenanceNatureEnum b : MaintenanceNatureEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  private @Nullable MaintenanceNatureEnum maintenanceNature;

  /**
   * Impacto imediato no veículo: bloqueante (impede uso) ou não-bloqueante.
   */
  public enum ImpactEnum {
    BLOCKING("blocking"),
    
    NECESSARY("necessary"),
    
    NON_CRITICAL("non_critical");

    private final String value;

    ImpactEnum(String value) {
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
    public static ImpactEnum fromValue(String value) {
      for (ImpactEnum b : ImpactEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  private @Nullable ImpactEnum impact;

  /**
   * Prioridade atribuída à ordem de serviço (afeta o SLA).
   */
  public enum PriorityEnum {
    LOW("low"),
    
    MEDIUM("medium"),
    
    HIGH("high"),
    
    CRITICAL("critical");

    private final String value;

    PriorityEnum(String value) {
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
    public static PriorityEnum fromValue(String value) {
      for (PriorityEnum b : PriorityEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  private PriorityEnum priority = PriorityEnum.MEDIUM;

  private @Nullable String description;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private JsonNullable<LocalDate> serviceDate = JsonNullable.<LocalDate>undefined();

  private JsonNullable<Float> cost = JsonNullable.<Float>undefined();

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private @Nullable OffsetDateTime createdAt;

  public ServiceOrders id(@Nullable UUID id) {
    this.id = id;
    return this;
  }

  /**
   * ID único gerado pelo sistema.
   * @return id
   */
  @Valid 
  @Schema(name = "id", description = "ID único gerado pelo sistema.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("id")
  public @Nullable UUID getId() {
    return id;
  }

  public void setId(@Nullable UUID id) {
    this.id = id;
  }

  public ServiceOrders vehicleId(@Nullable UUID vehicleId) {
    this.vehicleId = vehicleId;
    return this;
  }

  /**
   * ID do veículo ao qual a ordem de serviço está associada.
   * @return vehicleId
   */
  @Valid 
  @Schema(name = "vehicleId", example = "a1b2c3d4-e5f6-7890-1234-567890abcdef", description = "ID do veículo ao qual a ordem de serviço está associada.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("vehicleId")
  public @Nullable UUID getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(@Nullable UUID vehicleId) {
    this.vehicleId = vehicleId;
  }

  public ServiceOrders userId(@Nullable UUID userId) {
    this.userId = userId;
    return this;
  }

  /**
   * ID do usuário que inseriu/criou a ordem de serviço.
   * @return userId
   */
  @Valid 
  @Schema(name = "userId", example = "f0e9d8c7-b6a5-4321-fedc-ba9876543210", description = "ID do usuário que inseriu/criou a ordem de serviço.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("userId")
  public @Nullable UUID getUserId() {
    return userId;
  }

  public void setUserId(@Nullable UUID userId) {
    this.userId = userId;
  }

  public ServiceOrders status(StatusEnum status) {
    this.status = status;
    return this;
  }

  /**
   * Status atual da ordem de serviço.
   * @return status
   */
  
  @Schema(name = "status", description = "Status atual da ordem de serviço.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("status")
  public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }

  public ServiceOrders type(@Nullable TypeEnum type) {
    this.type = type;
    return this;
  }

  /**
   * Tipo de manutenção: interna (frota própria) ou externa (terceirizada).
   * @return type
   */
  
  @Schema(name = "type", example = "internal", description = "Tipo de manutenção: interna (frota própria) ou externa (terceirizada).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("type")
  public @Nullable TypeEnum getType() {
    return type;
  }

  public void setType(@Nullable TypeEnum type) {
    this.type = type;
  }

  public ServiceOrders category(@Nullable CategoryEnum category) {
    this.category = category;
    return this;
  }

  /**
   * Categoria da manutenção, focando na área do veículo.
   * @return category
   */
  
  @Schema(name = "category", example = "chassis_and_suspension", description = "Categoria da manutenção, focando na área do veículo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("category")
  public @Nullable CategoryEnum getCategory() {
    return category;
  }

  public void setCategory(@Nullable CategoryEnum category) {
    this.category = category;
  }

  public ServiceOrders maintenanceNature(@Nullable MaintenanceNatureEnum maintenanceNature) {
    this.maintenanceNature = maintenanceNature;
    return this;
  }

  /**
   * Natureza da manutenção: preventiva (agendada), corretiva (necessária/quebra) ou preditiva (baseada em dados).
   * @return maintenanceNature
   */
  
  @Schema(name = "maintenanceNature", example = "corrective", description = "Natureza da manutenção: preventiva (agendada), corretiva (necessária/quebra) ou preditiva (baseada em dados).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("maintenanceNature")
  public @Nullable MaintenanceNatureEnum getMaintenanceNature() {
    return maintenanceNature;
  }

  public void setMaintenanceNature(@Nullable MaintenanceNatureEnum maintenanceNature) {
    this.maintenanceNature = maintenanceNature;
  }

  public ServiceOrders impact(@Nullable ImpactEnum impact) {
    this.impact = impact;
    return this;
  }

  /**
   * Impacto imediato no veículo: bloqueante (impede uso) ou não-bloqueante.
   * @return impact
   */
  
  @Schema(name = "impact", example = "blocking", description = "Impacto imediato no veículo: bloqueante (impede uso) ou não-bloqueante.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("impact")
  public @Nullable ImpactEnum getImpact() {
    return impact;
  }

  public void setImpact(@Nullable ImpactEnum impact) {
    this.impact = impact;
  }

  public ServiceOrders priority(PriorityEnum priority) {
    this.priority = priority;
    return this;
  }

  /**
   * Prioridade atribuída à ordem de serviço (afeta o SLA).
   * @return priority
   */
  
  @Schema(name = "priority", description = "Prioridade atribuída à ordem de serviço (afeta o SLA).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("priority")
  public PriorityEnum getPriority() {
    return priority;
  }

  public void setPriority(PriorityEnum priority) {
    this.priority = priority;
  }

  public ServiceOrders description(@Nullable String description) {
    this.description = description;
    return this;
  }

  /**
   * Descrição detalhada do problema ou serviço a ser realizado.
   * @return description
   */
  @Size(max = 500) 
  @Schema(name = "description", description = "Descrição detalhada do problema ou serviço a ser realizado.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("description")
  public @Nullable String getDescription() {
    return description;
  }

  public void setDescription(@Nullable String description) {
    this.description = description;
  }

  public ServiceOrders serviceDate(LocalDate serviceDate) {
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

  public ServiceOrders cost(Float cost) {
    this.cost = JsonNullable.of(cost);
    return this;
  }

  /**
   * Custo total da ordem de serviço, se aplicável.
   * @return cost
   */
  
  @Schema(name = "cost", example = "450.75", description = "Custo total da ordem de serviço, se aplicável.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("cost")
  public JsonNullable<Float> getCost() {
    return cost;
  }

  public void setCost(JsonNullable<Float> cost) {
    this.cost = cost;
  }

  public ServiceOrders createdAt(@Nullable OffsetDateTime createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Carimbo de data/hora da criação do registo.
   * @return createdAt
   */
  @Valid 
  @Schema(name = "createdAt", description = "Carimbo de data/hora da criação do registo.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
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
    ServiceOrders serviceOrders = (ServiceOrders) o;
    return Objects.equals(this.id, serviceOrders.id) &&
        Objects.equals(this.vehicleId, serviceOrders.vehicleId) &&
        Objects.equals(this.userId, serviceOrders.userId) &&
        Objects.equals(this.status, serviceOrders.status) &&
        Objects.equals(this.type, serviceOrders.type) &&
        Objects.equals(this.category, serviceOrders.category) &&
        Objects.equals(this.maintenanceNature, serviceOrders.maintenanceNature) &&
        Objects.equals(this.impact, serviceOrders.impact) &&
        Objects.equals(this.priority, serviceOrders.priority) &&
        Objects.equals(this.description, serviceOrders.description) &&
        equalsNullable(this.serviceDate, serviceOrders.serviceDate) &&
        equalsNullable(this.cost, serviceOrders.cost) &&
        Objects.equals(this.createdAt, serviceOrders.createdAt);
  }

  private static <T> boolean equalsNullable(JsonNullable<T> a, JsonNullable<T> b) {
    return a == b || (a != null && b != null && a.isPresent() && b.isPresent() && Objects.deepEquals(a.get(), b.get()));
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, vehicleId, userId, status, type, category, maintenanceNature, impact, priority, description, hashCodeNullable(serviceDate), hashCodeNullable(cost), createdAt);
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
    sb.append("class ServiceOrders {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    vehicleId: ").append(toIndentedString(vehicleId)).append("\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    category: ").append(toIndentedString(category)).append("\n");
    sb.append("    maintenanceNature: ").append(toIndentedString(maintenanceNature)).append("\n");
    sb.append("    impact: ").append(toIndentedString(impact)).append("\n");
    sb.append("    priority: ").append(toIndentedString(priority)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    serviceDate: ").append(toIndentedString(serviceDate)).append("\n");
    sb.append("    cost: ").append(toIndentedString(cost)).append("\n");
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

