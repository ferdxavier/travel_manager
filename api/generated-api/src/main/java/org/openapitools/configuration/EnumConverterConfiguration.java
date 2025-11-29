package org.openapitools.configuration;

import com.travelmanager.model.Category;
import com.travelmanager.model.DriverReportReason;
import com.travelmanager.model.Impact;
import com.travelmanager.model.MaintenanceNature;
import com.travelmanager.model.PassengerReportReason;
import com.travelmanager.model.Priority;
import com.travelmanager.model.Status;
import com.travelmanager.model.Type;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;

/**
 * This class provides Spring Converter beans for the enum models in the OpenAPI specification.
 *
 * By default, Spring only converts primitive types to enums using Enum::valueOf, which can prevent
 * correct conversion if the OpenAPI specification is using an `enumPropertyNaming` other than
 * `original` or the specification has an integer enum.
 */
@Configuration(value = "org.openapitools.configuration.enumConverterConfiguration")
public class EnumConverterConfiguration {

    @Bean(name = "org.openapitools.configuration.EnumConverterConfiguration.categoryConverter")
    Converter<String, Category> categoryConverter() {
        return new Converter<String, Category>() {
            @Override
            public Category convert(String source) {
                return Category.fromValue(source);
            }
        };
    }
    @Bean(name = "org.openapitools.configuration.EnumConverterConfiguration.driverReportReasonConverter")
    Converter<String, DriverReportReason> driverReportReasonConverter() {
        return new Converter<String, DriverReportReason>() {
            @Override
            public DriverReportReason convert(String source) {
                return DriverReportReason.fromValue(source);
            }
        };
    }
    @Bean(name = "org.openapitools.configuration.EnumConverterConfiguration.impactConverter")
    Converter<String, Impact> impactConverter() {
        return new Converter<String, Impact>() {
            @Override
            public Impact convert(String source) {
                return Impact.fromValue(source);
            }
        };
    }
    @Bean(name = "org.openapitools.configuration.EnumConverterConfiguration.maintenanceNatureConverter")
    Converter<String, MaintenanceNature> maintenanceNatureConverter() {
        return new Converter<String, MaintenanceNature>() {
            @Override
            public MaintenanceNature convert(String source) {
                return MaintenanceNature.fromValue(source);
            }
        };
    }
    @Bean(name = "org.openapitools.configuration.EnumConverterConfiguration.passengerReportReasonConverter")
    Converter<String, PassengerReportReason> passengerReportReasonConverter() {
        return new Converter<String, PassengerReportReason>() {
            @Override
            public PassengerReportReason convert(String source) {
                return PassengerReportReason.fromValue(source);
            }
        };
    }
    @Bean(name = "org.openapitools.configuration.EnumConverterConfiguration.priorityConverter")
    Converter<String, Priority> priorityConverter() {
        return new Converter<String, Priority>() {
            @Override
            public Priority convert(String source) {
                return Priority.fromValue(source);
            }
        };
    }
    @Bean(name = "org.openapitools.configuration.EnumConverterConfiguration.statusConverter")
    Converter<String, Status> statusConverter() {
        return new Converter<String, Status>() {
            @Override
            public Status convert(String source) {
                return Status.fromValue(source);
            }
        };
    }
    @Bean(name = "org.openapitools.configuration.EnumConverterConfiguration.typeConverter")
    Converter<String, Type> typeConverter() {
        return new Converter<String, Type>() {
            @Override
            public Type convert(String source) {
                return Type.fromValue(source);
            }
        };
    }

}
