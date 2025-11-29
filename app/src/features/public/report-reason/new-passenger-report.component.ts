import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { CreatePassengerReportRequest, PassengerReportReason, REPORTREASON_SCHEMA_DETAILS } from '../../../generated-api';

// Lista de motivos de exemplo para o dropdown.
const EXAMPLE_REASONS: { label: string, value: PassengerReportReason }[] = [
  { label: 'Má condução do motorista', value: PassengerReportReason.DrivingBehavior },
  { label: 'Problema mecânico / veículo avariado', value: PassengerReportReason.Defect },
  { label: 'Limpeza e higiene insatisfatória', value: PassengerReportReason.Hygiene },
  { label: 'Poltronas ou espaço desconfortável', value: PassengerReportReason.Comfort },
  { label: 'Outro (descreva na descrição)', value: PassengerReportReason.Other }
];

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mx-auto max-w-2xl bg-white shadow-xl rounded-xl p-8 my-10 border border-gray-100">
        <header class="mb-8 border-b pb-4 text-center">
          <h1 class="text-3xl font-extrabold text-indigo-700 mb-2">
            Relato Anônimo de Passageiro 🗣️
          </h1>
          <p class="text-gray-600">
            Utilize este formulário para reportar problemas de forma rápida e anônima.
          </p>
        </header>

        <form [formGroup]="reportForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 gap-6">

          <div>
            <label for="vehicleId" class="block text-sm font-semibold text-gray-700 mb-1">
              {{ schema.vehicleId['x-ui-label'] }} <span class="text-red-500">*</span>
            </label>
            <input id="vehicleId" type="text" formControlName="vehicleId" placeholder="{{ schema.vehicleId.example }}"
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 uppercase bg-gray-100 cursor-not-allowed"
                   [maxLength]="36"
                   aria-describedby="vehicleIdHelp" readonly>
            <p id="vehicleIdHelp" class="text-xs text-gray-500 mt-1">
              Este ID foi preenchido automaticamente pela URL e não pode ser editado.
            </p>
            @if (reportForm.get('vehicleId')?.invalid && submitted()) {
              @if (reportForm.get('vehicleId')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  O ID do veículo é obrigatório para direcionarmos o relato.
                </p>
              }
            }
          </div>

          <div>
            <label for="reportReason" class="block text-sm font-semibold text-gray-700 mb-1">
              Motivo do Relato <span class="text-red-500">*</span>
            </label>
            <select id="reportReason" formControlName="reportReason"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
              <option [value]="null" disabled selected>Selecione o motivo principal...</option>
              @for (reason of reasons; track reason.value) {
                <option [ngValue]="reason.value">{{ reason.label }}</option>
              }
            </select>
            @if (reportForm.get('reportReason')?.invalid && submitted()) {
              @if (reportForm.get('reportReason')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  Selecione um motivo para o relato.
                </p>
              }
            }
          </div>

          <div>
            <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">
              {{ schema.description['x-ui-label'] }} <span class="text-red-500">*</span>
              <span class="font-normal text-xs text-gray-500">
                 ({{ (schema.description.maxLength || 250) - (reportForm.get('description')?.value?.length || 0) }} caracteres restantes)
              </span>
            </label>
            <textarea id="description" formControlName="description" rows="3"
                      placeholder="Descreva o problema de forma concisa. Ex: O ar condicionado está quebrado desde a partida."
                      [maxLength]="schema.description.maxLength"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"></textarea>
            @if (reportForm.get('description')?.invalid && submitted()) {
              @if (reportForm.get('description')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  A descrição é obrigatória.
                </p>
              }
            }
          </div>
          
          <div class="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
            <h3 class="text-base font-semibold text-gray-700 mb-3">Anexos (Opcional)</h3>

            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    {{ schema.imageBase64['x-ui-label'] }} (Base64) - Máx. {{ (MAX_IMAGE_SIZE_BYTES / 1024 / 1024).toFixed(0) }}MB 
                </label>
                
                <div class="flex space-x-2">
                    <button *ngIf="isMobileDevice" type="button" (click)="openFileInput('image', true)" 
                            class="p-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.863-1.293A2 2 0 0110.424 4h3.153a2 2 0 011.664.89l.863 1.293a2 2 0 001.664.89H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Câmera
                    </button>
                    
                    <button type="button" (click)="openFileInput('image', false)" 
                            class="p-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Arquivo
                    </button>
                </div>

                <input #imageCameraInput id="imageCamera" type="file" (change)="onFileSelected($event, 'image')" accept="image/*"
                       capture="environment" style="display: none;">
                
                <input #imageGalleryInput id="imageGallery" type="file" (change)="onFileSelected($event, 'image')" accept="image/*"
                       style="display: none;">

                @if (imageFile()) {
                    <p class="text-xs text-green-600 mt-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                        Imagem selecionada: **{{ imageFile()!.name }}** ({{ (imageFile()!.size / 1024 / 1024).toFixed(2) }} MB)
                        <button type="button" (click)="clearFile('image')" class="ml-2 text-red-500 hover:text-red-700 text-sm font-semibold">
                            (X)
                        </button>
                    </p>
                }
            </div>
            
            <div class="mt-6">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    {{ schema.videoBase64['x-ui-label'] }} (Multipart) - Máx. {{ (MAX_VIDEO_SIZE_BYTES / 1024 / 1024).toFixed(0) }}MB
                </label>
                
                <div class="flex space-x-2">
                    <button *ngIf="isMobileDevice" type="button" (click)="openFileInput('video', true)" 
                            class="p-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                        Gravar Vídeo
                    </button>
                    
                    <button type="button" (click)="openFileInput('video', false)" 
                            class="p-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.55 2.275l-4.55 2.275V10zM5 18V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2z" /></svg>
                        Selecionar Vídeo
                    </button>
                </div>

                <input #videoCameraInput id="videoCamera" type="file" (change)="onFileSelected($event, 'video')" accept="video/*"
                       capture="environment" style="display: none;">

                <input #videoGalleryInput id="videoGallery" type="file" (change)="onFileSelected($event, 'video')" accept="video/*"
                       style="display: none;">

                @if (videoFile()) {
                    <p class="text-xs text-green-600 mt-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                        Vídeo selecionado: **{{ videoFile()!.name }}** ({{ (videoFile()!.size / 1024 / 1024).toFixed(2) }} MB)
                        <button type="button" (click)="clearFile('video')" class="ml-2 text-red-500 hover:text-red-700 text-sm font-semibold">
                            (X)
                        </button>
                    </p>
                }
            </div>
            
            @if (errorAttachment()) {
                <p class="text-red-600 text-xs mt-3 font-medium border-t pt-2 border-red-200">
                    ⚠️ {{ errorAttachment() }}
                </p>
            }
          </div>


          <footer class="mt-4 flex justify-end">
            <button
              type="submit"
              [disabled]="isSubmitting()" 
              class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              @if (isSubmitting()) {
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 21h20L12 2zM12 15L12 16M12 11L12 13"/></svg>
                Enviar Relato Anônimo
              }
            </button>
          </footer>
        </form>

        @if (submissionStatus() === 'success') {
          <div class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg font-medium">
            ✅ Relato enviado com sucesso! Agradecemos sua colaboração anônima.
          </div>
        } @else if (submissionStatus() === 'error') {
          <div class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">
            ❌ Erro ao enviar o relato. Por favor, verifique se todos os campos obrigatórios (*) estão preenchidos.
          </div>
        }

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPassengerReportComponent implements OnInit {
  private fb = inject(FormBuilder);
  
  @ViewChild('imageCameraInput') imageCameraInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('imageGalleryInput') imageGalleryInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('videoCameraInput') videoCameraInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('videoGalleryInput') videoGalleryInputRef!: ElementRef<HTMLInputElement>;
  
  reportForm!: FormGroup;
  readonly schema = REPORTREASON_SCHEMA_DETAILS.createPassengerReportRequest;
  readonly reasons = EXAMPLE_REASONS;

  submissionStatus = signal<'idle' | 'success' | 'error'>('idle');
  submitted = signal(false);
  isSubmitting = signal(false);
  errorAttachment = signal<string | null>(null);

  imageFile = signal<File | null>(null);
  videoFile = signal<File | null>(null);
  
  readonly MAX_VIDEO_SIZE_BYTES = 31457280; // 30MB
  readonly MAX_IMAGE_SIZE_BYTES = 5242880;  // 5MB 

  isMobileDevice: boolean = false; 

  ngOnInit(): void {
    this.checkIfMobile();
    
    const mockedVehicleIdFromUrl = 'A1B2C3D4-E5F6-7890-1234-567890ABCDEF';

    this.reportForm = this.fb.group({
      vehicleId: [
        { 
          value: mockedVehicleIdFromUrl, 
          disabled: true                  
        },
        [
          Validators.required,
        ],
      ],
      reportReason: [null, [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.schema.description.maxLength || 250),
        ],
      ],
    });
  }
  
  private checkIfMobile(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    this.isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  }

  openFileInput(type: 'image' | 'video', useCamera: boolean): void {
    if (type === 'image') {
        if (useCamera) {
            this.imageCameraInputRef.nativeElement.click();
        } else {
            this.imageGalleryInputRef.nativeElement.click();
        }
    } else if (type === 'video') {
        if (useCamera) {
            this.videoCameraInputRef.nativeElement.click(); 
        } else {
            this.videoGalleryInputRef.nativeElement.click();
        }
    }
  }
  
  // ✅ CORREÇÃO APLICADA AQUI: Adiciona shouldClearError (padrão é TRUE)
  clearFile(type: 'image' | 'video', shouldClearError: boolean = true): void {
    if (type === 'image') {
      this.imageFile.set(null);
      this.imageCameraInputRef.nativeElement.value = '';
      this.imageGalleryInputRef.nativeElement.value = '';
    } else {
      this.videoFile.set(null);
      this.videoCameraInputRef.nativeElement.value = '';
      this.videoGalleryInputRef.nativeElement.value = '';
    }
    
    if (shouldClearError) {
        this.errorAttachment.set(null);
    }
  }

  private fileToBase64(file: File): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (result && result.includes(',')) {
             const base64String = result.split(',')[1];
             console.log('✅ Conversão da IMAGEM para Base64 CONCLUÍDA.');
             resolve(base64String);
        } else {
             console.error('Falha ao processar o arquivo de imagem.');
             resolve(undefined);
        }
      };
      reader.onerror = error => {
          console.error('Erro de leitura de arquivo:', error);
          resolve(undefined);
      }
      reader.readAsDataURL(file);
    });
  }

  onFileSelected(event: Event, type: 'image' | 'video'): void {
    this.errorAttachment.set(null);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const maxSize = type === 'video' ? this.MAX_VIDEO_SIZE_BYTES : this.MAX_IMAGE_SIZE_BYTES;
      const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);

      // Limpa o input oposto (câmera vs. galeria)
      if (type === 'image') {
        if (input.id === 'imageCamera') this.imageGalleryInputRef.nativeElement.value = '';
        if (input.id === 'imageGallery') this.imageCameraInputRef.nativeElement.value = '';
      } else {
        if (input.id === 'videoCamera') this.videoGalleryInputRef.nativeElement.value = '';
        if (input.id === 'videoGallery') this.videoCameraInputRef.nativeElement.value = '';
      }

      // Validação de Tamanho
      if (file.size > maxSize) {
        // Define o erro 
        this.errorAttachment.set(`O ${type === 'video' ? 'vídeo' : 'arquivo'} excede o limite de ${maxSizeMB}MB.`);
        // ✅ CORREÇÃO APLICADA AQUI: Limpa o arquivo, mas MANTÉM o erro no signal.
        this.clearFile(type, false); 
        return;
      }
      
      // Se for válido, salva o arquivo e limpa o erro.
      if (type === 'image') {
          this.imageFile.set(file);
          this.videoFile.set(null); 
      } else {
          this.videoFile.set(file);
          this.imageFile.set(null); 
      }
      this.errorAttachment.set(null); // Limpa qualquer erro anterior se a seleção for válida.

    } else {
      // Se a seleção for cancelada e não houver um arquivo pré-selecionado
      if (type === 'image' && !this.imageFile()) this.imageFile.set(null); 
      if (type === 'video' && !this.videoFile()) this.videoFile.set(null);
    }
  }

  async onSubmit(): Promise<void> {
    this.submitted.set(true);
    this.submissionStatus.set('idle');
    this.isSubmitting.set(true); 

    // Validação final do formulário e do anexo (tamanho, etc.)
    if (!this.reportForm.valid || this.errorAttachment()) {
        this.reportForm.markAllAsTouched();
        console.error('❌ ERRO DE VALIDAÇÃO: Formulário inválido.');
        this.logValidationErrors(); 
        this.submissionStatus.set('error');
        this.isSubmitting.set(false);
        return; 
    }

    const formRawValue = this.reportForm.getRawValue();
    const vehicleIdValue = formRawValue.vehicleId.toUpperCase();

    try {
        let imageBase64Data: string | undefined = undefined;
        let videoFile: File | undefined = this.videoFile() || undefined; 

        // --- 1. PROCESSAMENTO DOS ANEXOS ---

        // 1.1 Imagem: Se existir, converte para Base64.
        if (this.imageFile()) {
            console.log('Convertendo imagem para Base64...');
            imageBase64Data = await this.fileToBase64(this.imageFile()!);
        }
        
        // 2. Monta o DTO (JSON)
        const reportData: CreatePassengerReportRequest = {
            vehicleId: vehicleIdValue,
            description: formRawValue.description,
            reportReason: formRawValue.reportReason,
            
            // Se imageBase64Data for string, inclui; se for undefined, omite.
            imageBase64: imageBase64Data, 
            
            // videoBase64 é 'undefined' no JSON.
            videoBase64: undefined, 
        };

        // 3. Cria o objeto FormData para enviar a requisição
        const formData = new FormData();
        
        // Adiciona o JSON (relato)
        formData.append('report', new Blob([JSON.stringify(reportData)], { type: 'application/json' }));

        // 4. TRATAMENTO DO VÍDEO (Multipart)
        if (videoFile) {
            console.log('--- DEPURANDO ANEXO DE VÍDEO ---');
            console.log('Nome do Arquivo Original:', videoFile.name);
            console.log('Tipo MIME Original:', videoFile.type || 'desconhecido');
            
            let fileToAppend: File | Blob = videoFile;
            let fileName = videoFile.name;
            
            // ✅ CORREÇÃO ROBUSTA APLICADA: Força o Content-Type para MP4 se o nome sugerir.
            if (fileName.toLowerCase().endsWith('.mp4')) {
                fileToAppend = new Blob([videoFile], { type: 'video/mp4' });
                console.log(`⚠️ Forçando o anexo a ser um Blob com Content-Type: video/mp4`);
            } else {
                 console.log(`Usando tipo MIME original: ${videoFile.type || 'desconhecido'}`);
            }
            
            formData.append('video', fileToAppend, fileName);
            console.log('✅ Vídeo anexado ao FormData.');
        } else {
            console.log('Vídeo opcional não selecionado.');
        }
        
        console.log('Dados do Formulário (DTO JSON) prontos para envio (Simulação API):', reportData);

        // --- SIMULAÇÃO de Chamada API COM FormData ---
        // Aqui você faria a chamada real usando o HttpClient
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        this.submissionStatus.set('success');
        
        // 5. Limpeza após o sucesso
        this.reportForm.reset({
            reportReason: null, 
            description: ''
        });
        this.reportForm.get('vehicleId')?.setValue(vehicleIdValue); 
        this.submitted.set(false);
        this.clearFile('image'); 
        this.clearFile('video'); 

    } catch (error) {
        console.error('Erro irrecuperável durante o processamento ou simulação de API:', error);
        this.submissionStatus.set('error');
    } finally {
        this.isSubmitting.set(false); 
    }
  }

  private logValidationErrors(): void {
    Object.keys(this.reportForm.controls).forEach(key => {
      const control = this.reportForm.get(key); 
      
      if (control && control.errors) {
        console.group(`Campo Inválido: ${key}`);
        console.log('Valor:', control.value);
        console.log('Erros:', control.errors);
        
        if (control.errors['required']) {
            console.log('Motivo: Campo obrigatório não preenchido.');
        }
        if (control.errors['maxlength']) {
            const { requiredLength, actualLength } = control.errors['maxlength'];
            console.log(`Motivo: Excedeu o tamanho máximo (${actualLength} de ${requiredLength}).`);
        }
        if (control.errors['pattern']) {
            console.log(`Motivo: Não corresponde ao padrão exigido (Regex: ${control.errors['pattern'].requiredPattern}).`);
        }
        
        console.groupEnd();
      }
    });
    
    if (this.errorAttachment()) {
        console.error('❌ Erro de Anexo (Vídeo/Imagem):', this.errorAttachment());
    }
  }
}