import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-trips',
  template: `
    <div class="p-6 bg-white rounded-xl shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Minhas Viagens</h1>
      <p class="text-gray-600">Esta será a tela de gerenciamento de viagens. Ainda em desenvolvimento.</p>
      
      <div class="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        <p class="font-semibold">Status:</p>
        <p>A rota está configurada e protegida, mas a funcionalidade de listagem e criação de viagens ainda precisa ser implementada.</p>
      </div>
    </div>
  `,
  styles: [],
  imports: []
})
export class TripsComponent {}