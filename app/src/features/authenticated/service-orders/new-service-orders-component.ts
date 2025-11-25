import { ChangeDetectionStrategy, Component, computed, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category, CreateServiceOrdersRequest, Impact, MaintenanceNature, Priority, Status, Type, Vehicle } from '../../../generated-api';

// =======================================================================================
// DADOS MOCKADOS E CONSTANTES PARA O COMPONENTE
// Em um app real, estes valores viriam de um Service ou do backend.
// =======================================================================================

const MOCK_USER_ID = "f0e9d8c7-b6a5-4321-fedc-ba9876543210"; // ID do usuário que insere a OS (obrigatório)

// Converte os enums em arrays usáveis para o <select>
const VEHICLE_TYPES = Object.values(Type);
const CATEGORIES = Object.values(Category);
const MAINTENANCE_NATURES = Object.values(MaintenanceNature);
const IMPACTS = Object.values(Impact);
const PRIORITIES = Object.values(Priority);
const STATUSES = Object.values(Status);

const MOCK_VEHICLES: Vehicle[] = [
  { id: '1a2b-3c4d', licensePlate: 'ABC1D23', model: 'Atron 1635', status: 'available' as any },
  { id: '5e6f-7g8h', licensePlate: 'XYZ9K87', model: 'Sprinter 516', status: 'maintenance' as any },
  { id: '9i0j-1k2l', licensePlate: 'JKL4M56', model: 'Actros 2651', status: 'available' as any },
];


@Component({
  selector: 'app-root', // O Seletor deve ser 'app-root'
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
        Nova Ordem de Serviço
      </h1>
      <form [formGroup]="serviceOrderForm" (ngSubmit)="onSubmit()" 
            class="bg-white shadow-xl rounded-xl p-6 space-y-6 border border-gray-100">

        <!-- Seleção do Veículo -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="col-span-1">
            <label for="vehicleId" class="block text-sm font-medium text-gray-700 mb-1">Veículo (Placa e Modelo)</label>
            <select formControlName="vehicleId" id="vehicleId"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
              <option value="" disabled>Selecione o Veículo</option>
              @for (vehicle of vehicles(); track vehicle.id) {
                <option [value]="vehicle.id">
                  {{ vehicle.licensePlate }} - {{ vehicle.model }}
                </option>
              }
            </select>
            @if (serviceOrderForm.get('vehicleId')?.invalid && serviceOrderForm.get('vehicleId')?.touched) {
              <p class="text-xs text-red-500 mt-1">O veículo é obrigatório.</p>
            }
          </div>

          <!-- Tipo de Manutenção -->
          <div class="col-span-1">
            <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Manutenção</label>
            <select formControlName="type" id="type"
              class="w-full p-3 border border-gray-300 rounded-lg capitalize focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
              <option value="" disabled>Selecione o Tipo</option>
              @for (type of vehicleTypes; track type) {
                <option [value]="type">{{ type.replace('_', ' ') }}</option>
              }
            </select>
            @if (serviceOrderForm.get('type')?.invalid && serviceOrderForm.get('type')?.touched) {
              <p class="text-xs text-red-500 mt-1">O tipo é obrigatório.</p>
            }
          </div>
        </div>

        <!-- Categoria e Natureza -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select formControlName="category" id="category"
              class="w-full p-3 border border-gray-300 rounded-lg capitalize focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
              <option value="" disabled>Selecione a Categoria</option>
              @for (category of categories; track category) {
                <option [value]="category">{{ category.replace('_', ' ') }}</option>
              }
            </select>
            @if (serviceOrderForm.get('category')?.invalid && serviceOrderForm.get('category')?.touched) {
              <p class="text-xs text-red-500 mt-1">A categoria é obrigatória.</p>
            }
          </div>
          <div>
            <label for="maintenanceNature" class="block text-sm font-medium text-gray-700 mb-1">Natureza</label>
            <select formControlName="maintenanceNature" id="maintenanceNature"
              class="w-full p-3 border border-gray-300 rounded-lg capitalize focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
              <option value="" disabled>Selecione a Natureza</option>
              @for (nature of maintenanceNatures; track nature) {
                <option [value]="nature">{{ nature.replace('_', ' ') }}</option>
              }
            </select>
            @if (serviceOrderForm.get('maintenanceNature')?.invalid && serviceOrderForm.get('maintenanceNature')?.touched) {
              <p class="text-xs text-red-500 mt-1">A natureza é obrigatória.</p>
            }
          </div>
        </div>

        <!-- Impacto e Prioridade -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="impact" class="block text-sm font-medium text-gray-700 mb-1">Impacto (Urgência)</label>
            <select formControlName="impact" id="impact"
              class="w-full p-3 border border-gray-300 rounded-lg capitalize focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
              <option value="" disabled>Selecione o Impacto</option>
              @for (impact of impacts; track impact) {
                <option [value]="impact">{{ impact.replace('_', ' ') }}</option>
              }
            </select>
            @if (serviceOrderForm.get('impact')?.invalid && serviceOrderForm.get('impact')?.touched) {
              <p class="text-xs text-red-500 mt-1">O impacto é obrigatório.</p>
            }
          </div>
          <div>
            <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
            <select formControlName="priority" id="priority"
              class="w-full p-3 border border-gray-300 rounded-lg capitalize focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
              <option value="" disabled>Selecione a Prioridade</option>
              @for (priority of priorities; track priority) {
                <option [value]="priority">{{ priority }}</option>
              }
            </select>
            @if (serviceOrderForm.get('priority')?.invalid && serviceOrderForm.get('priority')?.touched) {
              <p class="text-xs text-red-500 mt-1">A prioridade é obrigatória.</p>
            }
          </div>
        </div>

        <!-- Descrição -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descrição do Serviço/Problema</label>
          <textarea formControlName="description" id="description" rows="3" maxlength="500"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="Descreva detalhadamente o problema ou a manutenção a ser realizada."></textarea>
          @if (serviceOrderForm.get('description')?.invalid && serviceOrderForm.get('description')?.touched) {
            <p class="text-xs text-red-500 mt-1">A descrição é obrigatória e deve ter no máximo 500 caracteres.</p>
          }
        </div>

        <!-- Data do Serviço (Opcional) -->
        <div>
          <label for="serviceDate" class="block text-sm font-medium text-gray-700 mb-1">Data Agendada (Opcional)</label>
          <input type="date" formControlName="serviceDate" id="serviceDate"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
        </div>

        <!-- Botão de Submissão -->
        <button type="submit" [disabled]="serviceOrderForm.invalid || isLoading()"
          class="w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-300 shadow-md 
                 disabled:opacity-50 disabled:cursor-not-allowed"
          [ngClass]="{'bg-indigo-600 hover:bg-indigo-700': serviceOrderForm.valid && !isLoading(), 'bg-gray-400': serviceOrderForm.invalid || isLoading()}">
          @if (isLoading()) {
            <span class="animate-spin inline-block mr-2">⚙️</span>
            Enviando...
          } @else {
            Criar Ordem de Serviço
          }
        </button>

        <!-- Mensagem de Confirmação -->
        @if (successMessage()) {
          <div class="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg" role="alert">
            {{ successMessage() }}
          </div>
        }
        
        <!-- Mensagem de Erro -->
        @if (errorMessage()) {
          <div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
            {{ errorMessage() }}
          </div>
        }
        
      </form>
    </div>
  `,
  styles: [`
    /* Aplica estilos de fonte global simples e garante que o formulário seja legível */
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
      background-color: #f7f7f9;
      min-height: 100vh;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewServiceOrdersComponent implements OnInit {
  // Injeção de dependências (FormBuilder)
  private fb = inject(FormBuilder);

  // Propriedades do Signal
  vehicles = signal<Vehicle[]>(MOCK_VEHICLES);
  isLoading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  // Arrays de Enums para o template
  public vehicleTypes = VEHICLE_TYPES;
  public categories = CATEGORIES;
  public maintenanceNatures = MAINTENANCE_NATURES; // Corrigido: era MAINTENANCE_NAURES
  public impacts = IMPACTS;
  public priorities = PRIORITIES;
  public statuses = STATUSES;

  // O FormGroup que gerencia os dados do formulário
  serviceOrderForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  // Inicializa o formulário reativo com os validadores e valores padrão
  initializeForm(): void {
    this.serviceOrderForm = this.fb.group({
      vehicleId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      type: ['', Validators.required],
      category: ['', Validators.required],
      maintenanceNature: ['', Validators.required],
      impact: ['', Validators.required],
      priority: [Priority.Medium, Validators.required], // Define Medium como padrão
      serviceDate: [null], // Campo opcional
      // status não é incluído, pois a API o define como 'open' (readOnly=true)
    });
  }

  // Lógica de submissão do formulário
  onSubmit(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (this.serviceOrderForm.invalid) {
      this.serviceOrderForm.markAllAsTouched();
      this.errorMessage.set('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.isLoading.set(true);

    // Mapeamento dos dados do formulário para o DTO tipado
    const formValue = this.serviceOrderForm.value;
    const requestPayload: CreateServiceOrdersRequest = {
      vehicleId: formValue.vehicleId,
      userId: MOCK_USER_ID, // Usando o ID mockado, que seria fornecido pelo contexto de autenticação
      description: formValue.description,
      type: formValue.type,
      category: formValue.category,
      maintenanceNature: formValue.maintenanceNature,
      impact: formValue.impact,
      priority: formValue.priority,
      // Converte a data de string (input[type=date]) para Date (se existir)
      serviceDate: formValue.serviceDate ? new Date(formValue.serviceDate) : null,
      // O Status é ignorado aqui e definido pela API como 'open'
    };

    console.log('Payload de criação da Ordem de Serviço:', requestPayload);

    // Simulação da chamada API
    // Em um cenário real, você injetaria ServiceOrdersService e faria a chamada:
    // this.serviceOrderService.createServiceOrder(requestPayload).subscribe(...)
    
    setTimeout(() => {
      this.isLoading.set(false);
      
      // Simula sucesso ou falha aleatória (apenas para demonstração)
      if (Math.random() > 0.1) {
        this.successMessage.set(`Ordem de Serviço criada com sucesso para o veículo ${formValue.vehicleId}!`);
        this.serviceOrderForm.reset({
          priority: Priority.Medium,
          // Garante que o usuário tem que selecionar os valores do dropdown novamente
          vehicleId: '', type: '', category: '', maintenanceNature: '', impact: ''
        });
      } else {
        this.errorMessage.set('Erro ao criar a Ordem de Serviço. Tente novamente.');
      }
    }, 1500);
  }
}