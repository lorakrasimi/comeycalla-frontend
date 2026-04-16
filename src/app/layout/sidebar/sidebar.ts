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
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Mis recetas', path: '/recipes' },
    { label: 'Añadir receta', path: '/recipes/new' },
    { label: 'Menú semanal', path: '/meal-plan' },
  ];
}
