import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from '../../../core/models/recipe.model';

export interface CreateRecipePayload {
  title: string;
  description: string;
  cookingTime: string;
  servings: number;
  imageUrl: string | null;

  category: string | null;
  tags: string[];

  ingredients: {
    name: string;
  }[];

  steps: {
    order: number;
    description: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipesApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/recipes';

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  createRecipe(payload: CreateRecipePayload) {
    return this.http.post(this.baseUrl, payload);
  }

  updateRecipe(id: string, payload: Partial<CreateRecipePayload>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/${id}`, payload);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
