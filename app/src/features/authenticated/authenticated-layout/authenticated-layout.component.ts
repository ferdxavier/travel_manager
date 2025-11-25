import { Component, inject, HostListener, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-authenticated-layout',
  template: `
    <!-- Layout Principal: Ocupa 100% da viewport e usa 'relative' para o z-index do overlay (no mobile) -->
    <div class="flex h-screen bg-gray-50 relative overflow-hidden">
      <!-- 1. Sidebar de Navegação -->
      <nav
        class="bg-primary-900 text-white flex flex-col transition-all duration-300 ease-in-out h-screen overflow-hidden flex-none"
        [ngClass]="{
          'md:w-64 md:px-4 md:relative': !isSidebarCollapsed && !isMobile,
          'md:w-20 md:px-2 md:relative': isSidebarCollapsed && !isMobile,

          'w-64 px-4 fixed top-0 left-0 z-50 transform transition-transform duration-300 shadow-2xl':
            isMobile,
          'translate-x-0': isMobile && !isSidebarCollapsed,
          '-translate-x-full': isMobile && isSidebarCollapsed
        }"
      >
        <!-- ============================================= -->
        <!-- HEADER FIXO (Topo) -->
        <div
          class="pt-4 pb-3 border-b border-primary-700 relative flex items-center justify-center flex-none"
        >
          @if (!isSidebarCollapsed) {
          <div
            class="relative flex items-center h-8 overflow-hidden"
            [ngClass]="{
              'flex-grow': !isSidebarCollapsed && !isMobile,
              'justify-center w-full': isSidebarCollapsed || isMobile
            }"
          >
            <!-- Título COMPLETO (Visível quando NÃO colapsado) -->
            <span
              class="text-2xl font-bold whitespace-nowrap transition-all duration-300"
              [ngClass]="{
                'w-0 opacity-0': isSidebarCollapsed,
                'w-auto opacity-100': !isSidebarCollapsed
              }"
            >
              Travel Manager
            </span>

            <!-- 'T' Ícone (Visível quando colapsado) 
            <span
              class="text-2xl font-bold transition-opacity duration-300 absolute"
              [ngClass]="{
                'opacity-100 left-1/2 transform -translate-x-1/2': isSidebarCollapsed,
                'opacity-0 pointer-events-none': !isSidebarCollapsed
              }"
            >
              T
            </span>
            -->
          </div>
          }

          <!-- Botão Toggle: SÓ APARECE NO DESKTOP -->
          @if (!isMobile) {
          <button
            (click)="toggleSidebar()"
            class="p-2 rounded-lg hover:bg-primary-700 transition duration-150 flex-shrink-0 flex-none"
            title="Expandir/Recolher Menu"
          >
            <!-- Ícone dinâmico: Seta para esquerda (recolher) ou direita (expandir) -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                [attr.d]="isSidebarCollapsed ? 'M13 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'"
              />
            </svg>
          </button>
          }
        </div>
        <!-- ============================================= -->

        <!-- LINKS DE NAVEGAÇÃO - Área de Rolagem Exclusiva -->
        <div class="flex flex-col space-y-2 flex-grow overflow-y-auto overflow-x-hidden pt-4 pb-4">
          <!-- Link: Dashboard -->
          <a
            [routerLink]="['/app/dashboard']"
            routerLinkActive="bg-primary-700 font-semibold"
            class="flex items-center p-3 rounded-lg hover:bg-primary-700 transition duration-150"
            [ngClass]="{
              'justify-center': isSidebarCollapsed,
              'justify-start': !isSidebarCollapsed
            }"
            (click)="isMobile && hideSidebar()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 001 1h3m-6-6v6a1 1 0 001 1h2a1 1 0 001-1v-6m-3 0h-2"
              />
            </svg>
            <span
              class="whitespace-nowrap transition-all duration-300"
              [ngClass]="{
                'w-0 opacity-0 ml-0': isSidebarCollapsed,
                'w-auto opacity-100 ml-3': !isSidebarCollapsed
              }"
            >
              Dashboard
            </span>
          </a>

          <!-- Link: Veículos -->
          <a
            [routerLink]="['/app/vehicles']"
            routerLinkActive="bg-primary-700 font-semibold"
            class="flex items-center p-3 rounded-lg hover:bg-primary-700 transition duration-150"
            [ngClass]="{
              'justify-center': isSidebarCollapsed,
              'justify-start': !isSidebarCollapsed
            }"
            (click)="isMobile && hideSidebar()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            <span
              class="whitespace-nowrap transition-all duration-300"
              [ngClass]="{
                'w-0 opacity-0 ml-0': isSidebarCollapsed,
                'w-auto opacity-100 ml-3': !isSidebarCollapsed
              }"
            >
              Veículos
            </span>
          </a>

          <a
            [routerLink]="['/app/drivers']"
            routerLinkActive="bg-primary-700 font-semibold"
            class="flex items-center p-3 rounded-lg hover:bg-primary-700 transition duration-150"
            [ngClass]="{
              'justify-center': isSidebarCollapsed,
              'justify-start': !isSidebarCollapsed
            }"
            (click)="isMobile && hideSidebar()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-life-buoy-icon lucide-life-buoy"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m4.93 4.93 4.24 4.24" />
              <path d="m14.83 9.17 4.24-4.24" />
              <path d="m14.83 14.83 4.24 4.24" />
              <path d="m9.17 14.83-4.24 4.24" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            <span
              class="whitespace-nowrap transition-all duration-300"
              [ngClass]="{
                'w-0 opacity-0 ml-0': isSidebarCollapsed,
                'w-auto opacity-100 ml-3': !isSidebarCollapsed
              }"
            >
              Motoristas
            </span>
          </a>
        </div>
        <!-- Fim dos Links de Navegação (Scrollable Area) -->

        <!-- BOTÃO DE LOGOUT (Fixo na base da Sidebar) -->
        <div class="pt-4 pb-4 border-t border-primary-700 flex-none">
          <button
            (click)="logout()"
            class="w-full flex items-center p-3 rounded-lg text-red-300 hover:bg-primary-700 hover:text-white transition duration-150"
            [ngClass]="{
              'justify-center': isSidebarCollapsed,
              'justify-start': !isSidebarCollapsed
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span
              class="whitespace-nowrap transition-all duration-300"
              [ngClass]="{
                'w-0 opacity-0 ml-0': isSidebarCollapsed,
                'w-auto opacity-100 ml-3': !isSidebarCollapsed
              }"
            >
              Sair
            </span>
          </button>
        </div>
      </nav>

      <!-- 2. Overlay para Mobile (Cobre o conteúdo quando a Sidebar está aberta) -->
      @if(isMobile && !isSidebarCollapsed) {
      <div
        (click)="hideSidebar()"
        class="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
      ></div>
      }

      <!-- 3. Conteúdo Principal (NÃO é mais empurrado no Mobile) -->
      <main
        class="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ease-in-out"
        (mousemove)="resetTimerOnInteraction()"
        (touchstart)="resetTimerOnInteraction()"
      >
        <!-- HEADER DO CONTEÚDO (Fixo no Topo) -->
        <header
          np
          class="bg-white shadow-xl mb-[1px] p-4 flex justify-between items-center flex-none"
        >
          <!-- Botão de Menu Hamburger: SÓ APARECE NO MOBILE, serve como TOGGLE (aciona a abertura e fechamento) -->
          @if(isMobile) {
          <button
            (click)="toggleSidebar()"
            class="mr-4 p-2 rounded-lg hover:bg-gray-200 transition duration-150 flex-shrink-0 flex-none"
            title="Abrir/Fechar Menu"
          >
            <!-- Ícone Hamburger (sempre visível no mobile header para acionar o toggle) -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          }

          <h2 class="text-xl font-semibold text-gray-800 flex-grow">Bem-vindo(a) de volta!</h2>
          <div class="flex items-center space-x-3 flex-shrink-0">
            <span class="text-gray-600 text-sm">Usuário: Admin</span>
            <div
              class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-primary-900 font-bold"
            >
              A
            </div>
          </div>
        </header>

        <!-- ÁREA DE CONTEÚDO (Scrollável) -->
        <div class="py-2 px-3 flex-grow overflow-y-auto">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  imports: [RouterOutlet, RouterModule, CommonModule],
})
export class AuthenticatedLayoutComponent implements OnDestroy {
  private router = inject(Router);

  // O estado 'collapsed' (recolhido/true) é usado para ocultar o menu no mobile e desktop
  isSidebarCollapsed: boolean = false;
  isMobile: boolean = false;

  private hideTimer: any;
  private readonly mobileBreakpoint = 768; // breakpoint 'md' do Tailwind
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Inicializa o estado de responsividade após o componente ter sido montado no cliente
    if (this.isBrowser) {
      // Roda o onResize logo após a inicialização para definir o estado inicial (mobile fechado, desktop aberto)
      setTimeout(() => this.onResize(), 0);
    }
  }

  ngOnDestroy(): void {
    this.clearHideTimer(); // Limpa o timer ao destruir o componente
  }

  /**
   * Reseta o timer em interações no conteúdo principal (mobile).
   * O HostListener no <main> captura mousemove e touchstart.
   */
  resetTimerOnInteraction() {
    // Só faz sentido no mobile quando o menu está aberto
    if (this.isMobile && !this.isSidebarCollapsed) {
      this.clearHideTimer();
      this.startHideTimer();
    }
  }

  // Listener para o evento de resize da janela (responsividade)
  @HostListener('window:resize')
  onResize() {
    // Garante que o código só é executado no browser
    if (!this.isBrowser) return;

    const newIsMobile = window.innerWidth < this.mobileBreakpoint;

    // Só processa a mudança se o estado de mobile realmente mudou
    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;

      if (this.isMobile) {
        // Mobile: Força o estado 'oculto' (true) ao entrar na visualização mobile
        this.isSidebarCollapsed = true;
        this.clearHideTimer();
      } else {
        // Desktop: Força o estado 'expandido' (false) ao entrar na visualização desktop
        this.isSidebarCollapsed = false;
        this.clearHideTimer();
      }
    }
  }

  /**
   * Mobile only: Inicia o timer de 5 segundos para auto-ocultação.
   */
  startHideTimer() {
    if (!this.isMobile) return;
    this.clearHideTimer();

    this.hideTimer = setTimeout(() => {
      this.isSidebarCollapsed = true; // Oculta o menu
      console.log('Sidebar hidden automatically after 5 seconds of inactivity.');
    }, 5000); // 5 segundos
  }

  clearHideTimer() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;

    if (this.isMobile) {
      if (!this.isSidebarCollapsed) {
        this.startHideTimer();
      } else {
        this.clearHideTimer();
      }
    }
  }

  /**
   * Método auxiliar para fechar a sidebar (usado ao clicar no overlay ou em um link).
   */
  hideSidebar() {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
      this.clearHideTimer();
    }
  }

  logout() {
    console.log('Logout simulado.');
    // Garantir que a sidebar se feche ao sair
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
    this.router.navigate(['/public/login']);
  }
}
