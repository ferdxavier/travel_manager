import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  // O template agora contém APENAS o router-outlet.
  // Isso garante que apenas o conteúdo da rota ativa seja exibido.
  template: `
    <router-outlet></router-outlet>
  `,
  // Removendo ou limpando quaisquer estilos padrão que possam afetar o layout.
  styles: [
    `
    /* Garante que o corpo do aplicativo ocupe 100% da altura da tela */
    :host {
      display: block;
      height: 100vh;
      width: 100%;
    }
    `
  ],
  imports: [RouterOutlet] // Importa o módulo necessário para o roteamento
})
export class AppComponent {
  title = 'Projeto SaaS Escalável';
}