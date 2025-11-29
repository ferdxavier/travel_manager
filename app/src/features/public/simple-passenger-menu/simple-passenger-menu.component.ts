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
  link: string;
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
          <h1 class="text-3xl sm:text-4xl font-extrabold text-teal-700 mb-2">
            Menu do Passageiro 👤
          </h1>
          <p class="text-gray-600 text-lg">
            Como podemos te ajudar hoje?
          </p>
        </header>

        <!-- Grade de Opções (Menu) -->
        <div class="grid gap-6 sm:grid-cols-1">

          @for (item of menuItems(); track item.id) {
            <!-- Card de Opção -->
            <button 
              (click)="selectOption(item)"
              class="w-full text-left p-5 border border-gray-200 rounded-xl transition duration-300 ease-in-out 
                     hover:shadow-lg hover:border-teal-400 hover:bg-teal-50 
                     focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
            >
              <div class="flex items-center space-x-4">
                
                <!-- Ícone -->
                <div class="p-3 bg-teal-100 rounded-full text-teal-600 flex-shrink-0">
                  <!-- Agora, o [innerHTML] recebe um objeto SafeHtml que o Angular confia -->
                  <div [innerHTML]="getIcon(item.icon, '#0d9488')" class="w-7 h-7"></div>
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
          <div class="mt-8 p-4 bg-lime-100 border-l-4 border-lime-500 text-lime-800 rounded-lg">
            <p class="font-medium">Ação Selecionada (Simulação):</p>
            <p class="text-sm">Você escolheu **{{ selectedItem()!.label }}**. Aqui iniciaria o fluxo da tela de passageiro correspondente.</p>
            @if (selectedItem()!.link) {
              <p class="text-xs mt-1">Navegação via URL (Simulando o Router): <code class="font-mono bg-lime-200 p-1 rounded">{{ selectedItem()!.link }}</code></p>
            }
          </div>
        }
        
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplePassengerMenuComponent {

        // Injeção do Router no construtor
  constructor(private router: Router) {}
  
  // Injeção do DomSanitizer para manipular o HTML e torná-lo seguro
  private sanitizer = inject(DomSanitizer);

  // Dados do menu usando Signals para reatividade
  menuItems = signal<MenuItem[]>([
    { 
      id: 1, 
      label: 'Relatar um Problema', 
      description: 'Reportar qualquer incidente, problema ou preocupação durante a viagem.', 
      icon: 'AlertTriangle',
      link: '/public/report-reason/passenger'
    },
    { 
      id: 2, 
      label: 'Procurar uma Excursão', 
      description: 'Buscar, visualizar e planejar sua próxima viagem ou destino.', 
      icon: 'Search',
      link: '/public/page-under-construction' 
    },
    { 
      id: 3, 
      label: 'Histórico de Viagens', 
      description: 'Acessar o registro de todas as suas viagens passadas.', 
      icon: 'BookOpen',
      link: '/public/page-under-construction' 
    },
  ]);

  selectedItem = signal<MenuItem | null>(null);

  // Mapeamento dos ícones Lucide (em formato SVG)
  // Nota: Os SVGs usam um placeholder '__COLOR__' para injetar a cor na próxima função.
  iconMap: { [key: string]: string } = {
    // Ícone para Relatar Problema
    'AlertTriangle': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="__COLOR__" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    `,
    // Ícone para Procurar uma Excursão
    'Search': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="__COLOR__" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
    `,
    // Ícone para Histórico de Viagens (Adicionei mais um para testar a lista)
    'BookOpen': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="__COLOR__" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    `,
  };

  /**
   * Retorna o SVG do ícone mapeado, injetando a cor e marcando o HTML como seguro.
   * A cor é injetada no SVG e o DomSanitizer é usado para ignorar a sanitização de segurança.
   * * @param iconName O nome do ícone a ser buscado.
   * @param colorHex A cor hexadecimal a ser aplicada.
   * @returns O objeto SafeHtml que pode ser injetado via [innerHTML].
   */
  getIcon(iconName: string, colorHex: string): SafeHtml {
    const svgTemplate = this.iconMap[iconName] || '';
    // Substitui o placeholder pela cor real. Use /g para garantir todas as ocorrências.
    const coloredSvg = svgTemplate.replace(/__COLOR__/g, colorHex);
    // Bypassa a sanitização de segurança, permitindo que o SVG seja renderizado.
    return this.sanitizer.bypassSecurityTrustHtml(coloredSvg);
  }

  selectOption(item: MenuItem): void {
    this.selectedItem.set(item);
    
    // Agora usando o Router injetado
    if (item.link) {
      console.log(`Passageiro selecionou a opção: ${item.label}. Redirecionando para: ${item.link}`);
      this.router.navigate([item.link]);
    }
  }
}