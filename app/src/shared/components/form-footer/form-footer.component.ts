import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="md:col-span-2"> 
        <footer class="space-x-4 mt-4 border-t pt-4 flex justify-end">
          <button 
            type="button" 
            (click)="cancel.emit()" 
            class="btn-cancel text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg flex items-center transition duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
            {{ cancelLabel }}
          </button>
          
          <button 
            type="submit" 
            [disabled]="isSubmitting"
            class="btn-confirm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg flex items-center transition duration-150 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8h-6v8"/><path d="M7 11h4V7H7z"/></svg>
            @if (isSubmitting) {
              Salvando...
            } @else {
              {{ submitLabel }}
            }
          </button>
        </footer>
    </div>
  `,
})
export class FormFooterComponent {
  // Rótulo do botão de cancelamento (Ex: "Cancelar")
  @Input() cancelLabel: string = 'Cancelar'; 
  
  // Rótulo do botão de submissão (Ex: "Salvar Motorista")
  @Input() submitLabel: string = 'Salvar'; 
  
  // Opcional: Para desabilitar o botão de submit durante o processo
  @Input() isSubmitting: boolean = false; 

  // Evento para lidar com a ação de cancelamento/retorno
  @Output() cancel = new EventEmitter<void>(); 
  
  // Ação de submit é feita pelo próprio <button type="submit"> dentro do formulário pai.
  // Não é necessário um @Output para o submit, mas sim para o cancel.
}