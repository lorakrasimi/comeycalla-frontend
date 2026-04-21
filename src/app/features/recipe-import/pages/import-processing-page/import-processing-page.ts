import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ProcessingSteps } from '../../components/processing-steps/processing-steps';
import { RecipeImportApi } from '../../services/recipe-import-api';
import { RecipeImportStore } from '../../services/recipe-import-store';

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
  private readonly router = inject(Router);
  private readonly recipeImportApi = inject(RecipeImportApi);
  readonly importStore = inject(RecipeImportStore);

  ngOnInit(): void {
    const file = this.importStore.file();

    if (!file) {
      this.router.navigate(['/recipes/create/image']);
      return;
    }

    this.importStore.setProcessing();

    this.recipeImportApi
      .extractRecipeFromImage(file)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (recipe) => {
          this.importStore.setExtractedRecipe(recipe);
          this.router.navigate(['/recipes/create/image/review']);
        },
        error: () => {
          this.importStore.setError('No se pudo procesar la imagen.');
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
