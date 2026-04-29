import {Component, signal} from '@angular/core';
import {RecipeCard} from '../../components/recipe-card/recipe-card';
import {RecipeFilters} from '../../components/recipe-filters/recipe-filters';
import {Recipe} from '../../../../core/models/recipe.model';
import {UiPageHeader} from '../../../../shared/ui/ui-page-header/ui-page-header';
import {RecipesApi} from '../../services/recipes-api';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-recipes-list-page',
  standalone: true,
  imports: [RecipeCard, RecipeFilters, UiPageHeader, UiButton],
  templateUrl: './recipes-list-page.html',
  styleUrl: './recipes-list-page.scss',
})
export class RecipesListPage {
  recipes = signal<Recipe[]>([]);
  page = signal(0);
  totalPages = signal(0);

  constructor(private recipesApi: RecipesApi) {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipesApi.getRecipes(this.page(), 12).subscribe((res) => {
      this.recipes.set(res.content);
      this.totalPages.set(res.totalPages);
    });
  }

  nextPage() {
    if (this.page() < this.totalPages() - 1) {
      this.page.update(p => p + 1);
      this.loadRecipes();
    }
  }

  prevPage() {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
      this.loadRecipes();
    }
  }
}
