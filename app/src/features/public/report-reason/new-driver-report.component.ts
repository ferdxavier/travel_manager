import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild, ElementRef, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

// --- TIPAGEM E MOCK REFORÇADO (Mantido) ---
interface DynamicReportReason {
    value: string; // ID/Slug único para indexação na API
    label: string; 
}
// Lista completa de motivos (mantida)
const MOCK_API_REASONS: DynamicReportReason[] = [
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

interface CreateDriverReportRequest {
  vehicleId: string;
  userId: string;
  description: string;
  reportReason?: string;
  odometerReading: number;
  locationCoordinates: string;
  imageBase64?: string;
  otherReasonText?: string;
}

// 2. VALIDADOR CUSTOMIZADO (Mantido, baseado na lógica do componente)
function reasonOrOtherReasonValidator(control: AbstractControl): ValidationErrors | null {
    const reportReason = control.get('reportReason')?.value;
    const otherReasonDescription = control.get('otherReasonDescription')?.value;

    // A validação falha se: (1) NENHUM motivo foi selecionado E (2) o campo Outros está vazio
    if (reportReason === null && (!otherReasonDescription || otherReasonDescription.trim() === '')) {
        return { requiredReasonOrOther: true };
    }
    return null;
}

@Component({
  selector: 'app-new-driver-report', 
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mx-auto max-w-2xl bg-white shadow-xl rounded-xl p-8 my-10 border border-gray-100">
        <header class="mb-8 border-b pb-4 text-center">
          <h1 class="text-3xl font-extrabold text-red-700 mb-2">
            Relato de Ocorrência do Motorista
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
              ID do Motorista <span class="text-red-500">*</span>
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

          <div class="border border-gray-300 p-4 rounded-lg bg-red-50 relative">
            <label for="reasonSearch" class="block text-sm font-semibold text-gray-700 mb-3">
              Motivo Principal <span class="text-red-500">*</span>
              <span class="font-normal text-xs text-gray-500 ml-2">
                (Pesquise ou use "Outros Motivos")
              </span>
            </label>

            <input id="reasonSearch" type="text" 
                   [formControl]="reasonSearchControl"
                   (focus)="showSuggestions.set(true)"
                   (blur)="onReasonSearchBlur()"
                   placeholder="Digite o código ou a descrição do problema..."
                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150">
            
            <input type="hidden" formControlName="reportReason">

            @if (showSuggestions() && !isLoadingReasons()) {
                <div class="absolute z-10 w-[95%] max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-xl mt-1">
                    
                    @for (reason of filteredReasons(); track reason.value) {
                        <div class="p-3 hover:bg-red-50 cursor-pointer text-sm"
                             (mousedown)="selectReason(reason.value, reason.label)">
                            <span class="font-medium text-gray-800">{{ reason.label }}</span> 
                            <span class="text-gray-400 ml-2">({{ reason.value }})</span>
                        </div>
                    }

                    <div class="p-3 border-t border-gray-200 hover:bg-red-100 cursor-pointer text-sm font-semibold text-red-700"
                         (mousedown)="selectReason('OTHER', reasonSearchControl.value || 'Outro Motivo Personalizado')">
                        Adicionar: Outro Motivo (Ativar campo abaixo)
                    </div>

                    @if (filteredReasons().length === 0 && reasonSearchControl.value) {
                        <div class="p-3 text-sm text-gray-500">
                            Nenhum motivo encontrado para "{{ reasonSearchControl.value }}". Por favor, use "Outro Motivo".
                        </div>
                    }
                </div>
            }

            @if (selectedReasonLabel()) {
                <p class="mt-2 p-2 bg-white border border-red-300 rounded-lg text-sm text-red-700 font-semibold flex justify-between items-center">
                    Motivo Selecionado: {{ selectedReasonLabel() }}
                    <button type="button" (click)="clearReasonSelection()" class="text-red-500 hover:text-red-700 text-base font-bold ml-3 leading-none">
                        &times;
                    </button>
                </p>
            }
          </div>

          <div [class.hidden]="!isOtherReasonSelected()">
            <label for="otherReasonDescription" class="block text-sm font-semibold text-gray-700 mb-1">
              Outros Motivos (Obrigatório se não houver Motivo Principal)
            </label>
            <textarea id="otherReasonDescription" formControlName="otherReasonDescription" rows="2"
                      placeholder="Ex: 'Barulho no motor somente em marcha lenta, após 10 minutos de uso.'"
                      [maxLength]="MAX_OTHER_REASON_LENGTH"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150 resize-none"></textarea>
          </div>

          @if (reportForm.hasError('requiredReasonOrOther') && submitted()) {
            <div class="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">
              ⚠️ É necessário selecionar um **Motivo Principal** OU preencher o campo **Outros Motivos**.
            </div>
          }
          
          <div>
            <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">
              Descrição do Problema Detalhada <span class="text-red-500">*</span>
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
            
            <div class="grid grid-cols-2 gap-3 mb-4">
                <button type="button" (click)="openFileInput('image', true)" 
                        [disabled]="videoFile() !== null"
                        class="flex items-center justify-center p-3 text-sm font-semibold rounded-lg border border-gray-400 bg-white hover:bg-gray-100 disabled:opacity-50 transition">
                    📸 Tirar Foto
                </button>
                <button type="button" (click)="openFileInput('image', false)" 
                        [disabled]="videoFile() !== null"
                        class="flex items-center justify-center p-3 text-sm font-semibold rounded-lg border border-gray-400 bg-white hover:bg-gray-100 disabled:opacity-50 transition">
                    🖼️ Escolher Imagem
                </button>

                <button type="button" (click)="openFileInput('video', true)"
                        [disabled]="imageFile() !== null"
                        class="flex items-center justify-center p-3 text-sm font-semibold rounded-lg border border-gray-400 bg-white hover:bg-gray-100 disabled:opacity-50 transition">
                    🎥 Gravar Vídeo
                </button>
                <button type="button" (click)="openFileInput('video', false)"
                        [disabled]="imageFile() !== null"
                        class="flex items-center justify-center p-3 text-sm font-semibold rounded-lg border border-gray-400 bg-white hover:bg-gray-100 disabled:opacity-50 transition">
                    🎞️ Escolher Vídeo
                </button>
            </div>

            <input #imageCameraInput id="imageCamera" type="file" (change)="onFileSelected($event, 'image')" accept="image/*" capture="environment" style="display: none;">
            <input #imageGalleryInput id="imageGallery" type="file" (change)="onFileSelected($event, 'image')" accept="image/*" style="display: none;">
            <input #videoCameraInput id="videoCamera" type="file" (change)="onFileSelected($event, 'video')" accept="video/*" capture="environment" style="display: none;">
            <input #videoGalleryInput id="videoGallery" type="file" (change)="onFileSelected($event, 'video')" accept="video/*" style="display: none;">

            @if (imageFile()) {
                <p class="text-xs text-green-600 mt-2 flex items-center">✅ Imagem anexada: {{ imageFile()!.name }} ({{ (imageFile()!.size / 1024 / 1024).toFixed(2) }} MB)<button type="button" (click)="clearFile('image')" class="ml-2 text-red-500 hover:text-red-700 text-sm font-semibold">(X)</button></p>
            }
            @if (videoFile()) {
                <p class="text-xs text-green-600 mt-2 flex items-center">✅ Vídeo anexado: {{ videoFile()!.name }} ({{ (videoFile()!.size / 1024 / 1024).toFixed(2) }} MB)<button type="button" (click)="clearFile('video')" class="ml-2 text-red-500 hover:text-red-700 text-sm font-semibold">(X)</button></p>
            }
            @if (errorAttachment()) {
                <p class="text-red-600 text-xs mt-1">❌ {{ errorAttachment() }}</p>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="M22 4L12 14.01l-3-3"></path></svg>
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
  
  // Referências para os inputs de arquivo (necessário para .click() nos botões)
  @ViewChild('imageCameraInput') imageCameraInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('imageGalleryInput') imageGalleryInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('videoCameraInput') videoCameraInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('videoGalleryInput') videoGalleryInputRef!: ElementRef<HTMLInputElement>;
  
  reportForm!: FormGroup;
  reasonSearchControl = new FormControl<string>(''); // Controla o campo de texto do autocomplete
  
  // Signals para a lógica do Autocomplete
  showSuggestions = signal(false);
  allReasons = signal<DynamicReportReason[]>([]); 
  
  selectedReasonLabel = signal<string | null>(null); // Exibe o motivo selecionado para o usuário
  
  // NEW: Lógica de filtragem com computed()
  filteredReasons = computed(() => {
    const term = this.reasonSearchControl.value?.toLowerCase() || '';
    const all = this.allReasons();
    const initialCount = 10; // Número inicial de itens para exibir
    
    // Se o termo estiver vazio, retorna os N primeiros
    if (!term) {
        return all.slice(0, initialCount);
    }
    
    // Se estiver pesquisando, filtra na lista completa
    return all.filter(reason => 
        reason.label.toLowerCase().includes(term) || 
        reason.value.toLowerCase().includes(term)
    ).slice(0, 10); // Limita os resultados da pesquisa a 10
  });

  // NEW: Estado para controlar a visibilidade do campo "Outros Motivos"
  isOtherReasonSelected = computed(() => this.reportForm.get('reportReason')?.value === 'OTHER');

  // Constantes e outros signals (Mantidos)
  readonly MAX_DESCRIPTION_LENGTH = 250;
  readonly MAX_OTHER_REASON_LENGTH = 100;
  
  isLoadingReasons = signal(false);
  submissionStatus = signal<'idle' | 'success' | 'error'>('idle');
  submitted = signal(false);
  isSubmitting = signal(false);
  errorAttachment = signal<string | null>(null);
  
  imageFile = signal<File | null>(null);
  videoFile = signal<File | null>(null);
  
  readonly MAX_VIDEO_SIZE_BYTES = 10485760; // 10MB
  readonly MAX_IMAGE_SIZE_BYTES = 5242880;  // 5MB 

  isMobileDevice: boolean = false;
  
  availableDrivers = signal<MockDriver[]>([]);
  driverSelectionContext = signal<string>('');
  
  // Removido canShowMore, pois a paginação por "Carregar Mais" foi substituída pelo filtro/limite de 10.
  // totalReasonsCount é obsoleto, mas mantido para referência.
  totalReasonsCount = signal(MOCK_API_REASONS.length); 

  ngOnInit(): void {
    this.checkIfMobile();
    this.setupDriverSelectionLogic();
    this.loadReportReasons();

    const mockedVehicleId = 'A1B2C3D4-E5F6-7890-1234-567890ABCDEF';

    this.reportForm = this.fb.group({
      vehicleId: [
        { value: mockedVehicleId, disabled: true },
        [Validators.required],
      ],
      userId: [null, [Validators.required]],
      reportReason: [null], // Valor final: 'SN-001' ou 'OTHER'
      otherReasonDescription: ['', [Validators.maxLength(this.MAX_OTHER_REASON_LENGTH)]], 
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.MAX_DESCRIPTION_LENGTH),
        ],
      ],
    }, { validators: reasonOrOtherReasonValidator });

    // Observa o controle de pesquisa e se ele muda para 'OTHER', limpa o campo de texto livre
    this.reportForm.get('reportReason')?.valueChanges.subscribe(value => {
        if (value === 'OTHER') {
            // Se 'OTHER' é selecionado, garante que o campo de texto livre seja requerido para a validação.
            // Aqui vamos apenas mostrar o campo. A validação geral cuida do 'required'.
        } else {
             // Se um motivo válido for selecionado, limpa o campo de texto livre.
             this.reportForm.get('otherReasonDescription')?.setValue('');
        }
    });

    // Inicializa a label de seleção se houver um valor inicial (opcional)
    const initialReason = this.reportForm.get('reportReason')?.value;
    if (initialReason) {
        this.selectedReasonLabel.set(
            this.allReasons().find(r => r.value === initialReason)?.label || initialReason
        );
    }
  }

  // --- LÓGICA DE CARREGAMENTO (Simplificada, sem paginação) ---

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

  // --- LÓGICA DO AUTOCOMPLETE ---

  selectReason(value: string, label: string): void {
      this.reportForm.get('reportReason')?.setValue(value);
      this.selectedReasonLabel.set(label);
      this.reasonSearchControl.setValue(label);
      this.showSuggestions.set(false);
  }

  clearReasonSelection(): void {
      this.reportForm.get('reportReason')?.setValue(null);
      this.selectedReasonLabel.set(null);
      this.reasonSearchControl.setValue('');
      this.reportForm.get('otherReasonDescription')?.setValue('');
  }

  onReasonSearchBlur(): void {
      // Usamos um pequeno timeout para permitir que o evento (mousedown) do item da lista seja disparado ANTES do blur
      setTimeout(() => {
          // Se o blur ocorrer e NENHUM motivo foi selecionado
          if (this.reportForm.get('reportReason')?.value === null) {
              // Limpa o texto da pesquisa se nada foi selecionado da lista
              this.reasonSearchControl.setValue('');
              this.selectedReasonLabel.set(null);
          } else {
              // Mantém o texto da label selecionada no input
              const currentLabel = this.selectedReasonLabel();
              if (currentLabel) {
                  this.reasonSearchControl.setValue(currentLabel);
              }
          }
          this.showSuggestions.set(false);
      }, 150);
  }
  
  // --- LÓGICA DE SUBMISSÃO (Mantida) ---

  async onSubmit(): Promise<void> {
    this.submitted.set(true);
    this.submissionStatus.set('idle');
    this.isSubmitting.set(true); 

    // Garante que o campo de descrição não seja validado se "OTHER" não tiver sido selecionado
    if (this.reportForm.get('reportReason')?.value !== 'OTHER') {
        this.reportForm.get('otherReasonDescription')?.setValue('');
    }

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
        let videoFile: File | undefined = this.videoFile() || undefined; 

        // Se 'OTHER' foi selecionado, o reportReason é 'OTHER' e o texto customizado é enviado
        let finalReportReason: string | undefined = formRawValue.reportReason; 
        let customReasonText: string | undefined = undefined;

        if (finalReportReason === 'OTHER' && formRawValue.otherReasonDescription.trim() !== '') {
             customReasonText = formRawValue.otherReasonDescription;
        } else if (finalReportReason !== 'OTHER') {
             // Se um motivo válido foi selecionado, o campo 'otherReasonDescription' é ignorado
             customReasonText = undefined;
        }
        
        // Mocks para campos obrigatórios removidos da UI
        const ODOMETER_MOCK = 0; 
        const LOCATION_MOCK = 'lat: 0.0, lon: 0.0 (NA)';

        const reportData: CreateDriverReportRequest = {
            vehicleId: vehicleIdValue,
            userId: formRawValue.userId,
            description: formRawValue.description,
            reportReason: finalReportReason, 
            odometerReading: ODOMETER_MOCK, 
            locationCoordinates: LOCATION_MOCK, 
            imageBase64: imageBase64,
            otherReasonText: customReasonText 
        };

        const formData = new FormData();
        formData.append('report', new Blob([JSON.stringify(reportData)], { type: 'application/json' }));

        if (videoFile) {
            formData.append('video', new Blob([videoFile], { type: videoFile.type || 'video/mp4' }), videoFile.name);
        }
        
        console.log('✅ DTO JSON para envio (Simulação):', reportData);

        // SIMULAÇÃO DE ENVIO
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        this.submissionStatus.set('success');
        
        // 5. Limpeza após o sucesso
        this.reportForm.reset({
            userId: null, 
            reportReason: null,
            otherReasonDescription: '',
            description: '',
        });
        this.reportForm.get('vehicleId')?.setValue(vehicleIdValue); 
        this.submitted.set(false);
        this.clearFile('image'); 
        this.clearFile('video'); 
        this.clearReasonSelection(); // Limpa o estado do autocomplete

    } catch (error) {
        console.error('❌ Erro no envio do relato do motorista:', error);
        this.submissionStatus.set('error');
    } finally {
        this.isSubmitting.set(false); 
    }
  }

  // --- MÉTODOS AUXILIARES (Lógica de arquivos, drivers) ---

  private setupDriverSelectionLogic(): void {
    const isOnTrip = Math.random() < 0.33; 
    if (isOnTrip) {
      const involvedDrivers = ALL_MOCK_DRIVERS.slice(0, 2); 
      this.availableDrivers.set(involvedDrivers);
      this.driverSelectionContext.set('Em Viagem (Motoristas associados)');
    } else {
      this.availableDrivers.set(ALL_MOCK_DRIVERS);
      this.driverSelectionContext.set('Fora de Viagem (Todos os motoristas)');
    }
  }

    private checkIfMobile(): void {
      const userAgent = navigator.userAgent.toLowerCase();
      this.isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    }
    
    openFileInput(type: 'image' | 'video', useCamera: boolean): void {
      if (type === 'image' && this.videoFile()) {
        this.clearFile('video');
      } else if (type === 'video' && this.imageFile()) {
        this.clearFile('image');
      }

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
    
    clearFile(type: 'image' | 'video'): void {
      if (type === 'image') {
        this.imageFile.set(null);
        if (this.imageCameraInputRef) this.imageCameraInputRef.nativeElement.value = '';
        if (this.imageGalleryInputRef) this.imageGalleryInputRef.nativeElement.value = '';
      } else {
        this.videoFile.set(null);
        if (this.videoCameraInputRef) this.videoCameraInputRef.nativeElement.value = '';
        if (this.videoGalleryInputRef) this.videoGalleryInputRef.nativeElement.value = '';
      }
      this.errorAttachment.set(null);
    }

    private fileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          if (result && result.includes(',')) {
               const base64String = result.split(',')[1];
               resolve(base64String);
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

        if (file.size > maxSize) {
          this.errorAttachment.set(`O ${type === 'video' ? 'vídeo' : 'arquivo'} excede o limite de ${maxSizeMB}MB.`);
          this.clearFile(type);
          return;
        }
        
        if (type === 'image') {
            this.videoFile.set(null); 
            this.imageFile.set(file);
        } else {
            this.imageFile.set(null);
            this.videoFile.set(file);
        }

      } else {
        if (type === 'image' && !this.imageFile()) this.imageFile.set(null); 
        if (type === 'video' && !this.videoFile()) this.videoFile.set(null);
      }
    }
}