import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessário para @if e @for
import { Router } from '@angular/router';
import { Driver } from '../../../generated-api'; // Assumindo o caminho de importação correto para a interface Driver

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 md:p-8 bg-gray-50 min-h-screen">
      
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900">Gestão de Motoristas</h1>
        <button 
          (click)="goToCreateDriver()"
          class="mt-4 md:mt-0 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          + Novo Motorista
        </button>
      </header>

      @if (isLoading()) {
        <div class="text-center p-10">
          <svg class="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 mt-3">A carregar dados dos motoristas...</p>
        </div>
      } 
      
      @else if (drivers().length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (driver of drivers(); track driver.id) {
            <div 
              class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-{{ getStatusColor(driver) }}-500"
              [class.cursor-pointer]="true"
              (click)="viewDetails(driver.id)"
            >
              <div class="flex justify-between items-start mb-3">
                <h2 class="text-xl font-bold text-gray-800">{{ driver.name }}</h2>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-{{ getStatusColor(driver) }}-100 text-{{ getStatusColor(driver) }}-800 capitalize">
                  {{ getStatusLabel(driver) }}
                </span>
              </div>
              
              <p class="text-sm text-gray-500 mb-1">
                <span class="font-semibold text-gray-700">CNH:</span> {{ driver.cnhNumber }}
              </p>
              <p class="text-sm text-gray-500 mb-1">
                <span class="font-semibold text-gray-700">Validade CNH:</span> {{ driver.validityCnh | date: 'dd/MM/yyyy' }}
              </p>
              
              <p class="text-sm text-gray-500 mb-4">
                <span class="font-semibold text-gray-700">Validade Toxicológico:</span> {{ driver.validityToxicological | date: 'dd/MM/yyyy' }}
              </p>
              
              <div class="mt-4 flex justify-end">
                <button 
                  (click)="viewDetails(driver.id); $event.stopPropagation()"
                  class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition duration-150"
                >
                  Ver Detalhes &gt;
                </button>
              </div>
            </div>
          }
        </div>
      }

      @else {
        <div class="text-center p-12 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
          <p class="text-2xl font-semibold text-gray-700 mb-2">Nenhum Motorista Encontrado</p>
          <p class="text-gray-500 mb-6">Cadastre o primeiro motorista da sua empresa.</p>
          <button 
            (click)="goToCreateDriver()"
            class="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
          >
            Adicionar Primeiro Motorista
          </button>
        </div>
      }
      
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriversComponent {
  
  private router = inject(Router);

  isLoading = signal(false);
  
  // Define a data de hoje para simular as validades
  today = new Date();
  
  // Simulação de lista de motoristas (dados mock)
  drivers = signal<Driver[]>([
    { 
      id: 'd-001', 
      name: 'João da Silva', 
      cnhNumber: '12345678901', 
      dateBirth: new Date('1980-01-15'),
      validityCnh: new Date('2026-10-25'), // Válida
      validityToxicological: new Date('2025-05-01'), // Próximo de vencer
    },
    { 
      id: 'd-002', 
      name: 'Maria Oliveira', 
      cnhNumber: '98765432109', 
      dateBirth: new Date('1990-03-20'),
      validityCnh: new Date('2024-11-01'), // Vencida
      validityToxicological: new Date('2026-08-10'), // Válida
    },
    { 
      id: 'd-003', 
      name: 'Pedro Souza', 
      cnhNumber: '11223344556', 
      dateBirth: new Date('1975-07-07'),
      validityCnh: new Date('2030-12-31'), // Válida
      validityToxicological: new Date('2029-01-01'), // Vencida
    },
  ]);

  constructor() {
    // Simular carregamento de dados ao iniciar
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      // **AQUI: Chamada real à API para buscar os motoristas.**
    }, 1000);
  }

  /**
   * Navega para a rota de criação de um novo motorista.
   */
  goToCreateDriver(): void {
    this.router.navigate(['/app/drivers/new']); 
  }

  /**
   * Navega para a rota de detalhes de um motorista específico.
   */
  viewDetails(driverId: string): void {
    // Rota de exemplo para visualização/edição.
    this.router.navigate(['/drivers', driverId]);
  }
  
  /**
   * Determina a cor com base na validade dos documentos (CNH e Toxicológico).
   * Motoristas com documentos vencidos ou próximos de vencer são sinalizados.
   */
  getStatusColor(driver: Driver): 'green' | 'yellow' | 'red' {
    const today = new Date();
    const threeMonths = 90 * 24 * 60 * 60 * 1000; // 90 dias em milissegundos

    const cnhValidity = driver.validityCnh.getTime();
    const toxicologicalValidity = driver.validityToxicological.getTime();

    // 1. Status Crítico (Vermelho): Documento Vencido
    if (cnhValidity < today.getTime() || toxicologicalValidity < today.getTime()) {
      return 'red';
    }

    // 2. Status de Alerta (Amarelo): Documento Vence em 90 dias ou menos
    if (cnhValidity - today.getTime() < threeMonths || toxicologicalValidity - today.getTime() < threeMonths) {
      return 'yellow';
    }

    // 3. Status OK (Verde): Documentos Válidos
    return 'green';
  }

  /**
   * Retorna o rótulo de status baseado na cor (logística de negócio)
   */
  getStatusLabel(driver: Driver): string {
    const color = this.getStatusColor(driver);
    switch (color) {
      case 'red':
        return 'Inválido / Vencido';
      case 'yellow':
        return 'Alerta de Validade';
      case 'green':
        return 'Documentos OK';
      default:
        return 'Status Desconhecido';
    }
  }
}