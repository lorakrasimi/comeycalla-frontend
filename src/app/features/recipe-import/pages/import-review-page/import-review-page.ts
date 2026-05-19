import {Component, OnInit, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router} from '@angular/router';

import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {RecipeImportStore} from '../../services/recipe-import-store';
import {RecipesApi} from '../../../recipes/services/recipes-api';
import {RecipeFormComponent} from '../../../recipes/components/recipe-form/recipe-form';
import {Difficulty} from '../../../../core/models/recipe.model';
import {RecipeFormMapper} from '../../../recipes/services/recipe-form-mapper';
import {ExtractedRecipe} from '../../../../core/models/recipe-import.model';

@Component({
  selector: 'app-import-review-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButton, RecipeFormComponent],
  templateUrl: './import-review-page.html',
  styleUrl: './import-review-page.scss',
})
export class ImportReviewPage implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly imagePreviewUrls = signal<string[]>([]);
  readonly selectedImage = signal<File | null>(null);
  private extractedRecipe: ExtractedRecipe | null = null;

  constructor(
    private router: Router,
    protected importStore: RecipeImportStore,
    private recipesApi: RecipesApi,
    private recipeFormMapper: RecipeFormMapper
  ) {
  }

  readonly form = this.fb.group({
    title: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: this.fb.control<string | null>(null),
    cookingTime: this.fb.control<number | null>(null),
    servings: this.fb.control<number | null>(null),
    category: this.fb.control<string>('', {nonNullable: true}),
    difficulty: this.fb.control<string | null>(null),
    tags: this.fb.control<string[]>([], {nonNullable: true}),
    ingredients: this.fb.array<FormGroup>([]),
    steps: this.fb.array<FormGroup>([]),
  });

  ngOnInit(): void {

    this.extractedRecipe = this.importStore.extractedRecipe();
    if (!this.extractedRecipe) {
      this.router.navigate(['/recipes/create/import']);
      return;
    }

    this.setInitialImagePreview(this.extractedRecipe.img);
    this.fillForm();
  }

  get ingredients(): FormArray<FormGroup> {
    return this.form.get('ingredients') as FormArray<FormGroup>;
  }

  get steps(): FormArray<FormGroup> {
    return this.form.get('steps') as FormArray<FormGroup>;
  }

  onProcessAgain(): void {
    this.router.navigate(['/recipes/create/import']);
  }

  protected onCancel(): void {
    this.router.navigate(['/recipes/create/import']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload = {
      title: value.title,
      description: value.description ?? '',
      cookingTime: value.cookingTime ?? null,
      servings: value.servings ?? null,
      difficulty: value.difficulty ?? 'facil' as Difficulty,
      img: this.isValidImageUrl(this.extractedRecipe?.img) ? this.extractedRecipe?.img : null,
      category: value.category ?? '',
      tags: value.tags ?? [],
      ingredients: value.ingredients.map((ingredient) => ({
        name: ingredient['name'] ?? '',
      })),
      steps: value.steps.map((step) => ({
        description: step['description'] ?? '',
      })),
    };

    const formData = this.recipeFormMapper.toFormData(
      payload,
      this.selectedImage() ?? undefined
    );

    this.recipesApi.createRecipe(formData).subscribe({
      next: () => {
        this.clearLocalPreviewUrls();
        this.importStore.clearImport();
        this.router.navigate(['/recipes']);
      },
      error: () => {
        console.error('Error saving recipe');
      },
    });
  }

  onImageSelected(image: File): void {
    this.clearLocalPreviewUrls();

    this.selectedImage.set(image);
    this.imagePreviewUrls.set([URL.createObjectURL(image)]);
  }

  onImageRemoved(index: number): void {
    const urls = [...this.imagePreviewUrls()];
    const removedUrl = urls[index];

    if (removedUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(removedUrl);
    }

    urls.splice(index, 1);

    this.imagePreviewUrls.set(urls);
    this.selectedImage.set(null);
  }

  private setInitialImagePreview(imageUrl: string | null | undefined): void {
    const importedImage = this.importStore.images()[0];

    if (importedImage) {
      this.selectedImage.set(importedImage.file);
    }

    if (this.isValidImageUrl(imageUrl)) {
      this.imagePreviewUrls.set([imageUrl]);
      return;
    }

    if (importedImage) {
      this.imagePreviewUrls.set([importedImage.previewUrl]);
    }
  }

  private isValidImageUrl(value: string | null | undefined): value is string {
    return !!value && (
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('blob:') ||
      value.startsWith('data:')
    );
  }

  private fillForm(): void {
    const recipe = this.importStore.extractedRecipe();

    if (!recipe) {
      return;
    }

    this.form.patchValue({
      title: recipe.title ?? '',
      description: recipe.description ?? null,
      cookingTime: recipe.cookingTime ?? null,
      servings: recipe.servings ?? null,
      category: recipe.category ?? '',
      tags: recipe.tags ?? [],
    });

    recipe.ingredients?.forEach((ingredient) => {
      this.ingredients.push(this.createIngredientGroup(ingredient));
    });

    recipe.steps?.forEach((step) => {
      this.steps.push(this.createStepGroup(step));
    });
  }

  private createIngredientGroup(value: string): FormGroup {
    return this.fb.group({
      name: [value, [Validators.required]],
    });
  }

  private createStepGroup(value: string): FormGroup {
    return this.fb.group({
      description: [value, [Validators.required]],
    });
  }

  private clearLocalPreviewUrls(): void {
    this.imagePreviewUrls().forEach((url) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
  }
}
