import {Component, Input} from '@angular/core';
import {UiChip} from '../../../../shared/ui/ui-chip/ui-chip';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  imports: [
    UiChip
  ]
})
export class RecipeCard {
  @Input() title: string = '';
  @Input() img?: string;
  @Input() category: string = '';
  @Input() time: string = '';
}
