import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../../../generated-api'; // Certifique-se de que a importação está correta

@Component({
  // O seletor 'app-root' é necessário apenas se este fosse o componente principal da aplicação.
  // Como é um componente de feature, mantemos o nome original do usuário.
  selector: 'app-vehicles',
  template: `
    <div class="p-4 md:p-8 bg-gray-50 min-h-screen">
      
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900">Gestão de Frota</h1>
        <button 
          (click)="goToCreateVehicle()"
          class="mt-4 md:mt-0 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          + Novo Veículo
        </button>
      </header>

      @if (isLoading()) {
        <div class="text-center p-10">
          <svg class="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 mt-3">A carregar dados dos veículos...</p>
        </div>
      } 
      
      @else if (vehicles().length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (vehicle of vehicles(); track vehicle.id) {
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-{{ getStatusColor(vehicle.status) }}-500">
              <div class="flex justify-between items-start mb-3">
                <h2 class="text-xl font-bold text-gray-800">{{ vehicle.model }}</h2>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-{{ getStatusColor(vehicle.status) }}-100 text-{{ getStatusColor(vehicle.status) }}-800 capitalize">
                  {{ vehicle.status === 'available' ? 'Disponível' : vehicle.status === 'maintenance' ? 'Manutenção' : 'Aposentado' }}
                </span>
              </div>
              
              <p class="text-sm text-gray-500 mb-1">
                <span class="font-semibold text-gray-700">Fabricante:</span> {{ vehicle.vehicleManufacturer ?? 'N/A' }}
              </p>
              <p class="text-sm text-gray-500 mb-1">
                <span class="font-semibold text-gray-700">Ano/Modelo:</span> {{ vehicle.modelYear ?? 'N/A' }} / {{ vehicle.manufacturerYear ?? 'N/A' }}
              </p>
              
              <p class="text-sm text-gray-500 mb-4">
                <span class="font-semibold text-gray-700">Placa:</span> {{ vehicle.licensePlate }}
              </p>
              
              <div class="mt-4 flex justify-end">
                <button 
                  (click)="viewDetails(vehicle.id)"
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
          <p class="text-2xl font-semibold text-gray-700 mb-2">Nenhum Veículo Encontrado</p>
          <p class="text-gray-500 mb-6">Parece que a sua frota está vazia. Comece por adicionar um novo veículo.</p>
          <button 
            (click)="goToCreateVehicle()"
            class="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
          >
            Adicionar Primeiro Veículo
          </button>
        </div>
      }
      
    </div>
  `,
  // Não são necessários estilos customizados, pois usamos a sintaxe completa do Tailwind no template.
  styles: [],
  imports: [],
  // Usar OnPush é uma boa prática para melhorar a performance.
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VehiclesComponent {
  
  // Injeção do Router para navegação programática (necessita de configuração de rota no Angular)
  private router = inject(Router);

  // Simulação de estado de carregamento
  isLoading = signal(false);

  // Sinal para armazenar a lista de veículos (dados simulados com novos campos)
  vehicles = signal<Vehicle[]>([
    { 
      id: 'v-001', 
      licensePlate: 'QWE1G78', 
      model: 'Civic LX', 
      vehicleManufacturer: 'Honda',
      manufacturerYear: 2023,
      modelYear: 2024,
      status: 'available' 
    },
    { 
      id: 'v-002', 
      licensePlate: 'RTY2H12', 
      model: 'Doblo Cargo', 
      vehicleManufacturer: 'Fiat',
      modelYear: 2022,
      status: 'maintenance' 
    },
    { 
      id: 'v-003', 
      licensePlate: 'UIO3I56', 
      model: 'Gol 1.0', 
      vehicleManufacturer: 'Volkswagen',
      modelYear: 2018,
      status: 'available' 
    },
    { 
      id: 'v-004', 
      licensePlate: 'ASD4J90', 
      model: 'Sprinter 314', 
      vehicleManufacturer: 'Mercedes-Benz',
      modelYear: 2023,
      status: 'retired' 
    },
  ]);

  constructor() {
    // Simular carregamento de dados ao iniciar
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      // Aqui seria a chamada real à API para buscar os veículos.
    }, 1000);
  }

  /**
   * Navega para a rota de criação de um novo veículo.
   * A rota esperada é 'vehicles/new'.
   */
  goToCreateVehicle(): void {
    // IMPORTANTE: Certifique-se de que esta rota está configurada no seu módulo de roteamento.
    this.router.navigate(['/app/vehicles/new']); 
  }

  /**
   * Navega para a rota de detalhes de um veículo específico.
   */
  viewDetails(vehicleId: string): void {
    // Rota de exemplo para visualização/edição.
    this.router.navigate(['/vehicles', vehicleId]);
  }
  
  /**
   * Retorna a cor Tailwind (ex: 'green') com base no status do veículo.
   * Isso ajuda a aplicar cores dinamicamente no template.
   */
  getStatusColor(status: Vehicle['status']): string {
    switch (status) {
      case 'available':
        return 'green';
      case 'maintenance':
        return 'yellow';
      case 'retired':
        return 'red';
      default:
        return 'gray';
    }
  }
}