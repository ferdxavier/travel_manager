import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SimpleDriverMenuComponent } from './simple-driver-menu/simple-driver-menu.component';
import { SimplePassengerMenuComponent } from './simple-passenger-menu/simple-passenger-menu.component';
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component';

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
    path: 'single/driver',
    component: SimpleDriverMenuComponent
  },
    {
    path: 'single/passenger',
    component: SimplePassengerMenuComponent
  },
  {
    path: 'report-reason',
      loadChildren: () => import('./report-reason/report-reason.routes').then((m) => m.REPORT_REASON_ROUTES),
  },
    {
    path: 'page-under-construction',
      component: PageUnderConstructionComponent
    },

  // page-under-construction.component
];