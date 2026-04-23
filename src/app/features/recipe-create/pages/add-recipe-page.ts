import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UiPageHeader} from '../../../shared/ui/ui-page-header/ui-page-header';

@Component({
  selector: 'app-add-recipe-page',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    UiPageHeader
  ],
  templateUrl: './add-recipe-page.html',
  styleUrl: './add-recipe-page.scss',
})
export class AddRecipePage {}
