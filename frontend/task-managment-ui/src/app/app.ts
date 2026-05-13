import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <h1>Task Management App</h1>
      <p>Frontend scaffold ready.</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      font-family: Arial, sans-serif;
    }

    h1 {
      margin-bottom: 8px;
    }
  `]
})
export class App {
}