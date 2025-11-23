import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <div class="p-16 bg-white min-h-screen">
      <h1 class="text-4xl font-extrabold text-green-700 mb-4">Dashboard Principal (Área Autenticada)</h1>
      <p class="text-lg text-gray-600 mb-8">
        Parabéns! Você acessou a área protegida do aplicativo.
        Seu projeto Angular está com a estrutura de Lazy Loading e Guards configurada.
      </p>
      
      <div class="bg-green-50 border-l-4 border-green-400 text-green-700 p-4" role="alert">
        <p class="font-bold">Próximo Passo:</p>
        <p>Implementar a lógica de integração com o Keycloak dentro do arquivo <code>src/core/authentication/auth.guard.ts</code>.</p>
      </div>
    </div>
  `,
  styles: [],
  imports: []
})
export class DashboardComponent {}