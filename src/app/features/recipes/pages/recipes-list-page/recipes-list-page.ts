import { Component, signal } from '@angular/core';
import { RecipeCard } from '../../components/recipe-card/recipe-card';
import { RecipeFilters } from '../../components/recipe-filters/recipe-filters';
import {Recipe} from '../../../../core/models/recipe.model';
import {UiPageHeader} from '../../../../shared/ui/ui-page-header/ui-page-header';

@Component({
  selector: 'app-recipes-list-page',
  standalone: true,
  imports: [RecipeCard, RecipeFilters, UiPageHeader],
  templateUrl: './recipes-list-page.html',
  styleUrl: './recipes-list-page.scss',
})
export class RecipesListPage {
  protected readonly recipes = signal<Recipe[]>([
    new Recipe(
      1,
      'Ramen Japonés Casero',
      ['Fideos ramen', 'Caldo de cerdo', 'Huevo marinado', 'Cebollín', 'Alga nori'],
      ['Preparar el caldo a fuego lento', 'Cocer los fideos', 'Armar el bowl con los toppings'],
      '45 min',
      2,
      'hard',
      'Asiática',
      new Date(),
      'Un reconfortante bowl de ramen con sabores auténticos de Japón.',
      '/img/ramen.jpg',
      ['japonés', 'sopa', 'caliente']
    ),

    new Recipe(
      2,
      'Pizza Margherita Napolitana',
      ['Masa de pizza', 'Tomate San Marzano', 'Mozzarella de búfala', 'Albahaca fresca', 'Aceite de oliva'],
      ['Extender la masa', 'Añadir los ingredientes', 'Hornear a alta temperatura durante 90 segundos'],
      '30 min',
      1,
      'medium',
      'Italiana',
      new Date(),
      'La clásica pizza italiana con los colores de la bandera.',
      '/img/pizza.jpg',
      ['italiana', 'horno', 'clásica']
    ),

    new Recipe(
      3,
      'Pollo a la Parrilla con Vegetales',
      ['Pechuga de pollo', 'Calabacín', 'Pimiento rojo', 'Brócoli', 'Especias'],
      ['Marinar el pollo', 'Cortar vegetales', 'Cocinar todo a la parrilla hasta dorar'],
      '35 min',
      2,
      'easy',
      'Saludable',
      new Date(),
      'Una opción ligera y nutritiva para cualquier día de la semana.',
      '/img/pollo.jpg'
    ),

    new Recipe(
      4,
      'Smoothie Bowl Tropical',
      ['Mango congelado', 'Plátano', 'Leche de coco', 'Granola', 'Semillas de chía'],
      ['Licuar las frutas con la leche', 'Servir en un bowl', 'Decorar con toppings'],
      '10 min',
      1,
      'easy',
      'Desayuno',
      new Date(),
      'Comienza tu mañana con energía y frescura tropical.',
      '/img/bowl-frutas.png',
      ['vegano', 'rápido', 'fruta']
    ),

    new Recipe(
      5,
      'Sushi Rolls Variados',
      ['Arroz para sushi', 'Vinagre de arroz', 'Salmón fresco', 'Aguacate', 'Alga nori'],
      ['Preparar el arroz', 'Extender sobre el alga', 'Enrollar con el mat de bambú y cortar'],
      '50 min',
      3,
      'hard',
      'Asiática',
      new Date(),
      'Selección de rolls maki y uramaki hechos a mano.',
      '/img/sushi.jpg',
      ['japonés', 'arroz', 'mar']
    ),

    new Recipe(
      6,
      'Burger Gourmet Completa',
      ['Carne de res 100%', 'Pan brioche', 'Queso cheddar', 'Bacon crujiente', 'Cebolla caramelizada'],
      ['Cocinar la carne al punto', 'Tostar el pan', 'Montar las capas con las salsas'],
      '25 min',
      1,
      'medium',
      'Americana',
      new Date(),
      'Una hamburguesa jugosa con ingredientes de alta calidad.',
      '/img/burger.jpg'
    )
  ]);
}
