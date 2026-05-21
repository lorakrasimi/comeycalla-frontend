import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProcessingSteps} from '../../components/processing-steps/processing-steps';
import {RecipeImportApi} from '../../services/recipe-import-api';
import {RecipeImportStore} from '../../services/recipe-import-store';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-import-processing-page',
  standalone: true,
  imports: [
    ProcessingSteps
  ],
  templateUrl: './import-processing-page.html',
  styleUrl: './import-processing-page.scss',
})
export class ImportProcessingPage implements OnInit {

  constructor(
    private router: Router,
    private recipeImportApi: RecipeImportApi,
    protected importStore: RecipeImportStore
  ) {
  }

  ngOnInit(): void {
    const recipeUrl = this.importStore.recipeUrl();
    const images = this.importStore.images();

    if (!recipeUrl && images.length === 0) {
      this.router.navigate(['/create-recipe/import']);
      return;
    }

    this.importStore.setProcessing();

    if (recipeUrl) {
      this.processRecipeFromUrl(recipeUrl);
      return;
    }

    this.processRecipeFromImages(images);
  }

  private processRecipeFromUrl(url: string): void {
    this.recipeImportApi.extractRecipeFromUrl(url).subscribe({
      next: (recipe) => {
        this.importStore.setExtractedRecipe(recipe);
        this.router.navigate(['/create-recipe/import/review']);
      },
      error: () => {
        this.importStore.setError('No se pudo importar la receta desde esta URL.');
      },
    });
  }

  private processRecipeFromImages(images: ReturnType<RecipeImportStore['images']>): void {
    this.recipeImportApi.extractRecipeFromImages(images).subscribe({
      next: (recipe) => {
        this.importStore.setExtractedRecipe(recipe);
        this.router.navigate(['/create-recipe/import/review']);
      },
      error: (error: HttpErrorResponse) => {
        const message =
          error.error?.message ||
          error.error?.error ||
          error.message ||
          'No se pudo procesar la receta.';

        this.importStore.setError(message);
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/create-recipe/import']);
  }

  onRetry(): void {
    this.router.navigate(['/create-recipe/import']);
  }
}
