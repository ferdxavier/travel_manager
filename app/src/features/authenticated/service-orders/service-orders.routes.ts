import { Routes } from '@angular/router';
/**
 * Definição das rotas para a área autenticada do aplicativo (/app).
 * O Layout Autenticado atua como um container pai para todas as rotas filhas.
 */
export const SERVICE_ORDERS_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./new-service-orders-component').then((m) => m.NewServiceOrdersComponent),
  },
];
