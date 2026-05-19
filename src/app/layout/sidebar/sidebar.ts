import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly navItems: {
    label: string;
    path: string;
    icon: string;
    exact: boolean;
  }[] = [
    {label: 'Dashboard', path: '/dashboard', icon: 'dashboard', exact: true},
    {label: 'Mis recetas', path: '/recipes', icon: 'menu_book', exact: false},
    {label: 'Añadir receta', path: '/create-recipe', icon: 'add_circle', exact: false },
    {label: 'Menú semanal', path: '/meal-plan', icon: 'calendar_month', exact: false},
  ];
}
