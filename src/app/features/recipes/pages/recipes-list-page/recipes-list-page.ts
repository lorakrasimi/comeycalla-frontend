import {Component, signal} from '@angular/core';
import {RecipeCard} from '../../components/recipe-card/recipe-card';
import {RecipeFilters} from '../../components/recipe-filters/recipe-filters';
import {Recipe} from '../../../../core/models/recipe.model';
import {UiPageHeader} from '../../../../shared/ui/ui-page-header/ui-page-header';
import {RecipesApi} from '../../services/recipes-api';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {RecipeFiltersModel} from '../../../../core/models/recipe-filters.model';
import {ActivatedRoute} from '@angular/router';

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
  filters = signal<RecipeFiltersModel>({
    search: '',
    category: '',
    maxTime: '',
  });

  constructor(private recipesApi: RecipesApi, private activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe((params) => {
      const search = params['search'] ?? '';

      this.filters.set({
        ...this.filters(),
        search,
      });

      this.page.set(0);
      this.loadRecipes();
    });
  }

  onFiltersChange(filters: RecipeFiltersModel): void {
    this.filters.set(filters);
    this.page.set(0);
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipesApi.getRecipes(this.page(), 12, this.filters()).subscribe((res) => {
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
