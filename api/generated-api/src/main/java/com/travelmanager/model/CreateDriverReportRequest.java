package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.travelmanager.model.DriverReportReason;
import java.util.Arrays;
import java.util.UUID;
import org.openapitools.jackson.nullable.JsonNullable;
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
 * Dados coletados de motoristas (integrantes da empresa) via link público. Mais granular.
 */

@Schema(name = "CreateDriverReportRequest", description = "Dados coletados de motoristas (integrantes da empresa) via link público. Mais granular.")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class CreateDriverReportRequest {

  private UUID vehicleId;

  private UUID userId;

  private String description;

  private @Nullable DriverReportReason reportReason;

  private JsonNullable<String> imageBase64 = JsonNullable.<String>undefined();

  private JsonNullable<String> videoBase64 = JsonNullable.<String>undefined();

  public CreateDriverReportRequest() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public CreateDriverReportRequest(UUID vehicleId, UUID userId, String description) {
    this.vehicleId = vehicleId;
    this.userId = userId;
    this.description = description;
  }

  public CreateDriverReportRequest vehicleId(UUID vehicleId) {
    this.vehicleId = vehicleId;
    return this;
  }

  /**
   * ID do veículo (obtido via QR Code).
   * @return vehicleId
   */
  @NotNull @Valid 
  @Schema(name = "vehicleId", example = "a1b2c3d4-e5f6-7890-1234-567890abcdef", description = "ID do veículo (obtido via QR Code).", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("vehicleId")
  public UUID getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(UUID vehicleId) {
    this.vehicleId = vehicleId;
  }

  public CreateDriverReportRequest userId(UUID userId) {
    this.userId = userId;
    return this;
  }

  /**
   * ID do usuário do motorista. (Backend pode ignorar para triagem, mas é importante para auditoria).
   * @return userId
   */
  @NotNull @Valid 
  @Schema(name = "userId", example = "f0e9d8c7-b6a5-4321-fedc-ba9876543210", description = "ID do usuário do motorista. (Backend pode ignorar para triagem, mas é importante para auditoria).", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("userId")
  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public CreateDriverReportRequest description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Breve descrição do problema (máx. 250 caracteres).
   * @return description
   */
  @NotNull @Size(max = 250) 
  @Schema(name = "description", description = "Breve descrição do problema (máx. 250 caracteres).", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("description")
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public CreateDriverReportRequest reportReason(@Nullable DriverReportReason reportReason) {
    this.reportReason = reportReason;
    return this;
  }

  /**
   * Get reportReason
   * @return reportReason
   */
  @Valid 
  @Schema(name = "reportReason", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("reportReason")
  public @Nullable DriverReportReason getReportReason() {
    return reportReason;
  }

  public void setReportReason(@Nullable DriverReportReason reportReason) {
    this.reportReason = reportReason;
  }

  public CreateDriverReportRequest imageBase64(String imageBase64) {
    this.imageBase64 = JsonNullable.of(imageBase64);
    return this;
  }

  /**
   * Imagem opcional do problema em Base64.
   * @return imageBase64
   */
  
  @Schema(name = "imageBase64", description = "Imagem opcional do problema em Base64.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("imageBase64")
  public JsonNullable<String> getImageBase64() {
    return imageBase64;
  }

  public void setImageBase64(JsonNullable<String> imageBase64) {
    this.imageBase64 = imageBase64;
  }

  public CreateDriverReportRequest videoBase64(String videoBase64) {
    this.videoBase64 = JsonNullable.of(videoBase64);
    return this;
  }

  /**
   * Vídeo curto opcional do problema em Base64 (máx. 10MB).
   * @return videoBase64
   */
  
  @Schema(name = "videoBase64", description = "Vídeo curto opcional do problema em Base64 (máx. 10MB).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("videoBase64")
  public JsonNullable<String> getVideoBase64() {
    return videoBase64;
  }

  public void setVideoBase64(JsonNullable<String> videoBase64) {
    this.videoBase64 = videoBase64;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreateDriverReportRequest createDriverReportRequest = (CreateDriverReportRequest) o;
    return Objects.equals(this.vehicleId, createDriverReportRequest.vehicleId) &&
        Objects.equals(this.userId, createDriverReportRequest.userId) &&
        Objects.equals(this.description, createDriverReportRequest.description) &&
        Objects.equals(this.reportReason, createDriverReportRequest.reportReason) &&
        equalsNullable(this.imageBase64, createDriverReportRequest.imageBase64) &&
        equalsNullable(this.videoBase64, createDriverReportRequest.videoBase64);
  }

  private static <T> boolean equalsNullable(JsonNullable<T> a, JsonNullable<T> b) {
    return a == b || (a != null && b != null && a.isPresent() && b.isPresent() && Objects.deepEquals(a.get(), b.get()));
  }

  @Override
  public int hashCode() {
    return Objects.hash(vehicleId, userId, description, reportReason, hashCodeNullable(imageBase64), hashCodeNullable(videoBase64));
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
    sb.append("class CreateDriverReportRequest {\n");
    sb.append("    vehicleId: ").append(toIndentedString(vehicleId)).append("\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    reportReason: ").append(toIndentedString(reportReason)).append("\n");
    sb.append("    imageBase64: ").append(toIndentedString(imageBase64)).append("\n");
    sb.append("    videoBase64: ").append(toIndentedString(videoBase64)).append("\n");
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

