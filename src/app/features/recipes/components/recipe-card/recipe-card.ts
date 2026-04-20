import {Component, Input} from '@angular/core';
import {UiChip} from '../../../../shared/ui/ui-chip/ui-chip';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  imports: [
    UiChip,
    UiButton
  ]
})
export class RecipeCard {
  @Input() title: string = '';
  @Input() img?: string;
  @Input() category: string = '';
  @Input() time: string = '';

  @Input() description: string = '';
  @Input() servings: number = 0;
  @Input() tags: string[] = [];
  @Input()  showTags = true;

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

}
