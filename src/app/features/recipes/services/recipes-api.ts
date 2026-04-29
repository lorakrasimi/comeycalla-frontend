import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Recipe, RecipeRequest, RecipeResponse} from '../../../core/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/recipes';

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<Recipe>(this.baseUrl + "/" + id);
  }

  createRecipe(payload: RecipeRequest): Observable<RecipeResponse> {
    return this.http.post<RecipeResponse>(this.baseUrl + "/new", payload);
  }

  updateRecipe(id: number, payload: RecipeRequest): Observable<RecipeResponse> {
    return this.http.put<RecipeResponse>(`${this.baseUrl}/${id}`, payload);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getLastRecipes(){
    return this.http.get<Recipe[]>(this.baseUrl + '/last-recipes');
  }
}
