import { Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from '../authenticated-layout/authenticated-layout.component';
/**
 * Definição das rotas para a área autenticada do aplicativo (/app).
 * O Layout Autenticado atua como um container pai para todas as rotas filhas.
 */
export const VEHICLE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./vehicles-component').then((m) => m.VehiclesComponent),
  },

  // Rota para Viagens: /app/trips (Injetado dentro do router-outlet do Layout)
  {
    path: 'new',
    loadComponent: () => import('./new-vehicle-component').then((m) => m.NewVehicleComponent),
  },
];
