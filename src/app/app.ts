import { Component, signal } from '@angular/core';
// 1. Import RouterLink and RouterLinkActive from @angular/router
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Add RouterLink and RouterLinkActive to the imports array
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tourtheworld');
}