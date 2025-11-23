import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-public-layout',
  template: `
    <!-- ESTE é o SEGUNDO router-outlet, ele carrega LandingPage ou Login -->
    <router-outlet></router-outlet>
  `,
  styles: [
    `:host { display: block; height: 100%; width: 100%; }`
  ],
  imports: [RouterOutlet]
})
export class PublicLayoutComponent {}