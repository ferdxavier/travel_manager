import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes'; 
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

// Importa apenas as classes necessárias: Configuration e VehiclesApi (que é o serviço que você injeta)
// O caminho de importação foi ajustado para './generated-api/apis/vehicles-api' ou similar.
// Por favor, verifique o caminho correto para VehiclesApi no seu projeto.
import { Configuration, VehiclesApi } from '../generated-api'; // Ajuste este caminho se necessário
import { FormsModule } from '@angular/forms'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES), 
    provideClientHydration(),
    
    // 1. HTTP Client
    provideHttpClient(),
    
    // 2. Prover a configuração da API (basePath)
    {
      provide: Configuration,
      useFactory: () => new Configuration({
        // Adiciona a URL do seu backend Spring, incluindo o prefixo "/api"
        basePath: 'http://localhost:8080/api', 
      }),
    },
    
    // 3. Fornecer Explicitamente o serviço VehiclesApi
    // ESTE É O PASSO CRUCIAL, POIS SUBSTITUI o importProvidersFrom(ApiModule)
    VehiclesApi, // <--- Adiciona a classe VehiclesApi como um provider
    
    // 4. Módulo FormsModule
    importProvidersFrom(FormsModule) 
  ]
};