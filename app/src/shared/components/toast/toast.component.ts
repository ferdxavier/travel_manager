import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Container principal fixo no topo. 
         Mobile: Centralizado no topo (left-1/2 transform -translate-x-1/2).
         Desktop: Fixo no topo direito (md:left-auto md:right-4 md:transform-none). 
    -->
    <div
      class="fixed z-[100] top-4 space-y-3 p-4 w-full max-w-sm
             left-1/2 transform -translate-x-1/2 
             md:left-auto md:right-4 md:transform-none md:max-w-md"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <!-- Renderiza cada Toast individualmente -->
        <div 
          [ngClass]="getToastClasses(toast.type)"
          class="relative p-4 rounded-xl shadow-lg transition-all duration-300 ease-out flex items-start w-full cursor-pointer"
          (click)="toastService.removeToast(toast.id)"
        >
          <!-- Ícone do Toast -->
          <div [innerHTML]="getIconSvg(toast.type)" class="flex-shrink-0 mr-3 mt-0.5"></div>
          
          <!-- Conteúdo da Mensagem -->
          <div class="flex-grow text-sm font-medium leading-relaxed">
            {{ toast.message }}
          </div>
          
          <!-- Botão de Fechar (X) -->
          <button 
            type="button" 
            class="ml-4 -mr-1 p-1 rounded-full opacity-75 hover:opacity-100 transition"
            aria-label="Close"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  // O bloco 'styles' customizado foi removido para evitar a regra que forçava a posição inferior em mobile.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  // O ToastService é injetado e usado diretamente no template (para signals)
  toastService = inject(ToastService);

  getIconSvg(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
      case 'error':
        return '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';
      case 'warning':
        return '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V9h2v6z"/></svg>';
      default:
        return '';
    }
  }

  getToastClasses(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white border-b-4 border-green-700';
      case 'error':
        return 'bg-red-500 text-white border-b-4 border-red-700';
      case 'warning':
        return 'bg-yellow-500 text-gray-900 border-b-4 border-yellow-700';
      default:
        return 'bg-gray-100 text-gray-900 border-b-4 border-gray-300';
    }
  }
}