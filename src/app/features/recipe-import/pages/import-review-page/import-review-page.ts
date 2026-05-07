import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { UiButton } from '../../../../shared/ui/ui-button/ui-button';
import { RecipeImportStore } from '../../services/recipe-import-store';
import { RecipesApi } from '../../../recipes/services/recipes-api';
import { RecipeFormComponent } from '../../../recipes/components/recipe-form/recipe-form';
import { Difficulty } from '../../../../core/models/recipe.model';
import {RecipeFormMapper} from '../../../recipes/services/recipe-form-mapper';

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

  constructor(
    private router: Router,
    protected importStore: RecipeImportStore,
    private recipesApi: RecipesApi,
    private recipeFormMapper: RecipeFormMapper
  ) {
    this.imagePreviewUrls.set(this.importStore.previewUrls());
  }

  readonly form = this.fb.group({
    title: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: this.fb.control<string | null>(null),
    cookingTime: this.fb.control<number | null>(null),
    servings: this.fb.control<number | null>(null),
    category: this.fb.control<string>('', { nonNullable: true }),
    tags: this.fb.control<string[]>([], { nonNullable: true }),
    ingredients: this.fb.array<FormGroup>([]),
    steps: this.fb.array<FormGroup>([]),
  });

  ngOnInit(): void {
    const extractedRecipe = this.importStore.extractedRecipe();

    if (!extractedRecipe) {
      this.router.navigate(['/recipes/create/image']);
      return;
    }

    this.form.patchValue({
      title: extractedRecipe.title ?? '',
      description: extractedRecipe.description ?? null,
      cookingTime: extractedRecipe.cookingTime ?? null,
      servings: extractedRecipe.servings ?? null,
      category: extractedRecipe.category ?? '',
      tags: extractedRecipe.tags ?? [],
    });

    extractedRecipe.ingredients?.forEach((ingredient) => {
      this.ingredients.push(this.createIngredientGroup(ingredient));
    });

    extractedRecipe.steps?.forEach((step) => {
      this.steps.push(this.createStepGroup(step));
    });
  }

  get ingredients(): FormArray<FormGroup> {
    return this.form.get('ingredients') as FormArray<FormGroup>;
  }

  get steps(): FormArray<FormGroup> {
    return this.form.get('steps') as FormArray<FormGroup>;
  }

  onProcessAgain(): void {
    this.router.navigate(['/recipes/create/image']);
  }

  onBack(): void {
    this.router.navigate(['/recipes/create/image']);
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
      difficulty: 'easy' as Difficulty,
      img: null,
      category: value.category ?? '',
      tags: value.tags ?? [],
      ingredients: (value.ingredients ?? []).map((item) => ({
        name: item['name'] ?? '',
      })),
      steps: (value.steps ?? []).map((item) => ({
        description: item['description'] ?? '',
      })),
    };

    const firstFile = this.importStore.files()[0];

    const formData = this.recipeFormMapper.toFormData(
      payload,
      firstFile
    );

    this.recipesApi.createRecipe(formData).subscribe({
      next: () => {
        this.importStore.reset();
        this.router.navigate(['/recipes']);
      },
      error: () => {
        console.error('Error saving recipe');
      },
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

  onImageSelected(file: File): void {
    this.revokePreviewUrls();

    const previewUrl = URL.createObjectURL(file);
    this.imagePreviewUrls.set([previewUrl]);
  }

  onImageRemoved(index: number): void {
    const urls = [...this.imagePreviewUrls()];
    const removedUrl = urls[index];

    if (removedUrl) {
      URL.revokeObjectURL(removedUrl);
    }

    urls.splice(index, 1);
    this.imagePreviewUrls.set(urls);
  }


  private revokePreviewUrls(): void {
    this.imagePreviewUrls().forEach((url) => {
      URL.revokeObjectURL(url);
    });
  }
}
