import {Component} from '@angular/core';
import {FeaturedRecipeCard} from '../../components/featured-recipe-card/featured-recipe-card';
import {RecentRecipesCarousel} from '../../components/recent-recipes-grid/recent-recipes-carousel';
import {Recipe} from '../../../../core/models/recipe.model';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    FeaturedRecipeCard,
    RecentRecipesCarousel
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {

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

  protected recentRecipes(): Recipe[] {
    return [
      new Recipe(
        1,
        'Tortilla de patatas',
        ['patatas', 'huevos', 'cebolla', 'sal'],
        ['Pelar patatas', 'Freír', 'Batir huevos', 'Mezclar y cocinar'],
        "30",
        4,
        'easy',
        'italiana',
        new Date(),
        'Receta clásica española',
        '/img/tortilla.jpg'
      ),
      new Recipe(
        2,
        'Pasta carbonara',
        ['pasta', 'huevo', 'queso', 'guanciale', 'pimienta'],
        ['Cocer pasta', 'Preparar salsa', 'Mezclar'],
        "25",
        2,
        'medium',
        'italiana',
        new Date(),
        'Carbonara auténtica',
        '/img/carbonara.jpg'
      ),
      new Recipe(
        3,
        'Ensalada César',
        ['lechuga', 'pollo', 'crutones', 'queso', 'salsa césar'],
        ['Cortar ingredientes', 'Mezclar', 'Servir'],
        "15",
        2,
        'easy',
        'italiana',
        new Date(),
        'Ligera y rápida',
        '/img/cesar.jpg'
      ),
      new Recipe(
        4,
        'Paella',
        ['arroz', 'pollo', 'marisco', 'azafrán', 'caldo'],
        ['Sofrito', 'Añadir arroz', 'Cocer'],
        "50",
        6,
        'hard',
        'italiana',
        new Date(),
        'Plato tradicional',
        '/img/paella.jpg'
      )
    ];
  }

}
