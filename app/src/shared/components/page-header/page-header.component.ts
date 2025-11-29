import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="mb-8 border-b pb-4 flex items-center justify-between">
      <h1 class="text-3xl font-extrabold text-indigo-700 flex items-center">
        @if (iconSvg) {
          <span class="mr-3 text-indigo-500" [innerHTML]="iconSvg"></span>
        }
        {{ title }}
      </h1>
      
      <button (click)="goToList.emit()" class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition duration-150 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        {{ listLabel }}
      </button>
    </header>
  `,
  // Não precisa de estilos específicos, mas Tailwind CSS (classes no template) já fornece o estilo.
})
export class PageHeaderComponent {
  // Título principal da página (Ex: "Cadastro de Novo Motorista")
  @Input({ required: true }) title!: string; 
  
  // Rótulo do botão de retorno (Ex: "Lista de motoristas")
  @Input() listLabel: string = 'Voltar para a lista'; 
  
  // SVG do ícone opcional (passado como string)
  @Input() iconSvg?: string; 

  // Evento para lidar com a navegação (o componente pai lida com a rota)
  @Output() goToList = new EventEmitter<void>(); 
}