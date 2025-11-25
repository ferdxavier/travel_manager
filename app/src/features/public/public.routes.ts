import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';

// Rotas da área que não requer autenticação
export const PUBLIC_ROUTES: Routes = [
  // Rota raiz pública (a Landing Page)
  {
    path: '',
    component: LandingPageComponent
  },

  // Rota de Login
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'report-reason',
      loadChildren: () => import('./report-reason/report-reason.routes').then((m) => m.REPORT_REASON_ROUTES),
  },

  // Outras rotas públicas (e.g., 'about', 'contact', 'register')
];