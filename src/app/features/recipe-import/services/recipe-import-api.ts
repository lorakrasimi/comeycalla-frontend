import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ExtractedRecipe, RecipeImportImage} from '../../../core/models/recipe-import.model';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class RecipeImportApi {
  private readonly apiUrl = 'http://localhost:8080/api/recipes';

  constructor(private http: HttpClient) {
  }

  extractRecipeFromImages(images: RecipeImportImage[]): Observable<ExtractedRecipe> {
    const formData = new FormData();

    if (images.length > 1) {
      images.forEach((image) => {
        formData.append('images', image.file);
        formData.append('sections', image.section);
      });
    } else {
      formData.append('images', images[0].file);
    }

    return this.http.post<ExtractedRecipe>(
      `${this.apiUrl}/scan`,
      formData
    );
  }
}
