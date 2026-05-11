import { Component } from '@angular/core';
import {UiButton} from '../ui-button/ui-button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'ui-empty-state',
  imports: [
    UiButton,
    RouterLink
  ],
  templateUrl: './ui-empty-state.html',
  styleUrl: './ui-empty-state.scss',
})
export class UiEmptyState {}
