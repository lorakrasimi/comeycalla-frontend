import {Component, ElementRef, input, viewChild} from '@angular/core';
import {RecipeCard} from '../../../recipes/components/recipe-card/recipe-card';
import {Recipe} from '../../../../core/models/recipe.model';

@Component({
  selector: 'app-recent-recipes-carousel',
  standalone: true,
  imports: [RecipeCard, RecipeCard],
  templateUrl: './recent-recipes-carousel.html',
  styleUrl: './recent-recipes-carousel.scss',
})
export class RecentRecipesCarousel {
  readonly recipes = input.required<Recipe[]>();

  protected readonly viewport =
    viewChild<ElementRef<HTMLDivElement>>('viewport');

  protected scrollLeft(): void {
    const element = this.viewport()?.nativeElement;

    if (!element) {
      return;
    }

    element.scrollBy({
      left: -264,
      behavior: 'smooth',
    });
  }

  protected scrollRight(): void {
    const element = this.viewport()?.nativeElement;

    if (!element) {
      return;
    }

    element.scrollBy({
      left: 264,
      behavior: 'smooth',
    });
  }
}
