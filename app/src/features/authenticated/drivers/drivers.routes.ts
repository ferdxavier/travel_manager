import { Routes } from '@angular/router';
/**
 * Definição das rotas para a área autenticada do aplicativo (/app).
 * O Layout Autenticado atua como um container pai para todas as rotas filhas.
 */
export const DRIVER_ROUTES: Routes = [
    {
    path: '',
    loadComponent: () => import('./drivers-component').then((m) => m.DriversComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./new-driver-component').then((m) => m.NewDriverComponent),
  },
];
