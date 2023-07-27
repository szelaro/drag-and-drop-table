import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app.module';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, AppModule],
  template: `
    <app-drag-and-drop-table></app-drag-and-drop-table>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
