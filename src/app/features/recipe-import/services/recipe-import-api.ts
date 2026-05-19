import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ExtractedRecipe, RecipeImportImage} from '../../../core/models/recipe-import.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class RecipeImportApi {
  private readonly apiUrl = `${environment.apiUrl}/recipes`;

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

  extractRecipeFromUrl(url: string) {
    return this.http.post<ExtractedRecipe>(
      `${this.apiUrl}/import-url`,
      { url }
    );
  }
}
