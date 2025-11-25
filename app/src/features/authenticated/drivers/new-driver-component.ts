import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DRIVER_SCHEMA_DETAILS, CreateDriverRequest } from '../../../generated-api';
import { Router } from '@angular/router';

/**
 * Valida se a data de nascimento implica que o motorista tem pelo menos 18 anos.
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
function minAgeValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // O campo required cuida disso
  }
  const birthDate = new Date(control.value);
  const today = new Date();
  const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  return birthDate <= eighteenYearsAgo ? null : { minAge: true };
}

/**
 * Valida se a data é no futuro (exames e CNH devem ser válidos).
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // O campo required cuida disso
  }
  const date = new Date(control.value);
  const today = new Date();
  // Zera as horas para comparar apenas a data
  today.setHours(0, 0, 0, 0);

  return date > today ? null : { futureDate: true };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mx-auto bg-white shadow-xl p-4 md:p-10">
        <header class="mb-8 border-b pb-4 flex items-center justify-between">
          <h1 class="text-3xl font-extrabold text-indigo-700 flex items-center">
            Cadastro de Novo Motorista
          </h1>
          <button (click)="goToDriversList()" class="space-y-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            Lista de motoristas
          </button>
        </header>
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
             <footer class="md:col-span-2 space-x-4 mt-4 border-t pt-4 flex justify-end">

            <button 
              type="button" 
              (click)="goToDriversList()" 
              class="btn-cancel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn-confirm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8h-6v8"/><path d="M7 11h4V7H7z"/></svg>
              Salvar Motorista
            </button>
          </footer>
        </form>

        @if (submissionStatus() === 'success') {
          <div class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Motorista criado com sucesso!
          </div>
        } @else if (submissionStatus() === 'error') {
          <div class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Erro ao criar motorista. Verifique os dados destacados em vermelho e tente novamente.
          </div>
        }

    </div>
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
  driverForm!: FormGroup;
  submissionStatus = signal<'idle' | 'success' | 'error'>('idle');
  submitted = signal(false); // Sinal para controlar a exibição de erros após a submissão

  // Acesso fácil ao schema para as mensagens de erro
  readonly schema = DRIVER_SCHEMA_DETAILS.createDriverRequest;

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(this.schema.name.minLength),
          Validators.maxLength(this.schema.name.maxLength),
        ],
      ],
      cpf: [
        '',
        [
          Validators.required,
          Validators.minLength(this.schema.cpf.minLength),
          Validators.maxLength(this.schema.cpf.maxLength),
          Validators.pattern(this.schema.cpf.pattern), // Validação regex final
        ],
      ],
      rg: [
        '',
        [
          // RG não é required
          Validators.minLength(this.schema.rg.minLength),
          Validators.maxLength(this.schema.rg.maxLength),
        ],
      ],
      dateBirth: ['', [Validators.required, minAgeValidator]],
      cnhNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.schema.cnhNumber.maxLength),
          Validators.pattern(this.schema.cnhNumber.pattern), // Validação regex final
        ],
      ],
      validityCnh: ['', [Validators.required, futureDateValidator]],
      validityToxicological: ['', [Validators.required, futureDateValidator]],
    });
  }

  /**
   * Restringe o input a apenas dígitos, atualizando o valor do FormControl.
   * Isso melhora a UX impedindo a digitação de caracteres inválidos.
   * @param controlName O nome do FormControl a ser atualizado.
   * @param event O evento de input.
   */
  restrictToDigits(controlName: 'cpf' | 'cnhNumber', event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const originalValue = inputElement.value;
    // Remove qualquer coisa que não seja dígito
    const sanitizedValue = originalValue.replace(/\D/g, '');

    if (originalValue !== sanitizedValue) {
      // Atualiza o valor do elemento de input e do FormControl se houver alteração
      this.driverForm.get(controlName)?.setValue(sanitizedValue, { emitEvent: true });
    }
  }

  onSubmit(): void {
    // 1. Marca que o formulário foi submetido (dispara a exibição de erros no template)
    this.submitted.set(true);
    this.submissionStatus.set('idle');

    if (this.driverForm.valid) {
      const formData: CreateDriverRequest = {
        ...this.driverForm.value,
        // Convertendo strings de data (YYYY-MM-DD) em objetos Date para simular o request
        dateBirth: new Date(this.driverForm.value.dateBirth),
        validityCnh: new Date(this.driverForm.value.validityCnh),
        validityToxicological: new Date(this.driverForm.value.validityToxicological),
      };

      console.log('Dados a serem enviados:', formData);

      // --- Simulação de Chamada API ---
      setTimeout(() => {
        this.submissionStatus.set('success');
        this.driverForm.reset();
        // 3. Resetar o estado 'submitted' e form após o sucesso para esconder os erros
        this.submitted.set(false);
        this.driverForm.markAsPristine();
        this.driverForm.markAsUntouched();
      }, 1000);

    } else {
      // Se inválido, forçar o "touched" em todos os campos para garantir que a classe de erro seja aplicada (opcional)
      this.driverForm.markAllAsTouched();
      this.submissionStatus.set('error');
      console.error('Formulário inválido');
    }
  }
  
  goToDriversList(): void {
    this.router.navigate(['/app/drivers']); 
  }
}