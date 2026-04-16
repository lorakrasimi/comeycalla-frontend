import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Mis recetas', path: '/recipes', icon: 'menu_book' },
    { label: 'Añadir receta', path: '/recipes/new', icon: 'add_circle' },
    { label: 'Menú semanal', path: '/meal-plan', icon: 'calendar_month' },
  ];
}
