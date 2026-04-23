import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {delay, Observable, of} from 'rxjs';

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

  getRecipeById(id: number): Observable<any> {
    const mock = {
      id,
      name: 'Pasta Carbonara Clásica',
      description: 'Una deliciosa receta italiana tradicional...',
      time: 30,
      img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
      nationality: 'Italiana',
      ingredients: [
        { name: '400g de pasta' },
        { name: '200g de panceta' },
        { name: '4 huevos' }
      ],
      steps: [
        { description: 'Hervir agua' },
        { description: 'Cocinar pasta' },
        { description: 'Mezclar todo' }
      ]
    };

    return of(mock).pipe(delay(500));
  }

  //TODO usar cuando esté el backend
//  getRecipeById(id: number): Observable<Recipe> {
//    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
//  }
//
  createRecipe(payload: CreateRecipePayload) {
    return this.http.post(this.baseUrl, payload);
  }

  updateRecipe(id: number, payload: any, imageFile: File | null): Observable<any> {
    if (imageFile) {
      const formData = new FormData();
      formData.append('recipe', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
      formData.append('image', imageFile);

      return this.http.put(`${this.baseUrl}/${id}`, formData);
    }

    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
