import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Importa o novo componente modal e adiciona ao imports
import { DeleteConfirmationModalComponent } from '../../../shared/components/confirmation-modal/delete-confirmation-modal.component';
import { Vehicle, VehiclesApi } from '../../../generated-api';

// Interface auxiliar para os dados de exclusão
interface VehicleToDelete {
  id: string;
  licensePlate: string;
}

@Component({
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

      @if (isLoading() && vehicles().length === 0) {
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
              
              @if (vehicle.bodyManufacturer) {
                <p class="text-sm text-gray-500 mb-1">
                  <span class="font-semibold text-gray-700">Carroceria:</span> {{ vehicle.bodyManufacturer }}
                </p>
              }

              <p class="text-sm text-gray-500 mb-1">
                <span class="font-semibold text-gray-700">Ano/Modelo:</span> {{ vehicle.modelYear ?? 'N/A' }} / {{ vehicle.manufacturerYear ?? 'N/A' }}
              </p>
              
              <p class="text-sm text-gray-500 mb-4">
                <span class="font-semibold text-gray-700">Placa:</span> {{ vehicle.licensePlate.toUpperCase() }}
              </p>
              
              <div class="mt-4 flex justify-end space-x-4">
                <button 
                  (click)="goToReplicateVehicle(vehicle.id!)"
                  class="text-amber-600 hover:text-amber-800 text-sm gap-1 font-medium transition duration-150 flex items-center"
                  title="Replicar Veículo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-replace-icon lucide-replace"><path d="M14 4a1 1 0 0 1 1-1"/><path d="M15 10a1 1 0 0 1-1-1"/><path d="M21 4a1 1 0 0 0-1-1"/><path d="M21 9a1 1 0 0 1-1 1"/><path d="m3 7 3 3 3-3"/><path d="M6 10V5a2 2 0 0 1 2-2h2"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
                  Replicar
                </button>
                
                <button 
                  (click)="goToEditVehicle(vehicle.id!)"
                  class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition duration-150 flex items-center"
                  title="Editar Veículo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                  Editar
                </button>

                <button 
                  (click)="showDeleteConfirmation(vehicle.id!, vehicle.licensePlate!)"
                  class="text-red-600 hover:text-red-800 text-sm font-medium transition duration-150 flex items-center"
                  title="Excluir Veículo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M12 2v4"/></svg>
                  Excluir
                </button>
              </div>
            </div>
          }
        </div>
        
        @if (hasMorePages()) {
          <div class="flex justify-center mt-8">
            <button 
              (click)="loadVehicles()"
              [disabled]="isLoading()"
              class="px-8 py-3 bg-white border border-indigo-400 text-indigo-600 font-medium rounded-lg shadow-md hover:bg-indigo-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              @if (isLoading()) {
                <svg class="animate-spin h-5 w-5 mr-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              }
              Carregar Mais
            </button>
          </div>
        }

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

    <app-delete-confirmation-modal
        [isVisible]="showDeleteModal()"
        [title]="'Excluir Veículo da Frota'"
        [message]="'Você está prestes a remover o veículo com placa ' + (vehicleToDestroy()?.licensePlate?.toUpperCase() ?? 'N/A') + '. Confirma a exclusão? Esta ação é irreversível.'"
        (confirm)="confirmDelete()"
        (cancel)="cancelDelete()"
    ></app-delete-confirmation-modal>
  `,
  imports: [CommonModule, DeleteConfirmationModalComponent], 
  styles: [`
    /* Estilos omitidos por brevidade, permanecem iguais */
    .text-amber-600 { color: #D97706; }
    .hover\:text-amber-800:hover { color: #92400E; }
    .border-green-500 { border-color: #10B981; }
    .bg-green-100 { background-color: #D1FAE5; }
    .text-green-800 { color: #065F46; }
    .border-yellow-500 { border-color: #F59E0B; }
    .bg-yellow-100 { background-color: #FEF3C7; }
    .text-yellow-800 { color: #92400E; }
    .border-red-500 { border-color: #EF4444; }
    .bg-red-100 { background-color: #FEE2E2; }
    .text-red-800 { color: #991B1B; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VehiclesComponent implements OnInit { 
  
  private router = inject(Router);
  private vehiclesApiService = inject(VehiclesApi); 

  isLoading = signal(false);
  vehicles = signal<Vehicle[]>([]); 
  
  // 🆕 NOVO: Estados para o modal de exclusão
  showDeleteModal = signal(false);
  vehicleToDestroy = signal<VehicleToDelete | null>(null);

  // Parâmetros de Paginação
  private limit = 9; // Número de itens por página
  private offset = signal(0); // Ponto inicial de busca
  hasMorePages = signal(true); // Indica se há mais resultados para carregar
  
  ngOnInit(): void {
    this.loadVehicles(true);
  }

  // ... (loadVehicles permanece inalterado)

  /**
   * Função que chama o backend para buscar a lista de veículos.
   * @param isInitialLoad Indica se esta é a primeira chamada (reseta a lista).
   */
  loadVehicles(isInitialLoad: boolean = false): void {
    if (isInitialLoad) {
      this.offset.set(0);
      this.hasMorePages.set(true);
      // Opcional: Limpar veículos apenas na primeira carga para evitar flicker
      if (this.vehicles().length > 0) this.vehicles.set([]); 
    }
    
    if (this.isLoading() || !this.hasMorePages()) {
      return;
    }
    
    this.isLoading.set(true);
    
    this.vehiclesApiService.listVehicles({ 
        limit: this.limit, 
        offset: this.offset() 
    })
      .then((data: Vehicle[]) => {
        this.vehicles.update(currentVehicles => 
            isInitialLoad ? data : [...currentVehicles, ...data]
        );
        
        this.hasMorePages.set(data.length === this.limit);
        
        if (data.length > 0) {
            this.offset.update(currentOffset => currentOffset + data.length);
        }
        
        this.isLoading.set(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar veículos da API:', error);
        this.isLoading.set(false);
      });
  }

  // --------------------------------------------------
  // 🆕 NOVOS MÉTODOS PARA GERENCIAMENTO DO MODAL
  // --------------------------------------------------

  /**
   * Abre o modal de confirmação, guardando os dados do veículo a ser excluído.
   */
  showDeleteConfirmation(vehicleId: string, licensePlate: string): void {
    this.vehicleToDestroy.set({ id: vehicleId, licensePlate: licensePlate });
    this.showDeleteModal.set(true);
  }

  /**
   * Chamado quando o usuário clica em "Cancelar" no modal.
   */
  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.vehicleToDestroy.set(null);
  }

  /**
   * Chamado quando o usuário clica em "Excluir" no modal.
   * Executa a exclusão e depois fecha o modal.
   */
  async confirmDelete(): Promise<void> {
    const vehicle = this.vehicleToDestroy();
    this.showDeleteModal.set(false); // Fecha o modal imediatamente
    
    if (!vehicle?.id) {
        console.error('ID do veículo para exclusão não encontrado.');
        return;
    }

    const vehicleId = vehicle.id;
    const licensePlate = vehicle.licensePlate;

    try {
      // Idealmente, você mostraria um loader global ou um Toast de "Excluindo..."
      
      await this.vehiclesApiService.deleteVehicle({ id: vehicleId });
      
      // Sucesso: Remove o veículo da lista localmente.
      this.vehicles.update(currentVehicles => 
        currentVehicles.filter(v => v.id !== vehicleId)
      );

      // Lógica de paginação pós-exclusão: Recarrega a página se a lista visível ficar incompleta.
      if (this.vehicles().length % this.limit === (this.limit - 1) && this.hasMorePages()) {
         // Opcional: Força a busca de 1 item para preencher o espaço deixado.
         // Para simplificar, podemos apenas garantir que o offset seja corrigido.
          this.offset.update(currentOffset => currentOffset - 1);
      }
      
      // Em um app real, aqui você mostraria uma notificação de sucesso (e.g., Toast)
      console.log(`Veículo ${licensePlate} excluído com sucesso.`);
      
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      // Em um app real, aqui você mostraria uma notificação de erro
    } finally {
        this.vehicleToDestroy.set(null);
    }
  }

  // --------------------------------------------------
  // ... (goToCreateVehicle, goToEditVehicle, goToReplicateVehicle, getStatusColor permanecem inalterados)
  // --------------------------------------------------

  /**
   * Navega para a rota de criação de um novo veículo.
   */
  goToCreateVehicle(): void {
    this.router.navigate(['/app/vehicles/new']); 
  }

  /**
   * Navega para a rota de edição de um veículo específico.
   * Rota: /app/vehicles/:id
   */
  goToEditVehicle(vehicleId: string): void {
    this.router.navigate(['/app/vehicles', vehicleId, 'false']); 
  }
  
  /**
   * Navega para a rota de replicação de um veículo específico.
   * Rota: /app/vehicles/:id/true
   */
  goToReplicateVehicle(vehicleId: string): void {
    this.router.navigate(['/app/vehicles', vehicleId, 'true']);
  }
  
  /**
   * Retorna a cor Tailwind (ex: 'green') com base no status do veículo.
   */
  getStatusColor(status?: Vehicle['status']): string {
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