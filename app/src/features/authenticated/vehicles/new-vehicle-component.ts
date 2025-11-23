import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms'; 
import { CreateVehicleRequest, CreateVehicleRequestStatusEnum, VEHICLE_SCHEMA_DETAILS } from '../../../generated-api';

@Component({
  selector: 'app-new-vehicles',
  template: `
      <div class="mx-auto bg-white shadow-xl p-4 md:p-10">
        <header class="mb-8 border-b pb-4 flex items-center justify-between">
          <h1 class="text-3xl font-extrabold text-indigo-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bus-front-icon lucide-bus-front"><path d="M4 6 2 7"/><path d="M10 6h4"/><path d="m22 7-2-1"/><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M8 15h.01"/><path d="M16 15h.01"/><path d="M6 19v2"/><path d="M18 21v-2"/></svg>
            Cadastro de Novo Veículo
          </h1>
          <button (click)="goToVehiclesList()" class="text-sm text-gray-500 hover:text-indigo-600 transition duration-150 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            Lista de Veículos
          </button>
        </header>

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
              >
                <option [ngValue]="CreateVehicleRequestStatusEnum.Available">Disponível</option>
                <option [ngValue]="CreateVehicleRequestStatusEnum.Maintenance">Manutenção</option>
                <option [ngValue]="CreateVehicleRequestStatusEnum.Retired">Aposentado</option>
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
          

          <footer class="flex justify-end space-x-4 pt-6 border-t mt-8">
            <button 
              type="button" 
              (click)="goToVehiclesList()" 
              class="btn-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8h-6v8"/><path d="M7 11h4V7H7z"/></svg>
              Salvar Veículo
            </button>
          </footer>
        </form>

      </div>
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
    
    /* FEEDBACK VISUAL PARA CAMPOS INVÁLIDOS (Agora dependente de 'submitted') */
    /* A classe ng-invalid é aplicada pelo Angular, mas a borda vermelha só será vista quando o erro for visível */
    .form-input.ng-invalid.ng-submitted,
    .form-input.ng-invalid.ng-dirty { /* Mantendo o .ng-dirty caso se queira ter a borda vermelha ao digitar, mas o feedback de texto só vem apos o submit */
      /* Pode-se remover .ng-dirty acima e deixar apenas o ng-invalid para ter certeza que so muda a borda no submit */
      /* Para garantir que a borda só mude após o submit, use: .ng-invalid.ng-submitted */
      /* Deixaremos a classe NG-TOUCHED/NG-DIRTY pois a classe NG-SUBMITTED não é injetada automaticamente para cada controle */
    }

    .form-checkbox {
      @apply h-5 w-5 text-indigo-600 border-gray-300 rounded shadow-sm focus:ring-indigo-500;
    }
    .btn-primary {
      @apply inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150;
    }
    .btn-secondary {
      @apply inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150;
    }
    .uppercase {
      text-transform: uppercase;
    }
    .tracking-widest {
      letter-spacing: 0.2em;
    }
  `],
  imports: [CommonModule, FormsModule], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NewVehicleComponent {
  
  private router = inject(Router);

  // Variavel de estado para controlar a exibição dos erros
  submitted: boolean = false; 

  vehicleDoc = VEHICLE_SCHEMA_DETAILS.createVehicleRequest; 
  isAdvancedOpen = false;

  vehicleForm: CreateVehicleRequest = {
    // Requeridos (valores iniciais que satisfazem a validação básica)
    licensePlate: '',
    model: '',
    vehicleManufacturer: '',
    modelYear: new Date().getFullYear(),
    manufacturerYear: new Date().getFullYear(),
    chassisNumber: '',
    status: CreateVehicleRequestStatusEnum.Available, 
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
  
  CreateVehicleRequestStatusEnum = CreateVehicleRequestStatusEnum;

  /**
   * Tenta salvar o veículo, ativando a exibição dos erros.
   * @param form A referência NgForm do template.
   */
  saveVehicle(form: NgForm): void {
    
    // 1. ATIVA O MODO 'SUBMITTED' para mostrar os feedbacks de erro no template
    this.submitted = true;
    
    // 2. Marca todos os campos como 'touched' para que a validação do Angular seja reavaliada,
    // garantindo que os erros de min/max/pattern sejam capturados imediatamente.
    Object.keys(form.controls).forEach(key => {
      const control = form.controls[key];
      control.markAsTouched();
    });
    
    // 3. Verifica se o formulário é inválido
    if (form.invalid) {
      console.warn('Formulário inválido. Exibindo feedbacks para correção.');
      // O formulário continua aberto, e o usuário vê as mensagens
      return; 
    }

    // 4. Se o formulário for válido, procede com o salvamento
    // ✅ LOG DE PAYLOAD VÁLIDO
    console.log('✅ Payload (CreateVehicleRequest) Válido para Envio:', this.vehicleForm);
    
    // TODO: Implementar a lógica real de salvamento
    
    alert('Veículo salvo com sucesso! (Verifique o console para o payload de envio)');
    // this.goToVehiclesList();
  }

  goToVehiclesList(): void {
    this.router.navigate(['/app/vehicles']); 
  }
}