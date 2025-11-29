import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild, ElementRef, computed, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

// --- TIPAGEM E MOCK REFORÇADO ---
interface DynamicReportReason {
    value: string; 
    label: string; 
}

const MOCK_API_REASONS: DynamicReportReason[] = [
    { value: 'OTHER-000', label: 'Outro (descreva o problema na Descrição Detalhada)' },
    { value: 'SN-001', label: 'Ruído incomum na Suspensão' },
    { value: 'AC-002', label: 'Falha Elétrica / Ar Condicionado' },
    { value: 'TP-003', label: 'Pressão Baixa dos Pneus' },
    { value: 'FL-004', label: 'Vazamento de Fluido (Óleo, Água, etc.)' },
    { value: 'BS-005', label: 'Ruído no Sistema de Freios' },
    { value: 'BD-006', label: 'Dano na Lataria / Estrutura Externa' },
    { value: 'ID-007', label: 'Dano em Itens Internos (Poltrona, Acabamento)' },
    { value: 'CE-008', label: 'Luz de Injeção/Motor Acesa (Check Engine)' },
    { value: 'TF-009', label: 'Pneu Furado ou Danificado' },
    { value: 'CF-010', label: 'Problema na Comunicação (Rádio/GPS)' },
    { value: 'WR-011', label: 'Ruído no Rolamento da Roda' },
    { value: 'HL-012', label: 'Farol/Lanternas Queimadas' },
    { value: 'WP-013', label: 'Limpador de Para-brisa Defeituoso' },
    { value: 'SB-014', label: 'Cinto de Segurança Danificado' },
    { value: 'FG-015', label: 'Erro no Marcador de Combustível' },
    { value: 'CS-016', label: 'Embreagem Patinando' },
    { value: 'ES-017', 'label': 'Fumaça Excessiva do Motor' },
    { value: 'DL-018', label: 'Falha na Trava da Porta' },
    { value: 'MR-019', label: 'Espelho Quebrado ou Solto' },
    { value: 'HT-020', label: 'Problema no Aquecimento Interno' },
];

interface MockDriver { id: string; name: string; }
const ALL_MOCK_DRIVERS: MockDriver[] = [
    { id: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210', name: 'João Silva (Principal)' },
    { id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', name: 'Maria Souza (Reserva)' },
    { id: '9f8e7d6c-5b4a-3f2e-1d0c-b9a876543210', name: 'Carlos Santos (Emergência)' },
];

export interface CreateDriverReportRequest {
  vehicleId: string;
  userId: string;
  description: string;
  reportReason?: string;
  imageBase64?: string; 
  videoBase64?: string | null; 
}

@Component({
  selector: 'app-new-driver-report', 
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mx-auto max-w-2xl bg-white shadow-xl rounded-xl p-8 my-10 border border-gray-100">
        <header class="mb-8 border-b pb-4 text-center">
          <h1 class="text-3xl font-extrabold text-red-700 mb-2">
            Relato de Ocorrência do Motorista 🧑‍🔧
          </h1>
          <p class="text-gray-600">
            Comunique problemas técnicos e operacionais de forma detalhada e rastreável.
          </p>
        </header>

        <form [formGroup]="reportForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 gap-6">

          <div>
            <label for="vehicleId" class="block text-sm font-semibold text-gray-700 mb-1">
              ID do Veículo <span class="text-red-500">*</span>
            </label>
            <input id="vehicleId" type="text" formControlName="vehicleId" 
                   class="w-full p-3 border border-gray-300 rounded-lg uppercase bg-gray-100 cursor-not-allowed"
                   [maxLength]="36" readonly>
          </div>
          
          <div>
            <label for="userId" class="block text-sm font-semibold text-gray-700 mb-1">
              Motorista <span class="text-red-500">*</span>
              <span class="font-normal text-xs text-gray-500 ml-2">({{ driverSelectionContext() }})</span>
            </label>
            <select id="userId" formControlName="userId"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150">
              <option [value]="null" disabled selected>Selecione seu nome/ID...</option>
              @for (driver of availableDrivers(); track driver.id) {
                <option [ngValue]="driver.id">{{ driver.name }}</option>
              }
            </select>
            @if (reportForm.get('userId')?.invalid && submitted()) {
              @if (reportForm.get('userId')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">Selecione seu ID de motorista.</p>
              }
            }
          </div>

          <div class="border border-gray-300 p-4 rounded-lg bg-red-50 relative" #reasonContainer>
            <label for="reasonSearch" class="block text-sm font-semibold text-gray-700 mb-3">
              Motivo Principal <span class="text-red-500">*</span>
              <span class="font-normal text-xs text-gray-500 ml-2">
                (Selecione um item ou use 'Outro' e detalhe na descrição)
              </span>
            </label>

            <input id="reasonSearch" type="text" 
                   [formControl]="reasonSearchControl"
                   (focus)="showSuggestions.set(true)"
                   (blur)="onReasonSearchBlur()"
                   [disabled]="reportForm.get('reportReason')?.value === 'OTHER-000'"
                   placeholder="Digite o código ou a descrição do problema..."
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                   >
            
            <input type="hidden" formControlName="reportReason">
            
            @if (reportForm.get('reportReason')?.invalid && submitted()) {
              @if (reportForm.get('reportReason')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">
                  Selecione um **Motivo Principal** para o relato.
                </p>
              }
            }

            @if (showSuggestions() && !isLoadingReasons() && reportForm.get('reportReason')?.value !== 'OTHER-000') {
                <div class="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-xl mt-1">
                    
                    @for (reason of filteredReasons(); track reason.value) {
                        <div class="p-3 hover:bg-red-50 cursor-pointer text-sm"
                             (mousedown)="selectReason(reason.value, reason.label)">
                            <span class="font-medium text-gray-800">{{ reason.label }}</span> 
                            <span class="text-gray-400 ml-2">({{ reason.value }})</span>
                        </div>
                    }

                    @if (filteredReasons().length === 0 && reasonSearchControl.value) {
                        <div class="p-3 text-sm text-gray-500">
                            Nenhum motivo encontrado. Por favor, utilize a opção **Outro**.
                        </div>
                    }
                </div>
            }

            @if (selectedReasonLabel()) {
                <p class="mt-2 p-2 bg-white border border-red-300 rounded-lg text-sm text-red-700 font-semibold flex justify-between items-center">
                    Motivo Selecionado: **{{ selectedReasonLabel() }}**
                    <button type="button" (click)="clearReasonSelection()" class="ml-3 text-red-500 hover:text-red-700 text-base font-bold leading-none">
                        &times;
                    </button>
                </p>
            }
          </div>

          <div>
            <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">
              Descrição Detalhada do Problema <span class="text-red-500">*</span>
              <span class="font-normal text-xs text-gray-500">
                 ({{ (MAX_DESCRIPTION_LENGTH - (reportForm.get('description')?.value?.length || 0)) }} caracteres restantes)
              </span>
            </label>
            <textarea id="description" formControlName="description" rows="3"
                      placeholder="Descreva o problema em detalhes, incluindo o contexto (data, horário aproximado, ações tomadas)."
                      [maxLength]="MAX_DESCRIPTION_LENGTH"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150 resize-none"></textarea>
            @if (reportForm.get('description')?.invalid && submitted()) {
              @if (reportForm.get('description')?.errors?.['required']) {
                <p class="text-red-600 text-xs mt-1">A descrição detalhada é obrigatória.</p>
              }
            }
          </div>
          
          <div class="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
            <h3 class="text-base font-semibold text-gray-700 mb-3">Anexos (Opcional)</h3>

            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Imagem/Foto (Base64) - Máx. {{ (MAX_IMAGE_SIZE_BYTES / 1024 / 1024).toFixed(0) }}MB 
                </label>
                
                <div class="flex space-x-2">
                    @if (isMobileDevice) {
                        <button type="button" (click)="openFileInput('image', true)"
                                class="p-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.863-1.293A2 2 0 0110.424 4h3.153a2 2 0 011.664.89l.863 1.293a2 2 0 001.664.89H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Câmera
                        </button>
                    }
                    
                    <button type="button" (click)="openFileInput('image', false)" 
                            class="p-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Arquivo/Galeria
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
                    Vídeo (Multipart) - Máx. {{ (MAX_VIDEO_SIZE_BYTES / 1024 / 1024).toFixed(0) }}MB
                </label>
                
                <div class="flex space-x-2">
                     @if (isMobileDevice) {
                        <button type="button" (click)="openFileInput('video', true)" 
                                class="p-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                            Gravar Vídeo
                        </button>
                    }
                    
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
                <p class="text-red-600 text-xs mt-1">
                    ❌ {{ errorAttachment() }}
                </p>
            }
          </div>

          <footer class="mt-4 flex justify-end">
            <button
              type="submit"
              [disabled]="isSubmitting() || isLoadingReasons()" 
              class="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              @if (isSubmitting()) {
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Enviando...
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Registrar Ocorrência
              }
            </button>
          </footer>
        </form>

        @if (submissionStatus() === 'success') {
          <div class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg font-medium">
            ✅ Relato registrado com sucesso! O veículo será inspecionado.
          </div>
        } @else if (submissionStatus() === 'error') {
          <div class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">
            ❌ Erro ao enviar o relato. Por favor, verifique todos os campos obrigatórios (*).
          </div>
        }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDriverReportComponent implements OnInit {
  private fb = inject(FormBuilder);
  
  @ViewChild('imageCameraInput') imageCameraInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('imageGalleryInput') imageGalleryInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('videoCameraInput') videoCameraInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('videoGalleryInput') videoGalleryInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('reasonContainer', { static: true }) reasonContainerRef!: ElementRef<HTMLDivElement>; 
  
  reportForm!: FormGroup;
  reasonSearchControl = new FormControl<string>(''); 
  
  private searchInputTerm = signal<string>(''); 
  
  showSuggestions = signal(false);
  allReasons = signal<DynamicReportReason[]>([]); 
  selectedReasonLabel = signal<string | null>(null); 
  
  readonly MAX_DESCRIPTION_LENGTH = 250;
  
  isLoadingReasons = signal(false);
  submissionStatus = signal<'idle' | 'success' | 'error'>('idle');
  submitted = signal(false);
  isSubmitting = signal(false);
  isGettingLocation = signal(false);
  errorAttachment = signal<string | null>(null);
  
  imageFile = signal<File | null>(null);
  videoFile = signal<File | null>(null);
  
  readonly MAX_VIDEO_SIZE_BYTES = 31457280; // 30MB
  readonly MAX_IMAGE_SIZE_BYTES = 5242880;  // 5MB 

  isMobileDevice: boolean = false;
  
  availableDrivers = signal<MockDriver[]>([]);
  driverSelectionContext = signal<string>('');
  
  filteredReasons = computed(() => {
    const term = this.searchInputTerm().toLowerCase() || '';
    const all = this.allReasons();
    
    if (this.reportForm.get('reportReason')?.value === 'OTHER-000') {
         return [];
    }
    
    let reasonsToFilter = all.filter(r => r.value !== 'OTHER-000');

    if (!term) {
        const otherReason = all.find(r => r.value === 'OTHER-000');
        return otherReason ? [otherReason, ...reasonsToFilter.slice(0, 10)] : reasonsToFilter.slice(0, 10);
    }
    
    return reasonsToFilter.filter(reason => 
        reason.label.toLowerCase().includes(term) || 
        reason.value.toLowerCase().includes(term)
    ); 
  });

  ngOnInit(): void {
    this.checkIfMobile();
    this.setupDriverSelectionLogic();
    this.loadReportReasons();

    const mockedVehicleId = 'A1B2C3D4-E5F6-7890-1234-567890ABCDEF';
    const mockedUserId = this.availableDrivers()[0]?.id || null;
    
    this.reportForm = this.fb.group({
      vehicleId: [
        { value: mockedVehicleId, disabled: true },
        [Validators.required],
      ],
      userId: [mockedUserId, [Validators.required]],
      reportReason: [null, [Validators.required]], 
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.MAX_DESCRIPTION_LENGTH),
        ],
      ],
    });

    this.selectedReasonLabel.set(null);
    this.reasonSearchControl.setValue('');

    this.reasonSearchControl.valueChanges
        .subscribe(term => {
             if (this.reportForm.get('reportReason')?.value !== null && term !== this.selectedReasonLabel()) {
                 this.reportForm.get('reportReason')?.setValue(null);
                 this.selectedReasonLabel.set(null);
             }
             this.searchInputTerm.set(term || '');
        });
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
      if (this.showSuggestions()) {
          if (!this.reasonContainerRef.nativeElement.contains(event.target as Node)) {
              setTimeout(() => {
                  this.showSuggestions.set(false);
                  const selectedValue = this.reportForm.get('reportReason')?.value;
                  const currentLabel = this.selectedReasonLabel();

                  if (selectedValue === null && this.reasonSearchControl.value?.trim()) {
                       this.reasonSearchControl.setValue(''); 
                  } else if (currentLabel) {
                       this.reasonSearchControl.setValue(currentLabel);
                  }
                  this.reportForm.updateValueAndValidity();
              }, 150);
          }
      }
  }

  private async fetchDynamicReasons(): Promise<DynamicReportReason[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return MOCK_API_REASONS; 
  }

  private async loadReportReasons(): Promise<void> {
    this.isLoadingReasons.set(true);
    try {
        const all = await this.fetchDynamicReasons();
        this.allReasons.set(all);
    } catch (e) {
        console.error("Erro ao carregar motivos:", e);
        this.allReasons.set([]);
    } finally {
        this.isLoadingReasons.set(false);
    }
  }

  selectReason(value: string, label: string): void {
      this.reportForm.get('reportReason')?.setValue(value);
      this.selectedReasonLabel.set(label);
      this.reasonSearchControl.setValue(label);
      this.showSuggestions.set(false);
      this.reportForm.updateValueAndValidity();
      
      if (value === 'OTHER-000') {
           this.searchInputTerm.set('');
      }
  }

  clearReasonSelection(): void {
      this.reportForm.get('reportReason')?.setValue(null);
      this.selectedReasonLabel.set(null);
      this.reasonSearchControl.setValue('');
      this.searchInputTerm.set('');
      this.reportForm.updateValueAndValidity();
  }

  onReasonSearchBlur(): void {
      setTimeout(() => {
          this.showSuggestions.set(false);
          const selectedValue = this.reportForm.get('reportReason')?.value;
          const currentLabel = this.selectedReasonLabel();
          
          if (selectedValue === null) {
              this.reasonSearchControl.setValue('');
          } else if (currentLabel) {
              this.reasonSearchControl.setValue(currentLabel);
          }
          this.reportForm.updateValueAndValidity();
      }, 150);
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
  
  // ✅ CORREÇÃO APLICADA AQUI
  clearFile(type: 'image' | 'video', shouldClearError: boolean = true): void {
    if (type === 'image') {
      this.imageFile.set(null);
      if (this.imageCameraInputRef) this.imageCameraInputRef.nativeElement.value = '';
      if (this.imageGalleryInputRef) this.imageGalleryInputRef.nativeElement.value = '';
    } else {
      this.videoFile.set(null);
      if (this.videoCameraInputRef) this.videoCameraInputRef.nativeElement.value = '';
      if (this.videoGalleryInputRef) this.videoGalleryInputRef.nativeElement.value = '';
    }
    
    // Zera o erro apenas se shouldClearError for TRUE (default)
    if (shouldClearError) {
        this.errorAttachment.set(null);
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (result && result.includes(',')) {
             resolve(result.split(',')[1]); 
        } else {
             reject(new Error('Falha ao processar o arquivo de imagem.'));
        }
      };
      reader.onerror = error => reject(error);
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

      // Limpeza dos inputs de arquivo (necessário para re-selecionar o mesmo arquivo)
      if (type === 'image') {
        if (this.imageCameraInputRef) this.imageCameraInputRef.nativeElement.value = '';
        if (this.imageGalleryInputRef) this.imageGalleryInputRef.nativeElement.value = '';
      } else {
        if (this.videoCameraInputRef) this.videoCameraInputRef.nativeElement.value = '';
        if (this.videoGalleryInputRef) this.videoGalleryInputRef.nativeElement.value = '';
      }
      
      if (file.size > maxSize) {
        this.errorAttachment.set(`O ${type === 'video' ? 'vídeo' : 'arquivo'} excede o limite de ${maxSizeMB}MB.`);
        // ✅ CORREÇÃO APLICADA: Limpa o arquivo, mas MANTÉM o erro no signal
        this.clearFile(type, false);
        return;
      }
      
      // Se for válido, procede com a seleção.
      if (type === 'image') {
          this.imageFile.set(file);
      } else {
          this.videoFile.set(file);
      }
      this.errorAttachment.set(null); 

    } else {
      if (type === 'image' && !this.imageFile()) this.imageFile.set(null); 
      if (type === 'video' && !this.videoFile()) this.videoFile.set(null);
    }
  }


  // --- Lógica de Submissão ---

  async onSubmit(): Promise<void> {
    this.submitted.set(true);
    this.submissionStatus.set('idle');
    this.isSubmitting.set(true); 

    this.reportForm.updateValueAndValidity();

    if (!this.reportForm.valid || this.errorAttachment()) {
        this.reportForm.markAllAsTouched();
        console.error('❌ ERRO DE VALIDAÇÃO: Formulário inválido.');
        this.submissionStatus.set('error');
        this.isSubmitting.set(false);
        return; 
    }

    const formRawValue = this.reportForm.getRawValue();
    const vehicleIdValue = formRawValue.vehicleId.toUpperCase();
    
    try {
        let imageBase64: string | undefined = undefined;
        if (this.imageFile()) {
            imageBase64 = await this.fileToBase64(this.imageFile()!);
        }
        
        // 1. Monta o DTO (JSON)
        const reportData: CreateDriverReportRequest = {
            vehicleId: vehicleIdValue,
            userId: formRawValue.userId,
            description: formRawValue.description,
            reportReason: formRawValue.reportReason,
            imageBase64: imageBase64,
            videoBase64: undefined, // undefined para não ser serializado no JSON
        };

        const formData = new FormData();
        // Anexa o JSON como um Blob (parte 'report')
        formData.append('report', new Blob([JSON.stringify(reportData)], { type: 'application/json' }));

        if (this.videoFile()) {
            const videoFile = this.videoFile()!;
            // Anexa o arquivo de vídeo como parte separada ('video')
            formData.append('video', videoFile, videoFile.name);
        }
        
        console.log('*** DADOS FINAIS DE SUBMISSÃO (Simulação) ***');
        console.log(`Anexos: ${this.imageFile() ? 'Imagem(Base64)' : ''} ${this.videoFile() ? 'Vídeo(FormData)' : ''}`);
        console.log('DTO JSON:', reportData);

        // SIMULAÇÃO DE ENVIO
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        this.submissionStatus.set('success');
        
        // 5. Limpeza após o sucesso
        this.reportForm.reset({
            userId: formRawValue.userId, 
            description: '',
            reportReason: null, 
        });

        this.reportForm.get('vehicleId')?.setValue(vehicleIdValue); 
        this.submitted.set(false);
        this.clearFile('image'); // Usa o default 'true'
        this.clearFile('video'); // Usa o default 'true'
        this.selectedReasonLabel.set(null); 
        this.reasonSearchControl.setValue(''); 

    } catch (error) {
        console.error('❌ Erro no envio do relato do motorista:', error);
        this.submissionStatus.set('error');
    } finally {
        this.isSubmitting.set(false); 
    }
  }

  private setupDriverSelectionLogic(): void {
    const involvedDrivers = ALL_MOCK_DRIVERS.slice(0, 2); 
    this.availableDrivers.set(involvedDrivers);
    this.driverSelectionContext.set('Em Viagem (Motoristas associados)');
  }

}