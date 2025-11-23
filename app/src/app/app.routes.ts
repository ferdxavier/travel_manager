import { Routes } from '@angular/router';
import { AuthGuard } from '../core/authentication/auth.guard'; 

/**
 * Estas rotas são usadas EXCLUSIVAMENTE pelo processo de Server-Side Rendering (SSR).
 * O conteúdo é idêntico ao de app.routes.ts.
 */
export const APP_ROUTES: Routes = [
  // 1. Redireciona a raiz para a área pública
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  
  // 2. Rota para a Área Pública (sem autenticação)
  {
    path: 'public',
    loadChildren: () => import('../features/public/public.routes').then(m => m.PUBLIC_ROUTES)
  },

  // 3. Rota para a Área Logada (requer autenticação)
  {
    path: 'app',
    // O AuthGuard protege esta rota e todas as suas filhas (via loadChildren)
    canActivate: [AuthGuard], 
    loadChildren: () => import('../features/authenticated/authenticated.routes').then(m => m.AUTHENTICATED_ROUTES)
  },
  
  // 4. Rota Wildcard para erros
  {
    path: '**',
    redirectTo: 'public'
  }
];