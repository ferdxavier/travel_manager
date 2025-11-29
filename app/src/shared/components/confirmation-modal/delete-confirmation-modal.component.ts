import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible) {
      <div class="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md transform transition-all">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            {{ title }}
          </h3>
          <p class="text-gray-600 mb-6">{{ message }}</p>
          <div class="flex justify-end space-x-3">
            <button 
              (click)="cancel.emit()" 
              class="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-150"
            >
              Cancelar
            </button>
            <button 
              (click)="confirm.emit()" 
              class="px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-150"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class DeleteConfirmationModalComponent {
  @Input() title: string = 'Confirmar Exclusão';
  @Input() message: string = 'Tem certeza que deseja prosseguir? Esta ação não pode ser desfeita.';
  @Input() confirmText: string = 'Excluir';
  @Input() isVisible: boolean = false;
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}