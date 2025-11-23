import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 sm:p-10">
      <header class="text-center mb-12">
        <h1 class="text-6xl font-extrabold text-blue-800 tracking-tight mb-4">
          Projeto SaaS Escalável
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          A plataforma completa para gerenciar seus projetos e equipes. Foco em performance, segurança e usabilidade.
        </p>
      </header>

      <section class="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl mb-12">
        
        <!-- Feature Card 1 -->
        <div class="bg-white shadow-xl rounded-xl p-6 w-full md:w-1/3 transition duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div class="text-blue-500 mb-4 text-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002-2h2a2 2 0 002-2v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-8 0v0h8m-8 0h8m-8 0h8"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Estrutura Modular</h3>
          <p class="text-gray-500 text-sm">Organização por Features para fácil manutenção e expansão do código.</p>
        </div>

        <!-- Feature Card 2 -->
        <div class="bg-white shadow-xl rounded-xl p-6 w-full md:w-1/3 transition duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div class="text-blue-500 mb-4 text-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Performance com Lazy Load</h3>
          <p class="text-gray-500 text-sm">Carregamento sob demanda (Lazy Loading) para inicialização ultrarrápida do app.</p>
        </div>

        <!-- Feature Card 3 -->
        <div class="bg-white shadow-xl rounded-xl p-6 w-full md:w-1/3 transition duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div class="text-blue-500 mb-4 text-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Segurança Centralizada</h3>
          <p class="text-gray-500 text-sm">Integração com Keycloak (IAM) no Core para autenticação OIDC segura.</p>
        </div>
      </section>

      <!-- Botão de Ação Principal -->
      <button 
        (click)="goToLogin()"
        class="px-8 py-3 bg-blue-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-6"
      >
        Acessar sua Conta
        <!-- Icone de Seta -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <footer class="mt-12 text-sm text-gray-400">
        &copy; 2025 Projeto Escalável. Todos os direitos reservados.
      </footer>
    </div>
  `,
  styles: ``,
  imports: [] // Nenhum módulo/componente externo necessário por enquanto
})
export class LandingPageComponent {
  // Injeta o serviço Router
  private router = inject(Router);

  // Função que navega para a rota de login
  goToLogin() {
    // Redireciona para a rota pública de login
    this.router.navigate(['/public/login']);
  }
}