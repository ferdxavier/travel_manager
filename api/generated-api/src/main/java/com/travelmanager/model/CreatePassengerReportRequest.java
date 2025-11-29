package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.travelmanager.model.PassengerReportReason;
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
 * Dados coletados de passageiros via link público/QR Code. Anónimo e leve.
 */

@Schema(name = "CreatePassengerReportRequest", description = "Dados coletados de passageiros via link público/QR Code. Anónimo e leve.")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public class CreatePassengerReportRequest {

  private UUID vehicleId;

  private String description;

  private PassengerReportReason reportReason;

  private JsonNullable<String> imageBase64 = JsonNullable.<String>undefined();

  private JsonNullable<String> videoBase64 = JsonNullable.<String>undefined();

  public CreatePassengerReportRequest() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public CreatePassengerReportRequest(UUID vehicleId, String description, PassengerReportReason reportReason) {
    this.vehicleId = vehicleId;
    this.description = description;
    this.reportReason = reportReason;
  }

  public CreatePassengerReportRequest vehicleId(UUID vehicleId) {
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

  public CreatePassengerReportRequest description(String description) {
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

  public CreatePassengerReportRequest reportReason(PassengerReportReason reportReason) {
    this.reportReason = reportReason;
    return this;
  }

  /**
   * Get reportReason
   * @return reportReason
   */
  @NotNull @Valid 
  @Schema(name = "reportReason", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("reportReason")
  public PassengerReportReason getReportReason() {
    return reportReason;
  }

  public void setReportReason(PassengerReportReason reportReason) {
    this.reportReason = reportReason;
  }

  public CreatePassengerReportRequest imageBase64(String imageBase64) {
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

  public CreatePassengerReportRequest videoBase64(String videoBase64) {
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
    CreatePassengerReportRequest createPassengerReportRequest = (CreatePassengerReportRequest) o;
    return Objects.equals(this.vehicleId, createPassengerReportRequest.vehicleId) &&
        Objects.equals(this.description, createPassengerReportRequest.description) &&
        Objects.equals(this.reportReason, createPassengerReportRequest.reportReason) &&
        equalsNullable(this.imageBase64, createPassengerReportRequest.imageBase64) &&
        equalsNullable(this.videoBase64, createPassengerReportRequest.videoBase64);
  }

  private static <T> boolean equalsNullable(JsonNullable<T> a, JsonNullable<T> b) {
    return a == b || (a != null && b != null && a.isPresent() && b.isPresent() && Objects.deepEquals(a.get(), b.get()));
  }

  @Override
  public int hashCode() {
    return Objects.hash(vehicleId, description, reportReason, hashCodeNullable(imageBase64), hashCodeNullable(videoBase64));
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
    sb.append("class CreatePassengerReportRequest {\n");
    sb.append("    vehicleId: ").append(toIndentedString(vehicleId)).append("\n");
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

