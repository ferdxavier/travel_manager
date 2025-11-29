package com.travelmanager.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonValue;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Motivo granular do relato fornecido pelo motorista.
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-29T13:20:06.835648045-03:00[America/Sao_Paulo]", comments = "Generator version: 7.17.0")
public enum DriverReportReason {
  
  DASHBOARD_LIGHT_CHECK_ENGINE("dashboard_light_check_engine"),
  
  SUSPENSION_NOISE("suspension_noise"),
  
  LOW_TIRE_PRESSURE("low_tire_pressure"),
  
  FLUID_LEAK("fluid_leak"),
  
  BRAKE_SYSTEM_NOISE("brake_system_noise"),
  
  ELECTRIC_FAILURE_AC("electric_failure_ac"),
  
  BODYWORK_DAMAGE("bodywork_damage"),
  
  INTERIOR_DAMAGE("interior_damage");

  private final String value;

  DriverReportReason(String value) {
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
  public static DriverReportReason fromValue(String value) {
    for (DriverReportReason b : DriverReportReason.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }
}

