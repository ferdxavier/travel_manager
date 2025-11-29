import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertStatus = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-feedback-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (status !== 'idle') {
      <div 
        class="mt-6 p-4 rounded-lg"
        [ngClass]="{
          'bg-green-100 border border-green-400 text-green-700': status === 'success',
          'bg-red-100 border border-red-400 text-red-700': status === 'error'
        }"
      >
        <div class="flex items-center">
          @if (status === 'success') {
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-8.99"/><path d="M12 2v10"/><path d="M17 5l-2.1-2.1"/></svg>
          } @else if (status === 'error') {
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
          }
          <p class="text-sm font-medium">
            {{ message }}
          </p>
        </div>
      </div>
    }
  `,
})
export class FeedbackAlertComponent {
  @Input() status: AlertStatus = 'idle';
  @Input() message!: string;
}