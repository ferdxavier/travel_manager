import { Injectable, signal } from '@angular/core';

// Define o formato de cada notificação toast
export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
  duration: number; // Duração em milissegundos
}

// O ID inicial para garantir que cada toast tenha um ID único
let nextToastId = 0;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // Signal para armazenar a lista de toasts ativos
  toasts = signal<Toast[]>([]);

  /**
   * Adiciona uma mensagem de sucesso.
   * @param message A mensagem a ser exibida.
   * @param duration Duração em ms (padrão: 3000ms).
   */
  success(message: string, duration: number = 3000): void {
    this.addToast(message, 'success', duration);
  }

  /**
   * Adiciona uma mensagem de erro.
   * @param message A mensagem a ser exibida.
   * @param duration Duração em ms (padrão: 5000ms).
   */
  error(message: string, duration: number = 5000): void {
    this.addToast(message, 'error', duration);
  }
  
  /**
   * Adiciona uma mensagem de aviso.
   * @param message A mensagem a ser exibida.
   * @param duration Duração em ms (padrão: 4000ms).
   */
  warning(message: string, duration: number = 4000): void {
    this.addToast(message, 'warning', duration);
  }

  /**
   * Lógica privada para adicionar e programar a remoção de um toast.
   */
  private addToast(
    message: string,
    type: 'success' | 'error' | 'warning',
    duration: number
  ): void {
    const id = nextToastId++;
    const newToast: Toast = { id, message, type, duration };

    // Adiciona o novo toast à lista
    this.toasts.update((currentToasts) => [...currentToasts, newToast]);

    // Agenda a remoção
    setTimeout(() => this.removeToast(id), duration);
  }

  /**
   * Remove um toast específico por ID.
   * É pública, mas usada internamente e pelo ToastComponent (via botão 'X').
   * @param id O ID do toast a ser removido.
   */
  removeToast(id: number): void {
    this.toasts.update((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }
}