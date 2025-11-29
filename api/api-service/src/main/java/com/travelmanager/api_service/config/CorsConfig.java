package com.travelmanager.api_service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuração global de CORS para permitir que o frontend Angular
 * (rodando em portas diferentes) acesse a API do backend Spring Boot.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Aplica as regras CORS a TODOS os endpoints (/**)
        registry.addMapping("/**")
                // Adiciona a origem do seu servidor Angular
                // IMPORTANTE: Adicionar o IP (192.168.1.65) e localhost
                .allowedOrigins("http://192.168.1.65:4200", "http://localhost:4200")
                
                // Permite os métodos HTTP que estamos usando (GET, POST, PUT, PATCH, DELETE)
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE") 
                
                // Permite quaisquer cabeçalhos na requisição
                .allowedHeaders("*") 
                
                // Permite cookies e credenciais (útil se você for implementar autenticação baseada em sessão)
                .allowCredentials(true); 
    }
}