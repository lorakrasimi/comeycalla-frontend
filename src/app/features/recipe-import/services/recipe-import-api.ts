import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import {ExtractedRecipe} from '../../../core/models/recipe-import.model';

@Injectable({ providedIn: 'root' })
export class RecipeImportApi {
  extractRecipeFromImage(file: File): Observable<ExtractedRecipe> {
    console.log('Processing file:', file.name);

    return of({
      title: 'Pasta carbonara clásica',
      description: 'La carbonara tal y como la hace la nonna',
      cookingTime: '30',
      servings: 4,
      category: 'Italiana',
      tags: ['pasta', 'italiana', 'rápida', 'tradicional'],
      ingredients: [
        '400g de pasta',
        '200g de panceta o guanciale',
        '4 huevos',
      ],
      steps: [
        'Cocinar la pasta en abundante agua con sal según las instrucciones del paquete',
        'Mientras tanto, cortar la panceta en cubos pequeños y dorar en una sartén sin aceite',
        'Batir los huevos con el queso parmesano rallado en un bol',
      ],
    }).pipe(delay(2500));
  }
}
