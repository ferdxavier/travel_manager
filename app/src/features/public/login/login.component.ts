import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Adicionado para Forms e ngModel

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Acesso ao Sistema</h2>
        <p class="text-center text-gray-500 mb-8">Faça login para continuar na área autenticada.</p>
        
        <form (ngSubmit)="login()">
          <!-- Campo Email -->
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="seu.email@exemplo.com"
              [(ngModel)]="email" 
              name="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <!-- Campo Senha -->
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-medium mb-2">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="********"
              [(ngModel)]="password"
              name="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <!-- Botão de Login -->
          <button 
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Entrar
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Não tem uma conta? 
          <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Crie sua conta aqui.</a>
        </p>
      </div>
    </div>
  `,
  styles: ``,
  // Importante: Adicionar FormsModule para habilitar [(ngModel)] e (ngSubmit) seguro
  imports: [FormsModule] 
})
export class LoginComponent {
  private router = inject(Router);

  // Propriedades para vincular aos inputs
  email: string = '';
  password: string = '';

  login() {
    console.log(`Tentativa de login com Email: ${this.email} e Senha: ${this.password}`);
    
    // Simulação: Redirecionamos para a área autenticada (/app)
    console.log('Login simulado realizado! Redirecionando para a área logada...');
    this.router.navigate(['/app']);
  }
}