import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * AuthGuard - Função de guarda de rota para proteger rotas autenticadas.
 * * Por enquanto, está configurado para sempre retornar 'true' (permitir o acesso),
 * apenas para resolver o erro de compilação.
 * * TODO: Implementar a lógica real de autenticação e verificação de token (Keycloak).
 */
export const AuthGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService); // Serviço a ser criado e injetado
  const router = inject(Router);

  // Lógica de autenticação SIMULADA:
  const isAuthenticated = true; // Altere para 'false' para testar o redirecionamento

  if (isAuthenticated) {
    return true; // Permite o acesso à rota
  } else {
    // Se não estiver autenticado, redireciona para a página de login
    console.warn('Acesso negado. Redirecionando para a área pública/login.');
    return router.createUrlTree(['/public/login']);
  }
};