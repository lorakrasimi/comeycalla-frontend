import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Recipe, RecipeResponse} from '../../../core/models/recipe.model';
import {RecipeFiltersModel} from '../../../core/models/recipe-filters.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/recipes';

  getRecipes(page = 0, size = 12, filters?: RecipeFiltersModel) {
    const params: Record<string, string | number> = {
      page,
      size,
    };

    if (filters?.search) {
      params['search'] = filters.search;
    }

    if (filters?.category) {
      params['category'] = filters.category;
    }

    if (filters?.maxTime) {
      params['maxTime'] = Number(filters.maxTime);
    }

    return this.http.get<any>(this.baseUrl, { params });
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<Recipe>(this.baseUrl + "/" + id);
  }

  createRecipe(form: FormData): Observable<RecipeResponse> {
    return this.http.post<RecipeResponse>(this.baseUrl + "/new", form);
  }

  updateRecipe(id: number, form: FormData): Observable<RecipeResponse> {
    return this.http.put<RecipeResponse>(`${this.baseUrl}/${id}`, form);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getLastRecipes(){
    return this.http.get<Recipe[]>(this.baseUrl + '/last-recipes');
  }

  getRandomRecipe(){
    return this.http.get<Recipe>(this.baseUrl + '/random-recipe');
  }

  getCategories() {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }
}
