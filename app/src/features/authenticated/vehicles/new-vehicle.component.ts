import { 
  ChangeDetectionStrategy, 
  Component, 
  inject, 
  OnInit, 
  computed, 
  signal 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; 

// Importações dos componentes de layout (NOVOS)
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormFooterComponent } from '../../../shared/components/form-footer/form-footer.component';

// Importa o NOVO SERVIÇO de feedback
import { ToastService } from '../../../shared/services/toast.service'; 
import { ToastComponent } from "../../../shared/components/toast/toast.component";

// Importações necessárias da API e modelos
import { 
  CreateVehicleRequest, 
  VehicleStatusEnum, 
  VEHICLE_SCHEMA_DETAILS, 
  VehiclesApi,
  UpdateVehicleRequest,
  Vehicle, 
  CreateVehicleOperationRequest,
  ErrorResponse
} from '../../../generated-api';

// Interface para um objeto de erro comum retornado por uma API REST
interface ApiError {
  status?: number;
  message?: string;
  // Propriedades adicionais podem ser mapeadas aqui
  error?: { // Adicionado para cobrir erros aninhados, comum em libs de API
    message?: string;
    status?: number;
  };
}

// Ícone para o cabeçalho
const VEHICLE_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17l-5 4V3l5 4h9a2 2 0 012 2v6a2 2 0 01-2 2h-9zM10 17v-4"/></svg>';


// ** Definição do Componente **
@Component({
  selector: 'app-new-vehicles',
  // ATUALIZAÇÃO DOS IMPORTS
  imports: [CommonModule, FormsModule, PageHeaderComponent, FormFooterComponent, ToastComponent], 
  template: `
      <div class="mx-auto bg-white shadow-xl p-4 md:p-10">
        
        <!-- NOVO: Uso do PageHeaderComponent -->
        <app-page-header
          [title]="pageTitle()"
          listLabel="Lista de Veículos"
          [iconSvg]="vehicleIcon"
          (goToList)="goToVehiclesList()" 
        />
        <!-- FIM: app-page-header -->

        @if (isLoading()) {
            <div class="text-center py-10 text-indigo-600 font-semibold">
              @if (isEditMode()) {
                Carregando dados do veículo...
              } @else {
                Carregando...
              }
            </div>
        } 
        
        @if (!isLoading() || (isEditMode() && vehicleForm.licensePlate)) {
            <form (ngSubmit)="saveVehicle(vehicleFormRef)" #vehicleFormRef="ngForm" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Informações Gerais</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div class="form-group">
                    <label 
                      for="licensePlate" 
                      class="form-label"
                      title="{{ vehicleDoc.licensePlate.description }}"
                    >
                      {{ vehicleDoc.licensePlate['x-ui-label'] }} * </label>
                    <input 
                      id="licensePlate" 
                      name="licensePlate" 
                      type="text" 
                      [(ngModel)]="vehicleForm.licensePlate" 
                      required 
                      placeholder="Ex: {{ vehicleDoc.licensePlate.example }}"
                      [minlength]="vehicleDoc.licensePlate['minLength']" 
                      [maxlength]="vehicleDoc.licensePlate['maxLength']" 
                      [attr.pattern]="vehicleDoc.licensePlate['pattern']"
                      class="form-input tracking-widest uppercase"
                      #licensePlateRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (licensePlateRef.invalid && submitted) { 
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (licensePlateRef.errors?.['required']) {
                          <div>O campo **Placa do Veículo** é obrigatório.</div>
                        }
                        @if (licensePlateRef.errors?.['minlength']) {
                          <div>
                            O campo deve conter no mínimo 
                            **{{ vehicleDoc.licensePlate['minLength'] }}** caracteres. 
                            (Atual: **{{ licensePlateRef.errors?.['minlength']?.actualLength }}**)
                          </div>
                        }
                        @if (licensePlateRef.errors?.['maxlength']) {
                          <div>
                            O campo deve conter no máximo 
                            **{{ vehicleDoc.licensePlate['maxLength'] }}** caracteres.
                            (Atual: **{{ licensePlateRef.errors?.['maxlength']?.actualLength }}**)
                          </div>
                        }
                        @if (licensePlateRef.errors?.['pattern']) {
                          <div>A placa deve estar no formato Mercosul (LLLNLNN).</div>
                        }
                      </div>
                    }
                    </div>

                  <div class="form-group">
                    <label 
                      for="vehicleManufacturer" 
                      class="form-label"
                      title="{{ vehicleDoc.vehicleManufacturer.description }}"
                    >
                      {{ vehicleDoc.vehicleManufacturer['x-ui-label'] }} * </label>
                    <input 
                      id="vehicleManufacturer" 
                      name="vehicleManufacturer" 
                      type="text" 
                      [(ngModel)]="vehicleForm.vehicleManufacturer" 
                      required 
                      placeholder="Ex: {{ vehicleDoc.vehicleManufacturer.example }}"
                      [minlength]="vehicleDoc.vehicleManufacturer['minLength']"
                      [maxlength]="vehicleDoc.vehicleManufacturer['maxLength']"
                      class="form-input"
                      #vehicleManufacturerRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (vehicleManufacturerRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (vehicleManufacturerRef.errors?.['required']) {
                          <div>O campo **Fabricante** é obrigatório.</div>
                        }
                        @if (vehicleManufacturerRef.errors?.['minlength']) {
                          <div>
                            O campo deve conter no mínimo **{{ vehicleDoc.vehicleManufacturer['minLength'] }}** caracteres.
                            (Atual: **{{ vehicleManufacturerRef.errors?.['minlength']?.actualLength }}**)
                          </div>
                        }
                        @if (vehicleManufacturerRef.errors?.['maxlength']) {
                          <div>
                            O campo deve conter no máximo **{{ vehicleDoc.vehicleManufacturer['maxLength'] }}** caracteres.
                            (Atual: **{{ vehicleManufacturerRef.errors?.['maxlength']?.actualLength }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>
                  
                  <div class="form-group">
                    <label 
                      for="model" 
                      class="form-label"
                      title="{{ vehicleDoc.model.description }}"
                    >
                      {{ vehicleDoc.model['x-ui-label'] }} * </label>
                    <input 
                      id="model" 
                      name="model" 
                      type="text" 
                      [(ngModel)]="vehicleForm.model" 
                      required 
                      placeholder="Ex: {{ vehicleDoc.model.example }}"
                      [minlength]="vehicleDoc.model['minLength']"
                      [maxlength]="vehicleDoc.model['maxLength']"
                      class="form-input"
                      #modelRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (modelRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (modelRef.errors?.['required']) {
                          <div>O campo **Modelo** é obrigatório.</div>
                        }
                        @if (modelRef.errors?.['minlength']) {
                          <div>
                            O campo deve conter no mínimo **{{ vehicleDoc.model['minLength'] }}** caracteres.
                            (Atual: **{{ modelRef.errors?.['minlength']?.actualLength }}**)
                          </div>
                        }
                        @if (modelRef.errors?.['maxlength']) {
                          <div>
                            O campo deve conter no máximo **{{ vehicleDoc.model['maxLength'] }}** caracteres.
                            (Atual: **{{ modelRef.errors?.['maxlength']?.actualLength }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>
                  
                  <div class="form-group">
                    <label for="status" class="form-label">
                      {{ vehicleDoc.status['x-ui-label'] }} * </label>
                    <select 
                      id="status" 
                      name="status" 
                      [(ngModel)]="vehicleForm.status" 
                      required
                      class="form-input"
                      #statusRef="ngModel"
                      [disabled]="isLoading()"
                    >
                      <option [ngValue]="VehicleStatusEnum.Available">Disponível</option>
                      <option [ngValue]="VehicleStatusEnum.Maintenance">Manutenção</option>
                      <option [ngValue]="VehicleStatusEnum.Retired">Aposentado</option>
                    </select>
                    @if (statusRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (statusRef.errors?.['required']) {
                          <div>O campo **Status** é obrigatório.</div>
                        }
                      </div>
                    }
                    </div>

                  <div class="form-group">
                    <label 
                      for="modelYear" 
                      class="form-label"
                      title="{{ vehicleDoc.modelYear.description }}"
                    >
                      {{ vehicleDoc.modelYear['x-ui-label'] }} * </label>
                    <input 
                      id="modelYear" 
                      name="modelYear" 
                      type="number" 
                      [(ngModel)]="vehicleForm.modelYear" 
                      required 
                      placeholder="Ex: {{ vehicleDoc.modelYear.example }}"
                      [min]="vehicleDoc.modelYear['minimum']"
                      [max]="vehicleDoc.modelYear['maximum']"
                      class="form-input"
                      #modelYearRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (modelYearRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (modelYearRef.errors?.['required']) {
                          <div>O campo **Ano do Modelo** é obrigatório.</div>
                        }
                        @if (modelYearRef.errors?.['min']) {
                          <div>
                            O ano não pode ser menor que **{{ vehicleDoc.modelYear['minimum'] }}**.
                            (Atual: **{{ modelYearRef.errors?.['min']?.actual }}**)
                          </div>
                        }
                        @if (modelYearRef.errors?.['max']) {
                          <div>
                            O ano não pode ser maior que **{{ vehicleDoc.modelYear['maximum'] }}**.
                            (Atual: **{{ modelYearRef.errors?.['max']?.actual }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>

                  <div class="form-group">
                    <label 
                      for="manufacturerYear" 
                      class="form-label"
                      title="{{ vehicleDoc.manufacturerYear.description }}"
                    >
                      {{ vehicleDoc.manufacturerYear['x-ui-label'] }} * </label>
                    <input 
                      id="manufacturerYear" 
                      name="manufacturerYear" 
                      type="number" 
                      [(ngModel)]="vehicleForm.manufacturerYear" 
                      required 
                      placeholder="Ex: {{ vehicleDoc.manufacturerYear.example }}"
                      [min]="vehicleDoc.manufacturerYear['minimum']"
                      [max]="vehicleDoc.manufacturerYear['maximum']"
                      class="form-input"
                      #manufacturerYearRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (manufacturerYearRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (manufacturerYearRef.errors?.['required']) {
                          <div>O campo **Ano de Fabricação** é obrigatório.</div>
                        }
                        @if (manufacturerYearRef.errors?.['min']) {
                          <div>
                            O ano não pode ser menor que **{{ vehicleDoc.manufacturerYear['minimum'] }}**.
                            (Atual: **{{ manufacturerYearRef.errors?.['min']?.actual }}**)
                          </div>
                        }
                        @if (manufacturerYearRef.errors?.['max']) {
                          <div>
                            O ano não pode ser maior que **{{ vehicleDoc.manufacturerYear['maximum'] }}**.
                            (Atual: **{{ manufacturerYearRef.errors?.['max']?.actual }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>
                </div>
                
                <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mt-8 mb-4">Detalhes Operacionais e Capacidade</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <div class="form-group">
                    <label 
                      for="passengerNumber" 
                      class="form-label"
                      title="{{ vehicleDoc.passengerNumber.description }}"
                    >
                      {{ vehicleDoc.passengerNumber['x-ui-label'] }} * </label>
                    <input 
                      id="passengerNumber" 
                      name="passengerNumber" 
                      type="number" 
                      [(ngModel)]="vehicleForm.passengerNumber" 
                      required 
                      placeholder="Ex: {{ vehicleDoc.passengerNumber.example }}"
                      [min]="vehicleDoc.passengerNumber['minimum']"
                      [max]="vehicleDoc.passengerNumber['maximum']"
                      class="form-input"
                      #passengerNumberRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (passengerNumberRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (passengerNumberRef.errors?.['required']) {
                          <div>O campo **Número de Passageiros** é obrigatório.</div>
                        }
                        @if (passengerNumberRef.errors?.['min']) {
                          <div>
                            O valor não deve ser menor que **{{ vehicleDoc.passengerNumber['minimum'] }}**.
                            (Atual: **{{ passengerNumberRef.errors?.['min']?.actual }}**)
                          </div>
                        }
                        @if (passengerNumberRef.errors?.['max']) {
                          <div>
                            O valor não deve ser maior que **{{ vehicleDoc.passengerNumber['maximum'] }}**.
                            (Atual: **{{ passengerNumberRef.errors?.['max']?.actual }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>
                  
                  <div class="form-group">
                    <label 
                      for="fuelTankCapacity" 
                      class="form-label"
                      title="{{ vehicleDoc.fuelTankCapacity.description }}"
                    >
                      {{ vehicleDoc.fuelTankCapacity['x-ui-label'] }} </label>
                    <input 
                      id="fuelTankCapacity" 
                      name="fuelTankCapacity" 
                      type="number" 
                      [(ngModel)]="vehicleForm.fuelTankCapacity" 
                      placeholder="Ex: {{ vehicleDoc.fuelTankCapacity.example }}"
                      [min]="vehicleDoc.fuelTankCapacity['minimum']"
                      [max]="vehicleDoc.fuelTankCapacity['maximum']"
                      step="0.1"
                      class="form-input"
                      #fuelTankCapacityRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (fuelTankCapacityRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (fuelTankCapacityRef.errors?.['min']) {
                          <div>
                            O valor não deve ser menor que **{{ vehicleDoc.fuelTankCapacity['minimum'] }}** litros.
                            (Atual: **{{ fuelTankCapacityRef.errors?.['min']?.actual }}**)
                          </div>
                        }
                        @if (fuelTankCapacityRef.errors?.['max']) {
                          <div>
                            O valor não deve ser maior que **{{ vehicleDoc.fuelTankCapacity['maximum'] }}** litros.
                            (Atual: **{{ fuelTankCapacityRef.errors?.['max']?.actual }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>

                  <div class="form-group">
                    <label 
                      for="averageConsumption" 
                      class="form-label"
                      title="{{ vehicleDoc.averageConsumption.description }}"
                    >
                      {{ vehicleDoc.averageConsumption['x-ui-label'] }} </label>
                    <input 
                      id="averageConsumption" 
                      name="averageConsumption" 
                      type="number" 
                      [(ngModel)]="vehicleForm.averageConsumption" 
                      placeholder="Ex: {{ vehicleDoc.averageConsumption.example }}"
                      [min]="vehicleDoc.averageConsumption['minimum']"
                      [max]="vehicleDoc.averageConsumption['maximum']"
                      step="0.1"
                      class="form-input"
                      #averageConsumptionRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (averageConsumptionRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (averageConsumptionRef.errors?.['min']) {
                          <div>
                            O valor não deve ser menor que **{{ vehicleDoc.averageConsumption['minimum'] }}** km/l.
                            (Atual: **{{ averageConsumptionRef.errors?.['min']?.actual }}**)
                          </div>
                        }
                        @if (averageConsumptionRef.errors?.['max']) {
                          <div>
                            O valor não deve ser maior que **{{ vehicleDoc.averageConsumption['maximum'] }}** km/l.
                            (Atual: **{{ averageConsumptionRef.errors?.['max']?.actual }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>

                  <div class="form-group">
                    <label 
                      for="entryMileage" 
                      class="form-label"
                      title="{{ vehicleDoc.entryMileage.description }}"
                    >
                      {{ vehicleDoc.entryMileage['x-ui-label'] }} </label>
                    <input 
                      id="entryMileage" 
                      name="entryMileage" 
                      type="number" 
                      [(ngModel)]="vehicleForm.entryMileage" 
                      placeholder="Ex: {{ vehicleDoc.entryMileage.example }}"
                      [min]="vehicleDoc.entryMileage['minimum']"
                      [max]="vehicleDoc.entryMileage['maximum']"
                      class="form-input"
                      #entryMileageRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (entryMileageRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (entryMileageRef.errors?.['min']) {
                          <div>
                            O valor não deve ser menor que **{{ vehicleDoc.entryMileage['minimum'] }}** km.
                            (Atual: **{{ entryMileageRef.errors?.['min']?.actual }}**)
                          </div>
                        }
                        @if (entryMileageRef.errors?.['max']) {
                          <div>
                            O valor não deve ser maior que **{{ vehicleDoc.entryMileage['maximum'] }}** km.
                            (Atual: **{{ entryMileageRef.errors?.['max']?.actual }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>

                  <div class="form-group col-span-1">
                    <div class="invisible h-5 md:h-6">Placeholder</div> 
                    
                    <div class="flex items-center mt-1 pt-2">
                      <input 
                        id="hasBathroom" 
                        name="hasBathroom" 
                        type="checkbox" 
                        [(ngModel)]="vehicleForm.hasBathroom"
                        class="form-checkbox"
                        #hasBathroomRef="ngModel"
                        [disabled]="isLoading()"
                      >
                      <label 
                        for="hasBathroom" 
                        class="form-label ml-2 cursor-pointer text-gray-700 flex items-center"
                        title="{{ vehicleDoc.hasBathroom.description }}"
                      >

                        {{ vehicleDoc.hasBathroom['x-ui-label'] }} ? 
                        <span class="ml-2 font-bold" [ngClass]="{'text-green-600': vehicleForm.hasBathroom, 'text-red-600': !vehicleForm.hasBathroom}">
                          {{ vehicleForm.hasBathroom ? "Sim" : "Não"}}
                        </span>
                      </label>
                      @if (hasBathroomRef.invalid && submitted) {
                        <div class="text-red-500 text-xs ml-4 space-y-1">
                          @if (hasBathroomRef.errors?.['required']) {
                            <div>O campo **Possui Banheiro** é obrigatório (deve ser marcado ou desmarcado).</div>
                          }
                        </div>
                      }
                    </div>
                  </div>

                </div>

                <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mt-8 mb-4">Documentação e Identificação</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div class="form-group">
                    <label 
                      for="chassisNumber" 
                      class="form-label"
                      title="{{ vehicleDoc.chassisNumber.description }}"
                    >
                      {{ vehicleDoc.chassisNumber['x-ui-label'] }} * </label>
                    <input 
                      id="chassisNumber" 
                      name="chassisNumber" 
                      type="text" 
                      [(ngModel)]="vehicleForm.chassisNumber" 
                      required
                      placeholder="Ex: {{ vehicleDoc.chassisNumber.example }}"
                      [minlength]="vehicleDoc.chassisNumber['minLength']"
                      [maxlength]="vehicleDoc.chassisNumber['maxLength']"
                      class="form-input"
                      #chassisNumberRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (chassisNumberRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (chassisNumberRef.errors?.['required']) {
                          <div>O campo **Número do Chassi** é obrigatório.</div>
                        }
                        @if (chassisNumberRef.errors?.['minlength']) {
                          <div>
                            O campo deve conter no mínimo **{{ vehicleDoc.chassisNumber['minLength'] }}** caracteres.
                            (Atual: **{{ chassisNumberRef.errors?.['minlength']?.actualLength }}**)
                          </div>
                        }
                        @if (chassisNumberRef.errors?.['maxlength']) {
                          <div>
                            O campo deve conter no máximo **{{ vehicleDoc.chassisNumber['maxLength'] }}** caracteres.
                            (Atual: **{{ chassisNumberRef.errors?.['maxlength']?.actualLength }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>
                  
                  <div class="form-group">
                    <label 
                      for="fleetNumber" 
                      class="form-label"
                      title="{{ vehicleDoc.fleetNumber.description }}"
                    >
                      {{ vehicleDoc.fleetNumber['x-ui-label'] }} </label>
                    <input 
                      id="fleetNumber" 
                      name="fleetNumber" 
                      type="number" 
                      [(ngModel)]="vehicleForm.fleetNumber" 
                      placeholder="Ex: {{ vehicleDoc.fleetNumber.example }}"
                      [min]="vehicleDoc.fleetNumber['minimum']"
                      [max]="vehicleDoc.fleetNumber['maximum']"
                      class="form-input"
                      #fleetNumberRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (fleetNumberRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (fleetNumberRef.errors?.['min']) {
                          <div>
                            O valor não deve ser menor que **{{ vehicleDoc.fleetNumber['minimum'] }}**.
                            (Atual: **{{ fleetNumberRef.errors?.['min']?.actual }}**)
                          </div>
                        }
                        @if (fleetNumberRef.errors?.['max']) {
                          <div>
                            O valor não deve ser maior que **{{ vehicleDoc.fleetNumber['maximum'] }}**.
                            (Atual: **{{ fleetNumberRef.errors?.['max']?.actual }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>
                  
                  <div class="form-group">
                    <label 
                      for="renavan" 
                      class="form-label"
                      title="{{ vehicleDoc.renavan.description }}"
                    >
                      {{ vehicleDoc.renavan['x-ui-label'] }} </label>
                    <input 
                      id="renavan" 
                      name="renavan" 
                      type="text" 
                      [(ngModel)]="vehicleForm.renavan" 
                      placeholder="Ex: {{ vehicleDoc.renavan.example }}"
                      [minlength]="vehicleDoc.renavan['minLength']"
                      [maxlength]="vehicleDoc.renavan['maxLength']"
                      class="form-input"
                      #renavanRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (renavanRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (renavanRef.errors?.['minlength']) {
                          <div>
                            O campo deve conter no mínimo **{{ vehicleDoc.renavan['minLength'] }}** caracteres.
                            (Atual: **{{ renavanRef.errors?.['minlength']?.actualLength }}**)
                          </div>
                        }
                        @if (renavanRef.errors?.['maxlength']) {
                          <div>
                            O campo deve conter no máximo **{{ vehicleDoc.renavan['maxLength'] }}** caracteres.
                            (Atual: **{{ renavanRef.errors?.['maxlength']?.actualLength }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>

                  <div class="form-group">
                    <label 
                      for="motorNumber" 
                      class="form-label"
                      title="{{ vehicleDoc.motorNumber.description }}"
                    >
                      {{ vehicleDoc.motorNumber['x-ui-label'] }} </label>
                    <input 
                      id="motorNumber" 
                      name="motorNumber" 
                      type="text" 
                      [(ngModel)]="vehicleForm.motorNumber" 
                      placeholder="Ex: {{ vehicleDoc.motorNumber.example }}"
                      [minlength]="vehicleDoc.motorNumber['minLength']"
                      [maxlength]="vehicleDoc.motorNumber['maxLength']"
                      class="form-input"
                      #motorNumberRef="ngModel"
                      [disabled]="isLoading()"
                    >
                    @if (motorNumberRef.invalid && submitted) {
                      <div class="text-red-500 text-xs mt-1 space-y-1">
                        @if (motorNumberRef.errors?.['minlength']) {
                          <div>
                            O campo deve conter no mínimo **{{ vehicleDoc.motorNumber['minLength'] }}** caracteres.
                            (Atual: **{{ motorNumberRef.errors?.['minlength']?.actualLength }}**)
                          </div>
                        }
                        @if (motorNumberRef.errors?.['maxlength']) {
                          <div>
                            O campo deve conter no máximo **{{ vehicleDoc.motorNumber['maxLength'] }}** caracteres.
                            (Atual: **{{ motorNumberRef.errors?.['maxlength']?.actualLength }}**)
                          </div>
                        }
                      </div>
                    }
                    </div>

                </div>

                <div class="mt-8 border rounded-lg overflow-hidden">
                  <button 
                    type="button" 
                    (click)="isAdvancedOpen = !isAdvancedOpen" 
                    class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 transition duration-150 flex justify-between items-center text-indigo-700 font-semibold"
                    [disabled]="isLoading()"
                  >
                    Configurações Avançadas (Detalhes de Carroceria/Motor)
                    @if (!isAdvancedOpen) {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                    }
                  </button>

                  @if (isAdvancedOpen) {
                    <div class="p-4 bg-white border-t">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div class="form-group">
                          <label 
                            for="bodyManufacturer" 
                            class="form-label"
                            title="{{ vehicleDoc.bodyManufacturer.description }}"
                          >
                            {{ vehicleDoc.bodyManufacturer['x-ui-label'] }} </label>
                          <input 
                            id="bodyManufacturer" 
                            name="bodyManufacturer" 
                            type="text" 
                            [(ngModel)]="vehicleForm.bodyManufacturer" 
                            placeholder="Ex: {{ vehicleDoc.bodyManufacturer.example }}"
                            [minlength]="vehicleDoc.bodyManufacturer['minLength']"
                            [maxlength]="vehicleDoc.bodyManufacturer['maxLength']"
                            class="form-input"
                            #bodyManufacturerRef="ngModel"
                            [disabled]="isLoading()"
                          >
                          @if (bodyManufacturerRef.invalid && submitted) {
                            <div class="text-red-500 text-xs mt-1 space-y-1">
                              @if (bodyManufacturerRef.errors?.['minlength']) {
                                <div>
                                  O campo deve conter no mínimo **{{ vehicleDoc.bodyManufacturer['minLength'] }}** caracteres.
                                  (Atual: **{{ bodyManufacturerRef.errors?.['minlength']?.actualLength }}**)
                                </div>
                              }
                              @if (bodyManufacturerRef.errors?.['maxlength']) {
                                <div>
                                  O campo deve conter no máximo **{{ vehicleDoc.bodyManufacturer['maxLength'] }}** caracteres.
                                  (Atual: **{{ bodyManufacturerRef.errors?.['maxlength']?.actualLength }}**)
                                </div>
                              }
                            </div>
                          }
                          </div>
                        
                        <div class="form-group">
                          <label 
                            for="bodyModel" 
                            class="form-label"
                            title="{{ vehicleDoc.bodyModel.description }}"
                          >
                            {{ vehicleDoc.bodyModel['x-ui-label'] }} </label>
                          <input 
                            id="bodyModel" 
                            name="bodyModel" 
                            type="text" 
                            [(ngModel)]="vehicleForm.bodyModel" 
                            placeholder="Ex: {{ vehicleDoc.bodyModel.example }}"
                            [minlength]="vehicleDoc.bodyModel['minLength']"
                            [maxlength]="vehicleDoc.bodyModel['maxLength']"
                            class="form-input"
                            #bodyModelRef="ngModel"
                            [disabled]="isLoading()"
                          >
                          @if (bodyModelRef.invalid && submitted) {
                            <div class="text-red-500 text-xs mt-1 space-y-1">
                              @if (bodyModelRef.errors?.['minlength']) {
                                <div>
                                  O campo deve conter no mínimo **{{ vehicleDoc.bodyModel['minLength'] }}** caracteres.
                                  (Atual: **{{ bodyModelRef.errors?.['minlength']?.actualLength }}**)
                                </div>
                              }
                              @if (bodyModelRef.errors?.['maxlength']) {
                                <div>
                                  O campo deve conter no máximo **{{ vehicleDoc.bodyModel['maxLength'] }}** caracteres.
                                  (Atual: **{{ bodyModelRef.errors?.['maxlength']?.actualLength }}**)
                                </div>
                              }
                            </div>
                          }
                          </div>

                        <div class="form-group">
                          <label 
                            for="axesNumber" 
                            class="form-label"
                            title="{{ vehicleDoc.axesNumber.description }}"
                          >
                            {{ vehicleDoc.axesNumber['x-ui-label'] }} </label>
                          <input 
                            id="axesNumber" 
                            name="axesNumber" 
                            type="number" 
                            [(ngModel)]="vehicleForm.axesNumber" 
                            placeholder="Ex: {{ vehicleDoc.axesNumber.example }}"
                            [min]="vehicleDoc.axesNumber['minimum']"
                            [max]="vehicleDoc.axesNumber['maximum']"
                            class="form-input"
                            #axesNumberRef="ngModel"
                            [disabled]="isLoading()"
                          >
                          @if (axesNumberRef.invalid && submitted) {
                            <div class="text-red-500 text-xs mt-1 space-y-1">
                              @if (axesNumberRef.errors?.['min']) {
                                <div>
                                  O valor não deve ser menor que **{{ vehicleDoc.axesNumber['minimum'] }}**.
                                  (Atual: **{{ axesNumberRef.errors?.['min']?.actual }}**)
                                </div>
                              }
                              @if (axesNumberRef.errors?.['max']) {
                                <div>
                                  O valor não deve ser maior que **{{ vehicleDoc.axesNumber['maximum'] }}**.
                                  (Atual: **{{ axesNumberRef.errors?.['max']?.actual }}**)
                                </div>
                              }
                            </div>
                          }
                          </div>
                        
                        <div class="form-group md:col-span-2">
                          <label 
                            for="engineDescription" 
                            class="form-label"
                            title="{{ vehicleDoc.engineDescription.description }}"
                          >
                            {{ vehicleDoc.engineDescription['x-ui-label'] }} </label>
                          <input 
                            id="engineDescription" 
                            name="engineDescription" 
                            type="text" 
                            [(ngModel)]="vehicleForm.engineDescription" 
                            placeholder="Ex: {{ vehicleDoc.engineDescription.example }}"
                            [minlength]="vehicleDoc.engineDescription['minLength']"
                            [maxlength]="vehicleDoc.engineDescription['maxLength']"
                            class="form-input"
                            #engineDescriptionRef="ngModel"
                            [disabled]="isLoading()"
                          >
                          @if (engineDescriptionRef.invalid && submitted) {
                            <div class="text-red-500 text-xs mt-1 space-y-1">
                              @if (engineDescriptionRef.errors?.['minlength']) {
                                <div>
                                  O campo deve conter no mínimo **{{ vehicleDoc.engineDescription['minLength'] }}** caracteres.
                                  (Atual: **{{ engineDescriptionRef.errors?.['minlength']?.actualLength }}**)
                                </div>
                              }
                              @if (engineDescriptionRef.errors?.['maxlength']) {
                                <div>
                                  O campo deve conter no máximo **{{ vehicleDoc.engineDescription['maxLength'] }}** caracteres.
                                  (Atual: **{{ engineDescriptionRef.errors?.['maxlength']?.actualLength }}**)
                                </div>
                              }
                            </div>
                          }
                          </div>

                      </div>
                    </div>
                  }
                </div>
                
                <!-- NOVO: Uso do FormFooterComponent -->
                <app-form-footer
                  class="flex justify-end pt-6 border-t mt-8"
                  cancelLabel="Cancelar"
                  [submitLabel]="isEditMode() ? 'Salvar Alterações' : 'Salvar Veículo'"
                  [isSubmitting]="isLoading()"
                  (cancel)="goToVehiclesList()" 
                />
                <!-- FIM: app-form-footer -->
            </form>
        }

      </div>
      <!-- NOVO: Container para exibir os toasts -->
      <app-toast-container />
      <!-- FIM: app-toast-container -->
  `,
  styles: [`
    /* Estilos base do Tailwind são assumidos, adicionando classes customizadas para o formulário */
    .form-group {
      @apply flex flex-col space-y-1;
    }
    .form-label {
      @apply text-sm font-medium text-gray-700;
    }
    .form-input {
      /* Estilos normais de input */
      @apply mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150;
    }
    
    /* FEEDBACK VISUAL PARA CAMPOS INVÁLIDOS */
    .form-input.ng-invalid.ng-submitted,
    .form-input.ng-invalid.ng-dirty { 
      /* Não foi necessário adicionar estilos específicos aqui, mas a base está correta */
    }

    .form-checkbox {
      @apply h-5 w-5 text-indigo-600 border-gray-300 rounded shadow-sm focus:ring-indigo-500;
    }
    .uppercase {
      text-transform: uppercase;
    }
    .tracking-widest {
      letter-spacing: 0.2em;
    }
    /* Estilos de botão removidos, pois são manipulados pelo FormFooterComponent */
    
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NewVehicleComponent implements OnInit { 
  
  private router = inject(Router);
  private route = inject(ActivatedRoute); 
  private vehiclesApi = inject(VehiclesApi); 
  // NOVO: Injeção do ToastService
  private toastService = inject(ToastService);

  // Variáveis de Estado (mantidas)
  submitted: boolean = false; 
  isAdvancedOpen = false;
  
  // Variáveis reativas para controle da edição/carregamento
  vehicleId: string | null = null;
  isLoading = signal(false); // Para mostrar um spinner durante o carregamento/salvamento

  // Computed para determinar o modo (Criação vs Edição). No modo replicação, o ID é nulo, então isEditMode() é false.
  isEditMode = computed(() => !!this.vehicleId);

  // Computed para o título da página
  pageTitle = computed(() => 
    this.isEditMode() 
      ? `Edição do Veículo: ${this.vehicleForm.licensePlate}`
      : 'Cadastro de Novo Veículo'
  );
  
  // Ícone
  vehicleIcon = VEHICLE_ICON_SVG;

  // Inicialização do Formulário (Valores de Criação)
  vehicleForm: CreateVehicleRequest = {
    licensePlate: '',
    model: '',
    vehicleManufacturer: '',
    modelYear: new Date().getFullYear(),
    manufacturerYear: new Date().getFullYear(),
    chassisNumber: '',
    status: VehicleStatusEnum.Available, 
    passengerNumber: 1, 
    hasBathroom: false, 
    
    // Opcionais (iniciados como undefined)
    renavan: undefined, 
    motorNumber: undefined,
    fleetNumber: undefined,
    fuelTankCapacity: undefined,
    entryMileage: undefined,
    averageConsumption: undefined,
    bodyManufacturer: undefined,
    bodyModel: undefined,
    axesNumber: undefined,
    engineDescription: undefined,
  };

  vehicleDoc = VEHICLE_SCHEMA_DETAILS.vehicleCommonProperties; 
  VehicleStatusEnum = VehicleStatusEnum;

  // Variável para armazenar o ID original (apenas no modo replicação)
  private originalVehicleIdForReplication: string | null = null;
  
  ngOnInit(): void {
    // 1. Obter parâmetros da rota
    const id = this.route.snapshot.paramMap.get('id');
    const replicate = this.route.snapshot.paramMap.get('replicate');

    if (id) {
        if (replicate === 'true') {
            // 🔄 MODO CRIAÇÃO POR REPLICAÇÃO: Carregar dados, mas forçar modo criação
            console.log('Modo Criação por Replicação ativado para ID:', id);
            this.originalVehicleIdForReplication = id; // Guarda o ID original
            this.vehicleId = null; // Garante que o modo seja de Criação
            this.loadVehicleData(id, true); // Carrega e limpa campos únicos
        } else {
            // ✏️ MODO EDIÇÃO/UPDATE: Carregar dados e manter o ID
            console.log('Modo Edição ativado para ID:', id);
            this.vehicleId = id; // Mantém o ID
            this.loadVehicleData(id, false);
        }
    } else {
      // ➕ MODO CRIAÇÃO PADRÃO
      console.log('Modo Criação Padrão ativado.');
      this.vehicleId = null;
      // Permanece com os valores padrão de this.vehicleForm
    }
  }

  /**
   * Carrega os dados do veículo para o formulário.
   * @param id O ID do veículo a ser carregado.
   * @param isReplication Se true, limpa campos únicos após o carregamento.
   */
  async loadVehicleData(id: string, isReplication: boolean): Promise<void> {
    this.isLoading.set(true);
    try {
      // Chamada para a API
      const vehicle = await this.vehiclesApi.getVehicleById({ id });
      
      // Preenche o formulário com os dados do veículo.
      this.vehicleForm = { 
          ...vehicle 
      } as CreateVehicleRequest;

      if (isReplication) {
        // ** LOGICA DE LIMPEZA PARA REPLICAÇÃO **
        this.vehicleForm.licensePlate = ''; // Placa
        this.vehicleForm.chassisNumber = ''; // Chassi
        this.vehicleForm.renavan = undefined; // Renavan
        this.vehicleForm.fleetNumber = undefined; // Número da Frota
        this.vehicleForm.motorNumber = undefined; // Número do Motor
        
        console.log('Dados do veículo carregados para replicação. Campos únicos limpos.');
      } else {
        console.log('Dados do veículo carregados para edição:', this.vehicleForm);
      }

    } catch (error) {
      console.error('❌ Erro ao carregar veículo:', error);
      // SUBSTITUIÇÃO: alert() por toastService.error()
      this.toastService.error('Erro ao carregar os dados do veículo. Por favor, tente novamente.', 8000);
      // Redireciona de volta para a lista se o veículo não puder ser carregado
      this.goToVehiclesList(); 
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Tenta salvar o veículo (Criação ou Edição).
   * @param form A referência NgForm do template.
   */
  saveVehicle(form: NgForm): void {
    
    this.submitted = true;
    
    // 1. Validação (Garantir que todos os campos sejam validados visualmente)
    Object.keys(form.controls).forEach(key => form.controls[key].markAsTouched());
    
    if (form.invalid) {
      // SUBSTITUIÇÃO: alert() por toastService.error()
      this.toastService.error('Preencha todos os campos obrigatórios corretamente.'); 
      return; 
    }

    this.isLoading.set(true);
    
    if (this.isEditMode()) {
      // MODO EDIÇÃO (PATCH)
      this.handleUpdate();
    } else {
      // MODO CRIAÇÃO (POST) - Inclui o modo de replicação
      this.handleCreate();
    }
  }

  /**
   * Lógica para criar um novo veículo.
   */
private handleCreate(): void {
    const createRequest: CreateVehicleOperationRequest = { 
        createVehicleRequest: this.vehicleForm 
    };

    this.vehiclesApi.createVehicle(createRequest)
      .then(newVehicle => {
        // SUBSTITUIÇÃO: alert() por toastService.success()
        this.toastService.success(`Veículo ${newVehicle.licensePlate} criado com sucesso!`);
        this.goToVehiclesList();
      })
      .catch((error) => { // 🛑 Não tipamos aqui, ou usamos 'ResponseError' se importado.
        
        // --- ALTERAÇÃO AQUI: Lidando com ResponseError para acessar o corpo da resposta ---
        
        console.error('#####################################################');
        
        if (error && error.response) {
            console.error('ERRO BRUTO DA API (FORMATO DESCOBERTO):');
            // Tenta ler o corpo JSON da resposta HTTP encapsulada.
            // O .json() retorna uma Promise, então precisamos de um 'await' ou tratar com '.then()'.
            // Como estamos num método síncrono, usaremos a Promise API:
            error.response.json()
                .then((jsonBody: any) => {
                    console.error('CORPO JSON PARSEADO DO ERRO:');
                    console.error(JSON.stringify(jsonBody, null, 2));
                    
                    // Continua com a manipulação de erro após o log
                    this.handleApiError(jsonBody, 'salvar');
                })
.catch((e: any) => { // ⬅️ CORREÇÃO AQUI: e agora tem tipo 'any'
                    // O corpo da resposta não era JSON (ou erro ao ler)
                    console.error('Falha ao ler o corpo JSON da resposta. Objeto de erro direto:', error);
                    // Continua com a manipulação de erro
                    this.handleApiError(error, 'salvar');
                });
        } else {
            // O erro não é um ResponseError (ex: erro de rede ou interno)
            console.error('ERRO NÃO-API:', error);
            this.handleApiError(error, 'salvar');
        }

        console.error('#####################################################');
        // --- FIM DA ALTERAÇÃO ---

      })
      .finally(() => {
        this.isLoading.set(false);
      });
}

  /**
   * Lógica para atualizar um veículo existente (PATCH).
   */
  private handleUpdate(): void {
    // Usamos o PATCH (updateVehicle) para enviar apenas o payload VehicleCommonProperties
    if (!this.vehicleId) return;

    const updateRequest: UpdateVehicleRequest = { 
        ...this.vehicleForm as UpdateVehicleRequest 
    };
    
    // Assumindo que o método da API é updateVehicle({ id: string, updateVehicleRequest: VehicleCommonProperties })
    this.vehiclesApi.updateVehicle({ id: this.vehicleId, updateVehicleRequest: updateRequest }) 
      .then(updatedVehicle => {
        // SUBSTITUIÇÃO: alert() por toastService.success()
        this.toastService.success(`Veículo ${updatedVehicle.licensePlate} atualizado com sucesso!`);
        this.goToVehiclesList();
      })
      .catch((error: ErrorResponse) => { 
        this.handleApiError(error, 'atualizar');
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }

  /**
   * Função genérica para tratar erros da API e dar feedback.
   */
/**
   * Função genérica para tratar erros da API e dar feedback.
   * Assume que o erro capturado é do tipo ErrorResponse ou o corpo JSON da resposta.
   */
  private handleApiError(error: any, action: 'salvar' | 'atualizar'): void {
    // Lida com a estrutura de erro real. 'error.error' é comum em clientes de API que 
    // encapsulam o corpo da resposta em um objeto de erro, mas se o corpo foi parseado 
    // e passado diretamente (como em handleCreate), ele será o próprio 'error'.
    console.error(`❌ Erro ao ${action} veículo:`, error);
    
    // Tenta obter o objeto de erro (que deve ser o corpo JSON/ErrorResponse)
    const errorBody: ErrorResponse = error.error || error; 

    // Mensagem genérica de fallback, se a API não fornecer uma mensagem específica
    const genericMessage = `Ocorreu um erro ao tentar ${action} o veículo. Por favor, tente novamente ou verifique os dados inseridos.`;

    // Prioridade: Usar a mensagem específica da API
    let errorMessage: string;
    
    if (errorBody && typeof errorBody.message === 'string' && errorBody.message.trim().length > 0) {
        // Se a API retornou uma mensagem específica (ex: "Conflito de Recurso: O valor...")
        errorMessage = errorBody.message;
    } else {
        // Usa a mensagem genérica de fallback
        errorMessage = genericMessage;
    }
    // Exibe o Toast com a mensagem detalhada
    //this.toastService.error(`Erro ao ${action}: ${errorMessage}`, 10000); // 10 segundos para erros de API
    this.toastService.error(`${errorMessage}`, 10000);
  }

  goToVehiclesList(): void {
    this.router.navigate(['/app/vehicles']); 
  }
}