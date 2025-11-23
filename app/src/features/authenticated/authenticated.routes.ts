import { Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';

/**
 * Definição das rotas para a área autenticada do aplicativo (/app).
 * O Layout Autenticado atua como um container pai para todas as rotas filhas.
 */
export const AUTHENTICATED_ROUTES: Routes = [
  {
    path: '', // Corresponde ao caminho '/app' (definido no app.routes)
    // CORREÇÃO: O Layout deve ser o componente PARENT para fornecer a Sidebar e o Header
    component: AuthenticatedLayoutComponent,
    children: [
      // Rota do Dashboard: /app/dashboard (Injetado dentro do router-outlet do Layout)
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },

      // Rota para Viagens: /app/trips (Injetado dentro do router-outlet do Layout)
      {
        path: 'trips',
        loadComponent: () => import('./trips/trips-component').then((m) => m.TripsComponent),
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./vehicles/vehicles.routes').then((m) => m.VEHICLE_ROUTES),
      },

      // Rota padrão (default): /app
      // Redireciona para o dashboard, que será carregado DENTRO do Layout.
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
