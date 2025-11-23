import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes'; 
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa o módulo clássico

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES), 
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(FormsModule) 
  ]
};