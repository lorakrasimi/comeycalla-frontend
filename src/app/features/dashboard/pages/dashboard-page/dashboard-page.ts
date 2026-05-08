import {Component, OnInit, signal} from '@angular/core';
import {FeaturedRecipeCard} from '../../components/featured-recipe-card/featured-recipe-card';
import {RecentRecipesCarousel} from '../../components/recent-recipes-grid/recent-recipes-carousel';
import {Recipe} from '../../../../core/models/recipe.model';
import {RecipesApi} from '../../../recipes/services/recipes-api';
import {UiEmptyState} from '../../../../shared/ui/ui-empty-state/ui-empty-state';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    FeaturedRecipeCard,
    RecentRecipesCarousel,
    UiEmptyState
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  recipes = signal<Recipe[]>([]);
  featuredRecipe?: Recipe;

  constructor(private recipesApi: RecipesApi) {}

  ngOnInit(): void {
    this.getRandomRecipe();
    this.getLastRecipes();
  }

  private getRandomRecipe(): void {
    this.recipesApi.getRandomRecipe().subscribe({
      next: (recipe) => {
        this.featuredRecipe = recipe;
      },
      error: (error) => {
        console.error(error);
        this.featuredRecipe = undefined;
      }
    });
  }

  private getLastRecipes(): void {
    this.recipesApi.getLastRecipes().subscribe({
      next: (recipes) => {
        this.recipes.set(recipes);
      },
      error: (error) => {
        console.error(error);
        this.recipes.set([]);
      }
    });
  }
}
