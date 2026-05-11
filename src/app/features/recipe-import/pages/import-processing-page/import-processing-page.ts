import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProcessingSteps} from '../../components/processing-steps/processing-steps';
import {RecipeImportApi} from '../../services/recipe-import-api';
import {RecipeImportStore} from '../../services/recipe-import-store';

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
      this.router.navigate(['/recipes/create/image']);
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
        this.router.navigate(['/recipes/create/image/review']);
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
        this.router.navigate(['/recipes/create/image/review']);
      },
      error: () => {
        this.importStore.setError('No se pudo procesar la receta.');
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/recipes/create/image']);
  }

  onRetry(): void {
    this.router.navigate(['/recipes/create/image']);
  }
}
