import { Routes } from '@angular/router';
import { NewPassengerReportComponent } from './new-passenger-report.component';
import { NewDriverReportComponent } from './new-driver-report.component';

// Rotas da área que não requer autenticação
export const REPORT_REASON_ROUTES: Routes = [
  // Rota raiz pública (a Landing Page)
  {
    path: 'driver',
    component: NewDriverReportComponent
  },

  // Rota de Login
  {
    path: 'passenger',
    component: NewPassengerReportComponent
  },

  // Outras rotas públicas (e.g., 'about', 'contact', 'register')
];