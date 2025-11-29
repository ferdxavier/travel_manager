import { Routes } from '@angular/router';

/**
 * Definição das rotas para a gestão de veículos.
 * Estas rotas são lazy loaded sob a rota principal '/app/vehicles'.
 */
export const VEHICLE_ROUTES: Routes = [
  {
    // Rota padrão (path: '/app/vehicles') - Lista de veículos
    path: '',
    loadComponent: () => import('./vehicles.component').then((m) => m.VehiclesComponent),
  },
  {
    // Rota para criação de um novo veículo (path: '/app/vehicles/new')
    path: 'new',
    loadComponent: () => import('./new-vehicle.component').then((m) => m.NewVehicleComponent),
  },
  {
    path: ':id/:replicate', 
    loadComponent: () => import('./new-vehicle.component').then((m) => m.NewVehicleComponent),
  },
];