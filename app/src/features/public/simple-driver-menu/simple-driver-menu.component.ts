import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

// Interfaces para os itens do menu
interface MenuItem {
  id: number;
  label: string;
  description: string;
  icon: string; // Nome do ícone Lucide
  link: string | undefined;
}

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Container principal e layout centralizado -->
    <div class="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      
      <div class="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-6 sm:p-8">
        
        <!-- Cabeçalho -->
        <header class="text-center mb-10">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-2">
            Menu do Motorista 🚌
          </h1>
          <p class="text-gray-600 text-lg">
            Selecione uma ação para continuar sua jornada.
          </p>
        </header>

        <!-- Grade de Opções (Menu) -->
        <div class="grid gap-6 sm:grid-cols-1">

          @for (item of menuItems(); track item.id) {
            <!-- Card de Opção -->
            <button 
              (click)="selectOption(item)"
              class="w-full text-left p-5 border border-gray-200 rounded-xl transition duration-300 ease-in-out 
                     hover:shadow-lg hover:border-indigo-400 hover:bg-indigo-50 
                     focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <div class="flex items-center space-x-4">
                
                <!-- Ícone -->
                <div class="p-3 bg-indigo-100 rounded-full text-indigo-600 flex-shrink-0">
                  <!-- O [innerHTML] recebe agora o SafeHtml -->
                  <div [innerHTML]="getIcon(item.icon, '#4f46e5')" class="w-7 h-7"></div>
                </div>

                <!-- Conteúdo -->
                <div>
                  <h2 class="text-xl font-bold text-gray-800">
                    {{ item.id }} - {{ item.label }}
                  </h2>
                  <p class="text-sm text-gray-500 mt-0.5">
                    {{ item.description }}
                  </p>
                </div>

              </div>
            </button>
          }
        </div>
        
        <!-- Área de Feedback (Simulação de Ação) -->
        @if (selectedItem()) {
          <div class="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
            <p class="font-medium">Ação Selecionada (Simulação):</p>
            <p class="text-sm">
              Você escolheu **{{ selectedItem()!.label }}**. 
              @if (selectedItem()!.link) {
                O caminho (path) é: <code class="font-mono bg-yellow-200 p-1 rounded text-xs">{{ selectedItem()!.link }}</code>. A simulação de redirecionamento ocorreu.
              } @else {
                O caminho (path) ainda não foi definido.
              }
            </p>
          </div>
        }
        
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDriverMenuComponent {
            // Injeção do Router no construtor
  constructor(private router: Router) {}
  
  // Injeção do DomSanitizer para manipular o HTML e torná-lo seguro
  private sanitizer = inject(DomSanitizer);

  // Dados do menu usando Signals para reatividade
  menuItems = signal<MenuItem[]>([
    { 
      id: 1, 
      label: 'Troca/Entrada de Motorista', 
      description: 'Iniciar ou finalizar sua jornada no veículo.', 
      icon: 'SwitchUser',
      link: '/public/page-under-construction'
    },
    { 
      id: 2, 
      label: 'Relatar um Problema', 
      description: 'Reportar problemas mecânicos, incidentes ou falhas operacionais.', 
      icon: 'AlertTriangle',
      link: '/public/report-reason/driver' // Path definido pelo usuário
    },
    { 
      id: 3, 
      label: 'Adicionar uma Despesa', 
      description: 'Registrar gastos com combustível, pedágios, manutenção, etc.', 
      icon: 'DollarSign',
      link: '/public/page-under-construction'
    },
  ]);

  selectedItem = signal<MenuItem | null>(null);

  // Mapeamento dos ícones Lucide (em formato SVG)
  // Nota: Os SVGs foram ajustados para usar o placeholder __COLOR__.
  iconMap: { [key: string]: string } = {
    // Ícone para Troca/Entrada
    'SwitchUser': `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="__COLOR__" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 6H3" />
        <path d="M15 12H3" />
        <path d="M15 18H3" />
        <path d="M18 9v6" />
        <path d="M21 12l-3 3-3-3" />
      </svg>
    `,
    // Ícone para Relatar Problema
    'AlertTriangle': `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="__COLOR__" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h18.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    `,
    // Ícone para Adicionar Despesa
    'DollarSign': `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="__COLOR__" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    `,
  };

  /**
   * Retorna o SVG do ícone mapeado, injetando a cor e marcando o HTML como seguro.
   * @param iconName O nome do ícone a ser buscado.
   * @param colorHex A cor hexadecimal a ser aplicada.
   * @returns O objeto SafeHtml que pode ser injetado via [innerHTML].
   */
  getIcon(iconName: string, colorHex: string): SafeHtml {
    const svgTemplate = this.iconMap[iconName] || '';
    // Substitui o placeholder pela cor real. Use /g para garantir todas as ocorrências.
    // O código SVG original não tinha o placeholder, mas a correção exige que o injetemos aqui.
    const coloredSvg = svgTemplate.replace(/__COLOR__/g, colorHex);
    // Bypassa a sanitização de segurança, permitindo que o SVG seja renderizado.
    return this.sanitizer.bypassSecurityTrustHtml(coloredSvg);
  }

  /**
   * Simula a seleção de uma opção de menu.
   * @param item O item do menu selecionado.
   */
  selectOption(item: MenuItem): void {
    this.selectedItem.set(item);
    
    // Agora usando o Router injetado
    if (item.link) {
      console.log(`Passageiro selecionou a opção: ${item.label}. Redirecionando para: ${item.link}`);
      this.router.navigate([item.link]);
    }
  }
}