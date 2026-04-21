import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-add-recipe-page',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './add-recipe-page.html',
  styleUrl: './add-recipe-page.scss',
})
export class AddRecipePage {}
