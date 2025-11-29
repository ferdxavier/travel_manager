import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importação necessária para usar o serviço de roteamento do Angular
import { Router } from '@angular/router';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [CommonModule],
  // Adiciona a animação CSS de pulsação sutil
  styles: [`
    @keyframes pulse-subtle {
      0%, 100% {
        transform: scale(1);
        /* Mantém a sombra original */
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      50% {
        transform: scale(1.005); /* Escala ligeiramente maior */
        /* Aumenta a intensidade da sombra no meio do ciclo */
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
    }
    .pulsing-card {
      animation: pulse-subtle 3s infinite ease-in-out;
    }
  `],
  template: `
    <!-- Container principal e layout centralizado -->
    <div class="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      
      <!-- Card com Pulsação e Destaque da Borda -->
      <div class="w-full max-w-lg bg-white shadow-2xl border-b-4 border-amber-500 rounded-xl p-8 sm:p-10 text-center pulsing-card">
        
        <!-- Ícone de Aviso Grande (Martelo e Chave Inglesa) - Adiciona efeito de scale ao hover -->
        <div class="flex justify-center mb-6 transition duration-500 ease-in-out hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M14.5 9.5l-5 5"/>
            <path d="M10 14l2 2l2-2"/>
            <path d="M12 11V8"/>
          </svg>
        </div>

        <!-- Título - Adiciona um emoji -->
        <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Em Construção <span class="text-amber-500">🚧</span>
        </h1>
        
        <!-- Mensagem -->
        <p class="text-xl text-gray-600 mb-6">
            Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
        </p>

        <!-- Detalhes Opcionais -->
        <p class="text-sm text-gray-500 mb-8">
            Agradecemos a sua paciência enquanto trabalhamos para melhorar a sua experiência. Por favor, volte ao menu principal.
        </p>

        <!-- Botão de Voltar ao Menu - Melhorado com mais padding, bold e efeito de click/translate -->
        <button 
          (click)="goBack()"
          class="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-extrabold text-lg rounded-full shadow-lg 
                 hover:bg-indigo-700 hover:shadow-xl active:translate-y-0.5 transition duration-150 ease-in-out 
                 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-70 transform"
        >
          Voltar ao Menu Principal
        </button>
        
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageUnderConstructionComponent {
  
  // Injeção do Router no construtor
  constructor(private router: Router) {}

  /**
   * Redireciona para o caminho principal especificado usando o Angular Router.
   */
  goBack(): void {
    const returnPath = '/public';
    console.log(`Redirecionando para o menu principal: ${returnPath} (usando Angular Router)`);
    // Navegação otimizada para SPA
    this.router.navigate([returnPath]);
  }
}