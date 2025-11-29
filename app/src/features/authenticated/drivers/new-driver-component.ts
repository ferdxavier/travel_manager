import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Imports dos componentes de layout (mantidos)
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormFooterComponent } from '../../../shared/components/form-footer/form-footer.component';

// REMOVE: FeedbackAlertComponent
// import { FeedbackAlertComponent, AlertStatus } from '../../../shared/components/feedback-alert/feedback-alert.component'; 

// Importa o NOVO SERVIÇO
import { ToastService } from '../../../shared/services/toast.service'; 

// Imports das validações (mantidos)
import { minAgeValidator, futureDateValidator } from '../../../shared/utils/custom-validators';
import { ToastComponent } from "../../../shared/components/toast/toast.component";

// Ícone para o cabeçalho (mantido)
const DRIVER_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20l4-16"/><path d="M6 20l4-16"/><path d="M14 20l4-16"/></svg>';

@Component({
  selector: 'app-new-driver',
  standalone: true,
  // Atualiza imports: remove FeedbackAlertComponent e adiciona ToastService (via injeção)
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent, FormFooterComponent, ToastComponent], 
  template: `
    <div class="mx-auto bg-white shadow-xl p-4 md:p-10">
        
        <app-page-header
          title="Cadastro de Novo Motorista"
          listLabel="Lista de motoristas"
          [iconSvg]="driverIcon"
          (goToList)="goToDriversList()" 
        />

        <form [formGroup]="driverForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div class="md:col-span-2">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              {{ schema.name['x-ui-label'] }}
            </label>
            <input id="name" type="text" formControlName="name" placeholder="Ex: João da Silva"
                   [maxLength]="schema.name.maxLength"
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            @if (driverForm.get('name')?.invalid && submitted()) {
              @if (driverForm.get('name')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  O nome é obrigatório.
                </p>
              }
              @if (driverForm.get('name')?.errors?.['minlength']) {
                <p class="text-red-600 text-xs mt-1">
                  Mínimo {{ schema.name.minLength }} caracteres.
                </p>
              }
              @if (driverForm.get('name')?.errors?.['maxlength']) {
                <p class="text-red-600 text-xs mt-1">
                  Máximo {{ schema.name.maxLength }} caracteres.
                </p>
              }
            }
          </div>

          <div>
            <label for="cpf" class="block text-sm font-medium text-gray-700 mb-1">
              {{ schema.cpf['x-ui-label'] }}
            </label>
            <input id="cpf" type="tel" formControlName="cpf" placeholder="00011122233"
                   [maxLength]="schema.cpf.maxLength"
                   (input)="restrictToDigits('cpf', $event)"
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            @if (driverForm.get('cpf')?.invalid && submitted()) {
              @if (driverForm.get('cpf')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  O CPF é obrigatório.
                </p>
              }
              @if (driverForm.get('cpf')?.errors?.['pattern'] || driverForm.get('cpf')?.errors?.['maxlength']) {
                <p class="text-red-600 text-xs mt-1">
                  O CPF deve conter exatamente 11 dígitos numéricos.
                </p>
              }
            }
          </div>

          <div>
            <label for="rg" class="block text-sm font-medium text-gray-700 mb-1">
              {{ schema.rg['x-ui-label'] }}
            </label>
            <input id="rg" type="text" formControlName="rg" placeholder="Ex: MG 13569569"
                   [maxLength]="schema.rg.maxLength"
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            @if (driverForm.get('rg')?.invalid && submitted()) {
              @if (driverForm.get('rg')?.errors?.['minlength'] || driverForm.get('rg')?.errors?.['maxlength']) {
                <p class="text-red-600 text-xs mt-1">
                  O RG deve ter entre {{ schema.rg.minLength }} e {{ schema.rg.maxLength }} caracteres.
                </p>
              }
            }
          </div>

          <div>
            <label for="dateBirth" class="block text-sm font-medium text-gray-700 mb-1">
              {{ schema.dateBirth['x-ui-label'] }}
            </label>
            <input id="dateBirth" type="date" formControlName="dateBirth"
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            @if (driverForm.get('dateBirth')?.invalid && submitted()) {
              @if (driverForm.get('dateBirth')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  A data de nascimento é obrigatória.
                </p>
              }
              @if (driverForm.get('dateBirth')?.errors?.['minAge']) {
                <p class="text-red-600 text-xs mt-1">
                  O motorista deve ter 18 anos ou mais.
                </p>
              }
            }
          </div>

          <div>
            <label for="cnhNumber" class="block text-sm font-medium text-gray-700 mb-1">
              {{ schema.cnhNumber['x-ui-label'] }}
            </label>
            <input id="cnhNumber" type="tel" formControlName="cnhNumber" placeholder="Ex: 2536565936616546"
                   [maxLength]="schema.cnhNumber.maxLength"
                   (input)="restrictToDigits('cnhNumber', $event)"
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            @if (driverForm.get('cnhNumber')?.invalid && submitted()) {
              @if (driverForm.get('cnhNumber')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  O número da CNH é obrigatório.
                </p>
              }
              @if (driverForm.get('cnhNumber')?.errors?.['pattern'] || driverForm.get('cnhNumber')?.errors?.['maxlength']) {
                <p class="text-red-600 text-xs mt-1">
                  CNH deve ser um número entre 8 e {{ schema.cnhNumber.maxLength }} dígitos.
                </p>
              }
            }
          </div>

          <div>
            <label for="validityCnh" class="block text-sm font-medium text-gray-700 mb-1">
              {{ schema.validityCnh['x-ui-label'] }}
            </label>
            <input id="validityCnh" type="date" formControlName="validityCnh"
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            @if (driverForm.get('validityCnh')?.invalid && submitted()) {
              @if (driverForm.get('validityCnh')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  A validade da CNH é obrigatória.
                </p>
              }
              @if (driverForm.get('validityCnh')?.errors?.['futureDate']) {
                <p class="text-red-600 text-xs mt-1">
                  A CNH deve estar válida (data futura).
                </p>
              }
            }
          </div>

          <div>
            <label for="validityToxicological" class="block text-sm font-medium text-gray-700 mb-1">
              {{ schema.validityToxicological['x-ui-label'] }}
            </label>
            <input id="validityToxicological" type="date" formControlName="validityToxicological"
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            @if (driverForm.get('validityToxicological')?.invalid && submitted()) {
              @if (driverForm.get('validityToxicological')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  A validade do exame toxicológico é obrigatória.
                </p>
              }
              @if (driverForm.get('validityToxicological')?.errors?.['futureDate']) {
                <p class="text-red-600 text-xs mt-1">
                  O exame toxicológico deve estar válido (data futura).
                </p>
              }
            }
          </div>
          
          <app-form-footer
            class="md:col-span-2"
            cancelLabel="Cancelar"
            submitLabel="Salvar Motorista"
            [isSubmitting]="isSubmitting()"
            (cancel)="goToDriversList()" 
          />

        </form>

    </div>
    <app-toast-container />
  `,
  styles: [
    `
    /* Estilos para evitar a flecha de incremento em inputs 'tel' que podem ser usados como 'number' */
    input[type='tel']::-webkit-outer-spin-button,
    input[type='tel']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='tel'] {
      -moz-appearance: textfield;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDriverComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  // Injete o novo serviço
  private toastService = inject(ToastService); 
  
  driverForm!: FormGroup;
  // submissionStatus REMOVIDO, pois o ToastService gerencia isso
  submitted = signal(false); 
  isSubmitting = signal(false); // Adicionado para controle do botão de submit

  // Constantes de mensagens (agora usadas no ToastService)
  readonly successMessage = 'Motorista criado com sucesso!';
  readonly errorMessage = 'Erro ao criar motorista. Verifique os dados destacados em vermelho e tente novamente.';
  readonly driverIcon = DRIVER_ICON_SVG;
  
  // MOCK do Schema (mantido como estava na versão sem erros)
  readonly schema: any = { 
    createDriverRequest: {
      name: { 'x-ui-label': 'Nome Completo', maxLength: 100, minLength: 3 },
      cpf: { 'x-ui-label': 'CPF', maxLength: 11, minLength: 11, pattern: /^\d{11}$/ },
      rg: { 'x-ui-label': 'RG (Opcional)', minLength: 5, maxLength: 15 },
      dateBirth: { 'x-ui-label': 'Data de Nascimento' },
      cnhNumber: { 'x-ui-label': 'Número da CNH', maxLength: 16, pattern: /^\d{8,16}$/ },
      validityCnh: { 'x-ui-label': 'Validade CNH' },
      validityToxicological: { 'x-ui-label': 'Validade Exame Toxicológico' },
    },
    // Propriedades para acesso direto no template
    name: { 'x-ui-label': 'Nome Completo', maxLength: 100, minLength: 3 },
    cpf: { 'x-ui-label': 'CPF', maxLength: 11, minLength: 11, pattern: /^\d{11}$/ },
    rg: { 'x-ui-label': 'RG (Opcional)', minLength: 5, maxLength: 15 },
    dateBirth: { 'x-ui-label': 'Data de Nascimento' },
    cnhNumber: { 'x-ui-label': 'Número da CNH', maxLength: 16, pattern: /^\d{8,16}$/ },
    validityCnh: { 'x-ui-label': 'Validade CNH' },
    validityToxicological: { 'x-ui-label': 'Validade Exame Toxicológico' },
  };

  ngOnInit(): void {
    const s = this.schema; 

    this.driverForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(s.name.minLength),
          Validators.maxLength(s.name.maxLength),
        ],
      ],
      cpf: [
        '',
        [
          Validators.required,
          Validators.minLength(s.cpf.minLength),
          Validators.maxLength(s.cpf.maxLength),
          Validators.pattern(s.cpf.pattern),
        ],
      ],
      rg: [
        '',
        [
          // RG não é required
          Validators.minLength(s.rg.minLength),
          Validators.maxLength(s.rg.maxLength),
        ],
      ],
      // CORREÇÃO APLICADA: Validadores são usados sem chamada de função
      dateBirth: ['', [Validators.required, minAgeValidator]], 
      cnhNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(s.cnhNumber.maxLength),
          Validators.pattern(s.cnhNumber.pattern),
        ],
      ],
      // CORREÇÃO APLICADA: Validadores são usados sem chamada de função
      validityCnh: ['', [Validators.required, futureDateValidator]], 
      validityToxicological: ['', [Validators.required, futureDateValidator]], 
    });
  }

  restrictToDigits(controlName: 'cpf' | 'cnhNumber', event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const originalValue = inputElement.value;
    const sanitizedValue = originalValue.replace(/\D/g, '');

    if (originalValue !== sanitizedValue) {
      this.driverForm.get(controlName)?.setValue(sanitizedValue, { emitEvent: true });
    }
  }

  onSubmit(): void {
    this.submitted.set(true);
    this.isSubmitting.set(true);

    if (this.driverForm.valid) {
      // Simulação de Request (mantida a lógica de conversão)
      const formData: any = { 
        ...this.driverForm.value,
        dateBirth: new Date(this.driverForm.value.dateBirth),
        validityCnh: new Date(this.driverForm.value.validityCnh),
        validityToxicological: new Date(this.driverForm.value.validityToxicological),
      };

      console.log('Dados a serem enviados:', formData);

      // --- Simulação de Chamada API ---
      setTimeout(() => {
        this.isSubmitting.set(false);
        
        // NOVO: Chama o serviço Toast com sucesso
        this.driverForm.reset();
        this.submitted.set(false);
        this.driverForm.markAsPristine();
        this.driverForm.markAsUntouched();
        this.router.navigate(['/app/drivers']); 
      }, 2000);
      this.toastService.success(this.successMessage);

    } else {
      this.isSubmitting.set(false);
      this.driverForm.markAllAsTouched();
      
      this.toastService.error(this.errorMessage, 8000); // Exibe por 8 segundos
      console.error('Formulário inválido');
    }
  }
  
  goToDriversList(): void {
    this.router.navigate(['/app/drivers']); 
  }
}