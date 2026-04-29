import {Component, OnInit, signal} from '@angular/core';
import {FeaturedRecipeCard} from '../../components/featured-recipe-card/featured-recipe-card';
import {RecentRecipesCarousel} from '../../components/recent-recipes-grid/recent-recipes-carousel';
import {Recipe} from '../../../../core/models/recipe.model';
import {RecipesApi} from '../../../recipes/services/recipes-api';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    FeaturedRecipeCard,
    RecentRecipesCarousel
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  recipes = signal<Recipe[]>([]);

  constructor(private recipesApi: RecipesApi) {
  }

  ngOnInit(): void {
    this.recipesApi.getLastRecipes().subscribe({
      next: (recipes) => {
        console.log(recipes);
        this.recipes.set(recipes);
      },
      error: (error) => {
        console.error(error);
        this.recipes.set([]);
      }
    });
  }

  protected featuredRecipe(): Recipe {
    return new Recipe(
      1,
      'Bowl de frutas con yogurt',
      ['yogurt', 'frutas rojas', 'platano', 'canela'],
      [
        'Echar el yogur',
        'Echar las frutas cortadas',
        'Echar la canela',
        'Mezclar y cocinar'
      ],
      "10",
      1,
      'easy',
      'italiana',
      new Date(),
      'Receta clásica española',
      '/img/bowl-frutas.png'
    );
  }


}
