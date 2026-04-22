import {Component, inject, signal} from '@angular/core';
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
import { RecipeForm } from '../../components/recipe-form/recipe-form';
import { RecipesApi } from '../../services/recipes-api';

@Component({
  selector: 'app-recipe-create-manual-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButton, RecipeForm],
  templateUrl: './recipe-create-manual-page.html',
  styleUrl: './recipe-create-manual-page.scss',
})
export class RecipeCreateManualPage {
  private readonly fb = inject(FormBuilder);
  readonly imagePreviewUrl = signal<string | null>(null);

  constructor(
    private router: Router,
    private recipesApi: RecipesApi
  ) {}

  readonly form = this.fb.group({
    title: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: this.fb.control<string | null>(null),
    cookingTime: this.fb.control<string | null>(null),
    servings: this.fb.control<number | null>(null),
    category: this.fb.control<string>('', { nonNullable: true }),
    tags: this.fb.control<string[]>([], { nonNullable: true }),
    ingredients: this.fb.array<FormGroup>([
      this.createIngredientGroup(''),
    ]),
    steps: this.fb.array<FormGroup>([
      this.createStepGroup(''),
    ]),
  });

  onBack(): void {
    this.router.navigate(['/recipes']);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload = {
      title: value.title ?? '',
      description: value.description ?? '',
      cookingTime: value.cookingTime ?? '0',
      servings: value.servings ?? 0,
      imageUrl: null,
      category: value.category ?? '',
      tags: value.tags ?? [],
      ingredients: (value.ingredients ?? []).map((item) => ({
        name: item['name'] ?? '',
      })),
      steps: (value.steps ?? []).map((item, index) => ({
        order: index + 1,
        description: item['description'] ?? '',
      })),
    };

    this.recipesApi.createRecipe(payload).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: () => {
        console.error('Error saving recipe');
      },
    });
  }

  get ingredients(): FormArray<FormGroup> {
    return this.form.get('ingredients') as FormArray<FormGroup>;
  }

  get steps(): FormArray<FormGroup> {
    return this.form.get('steps') as FormArray<FormGroup>;
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
    const currentUrl = this.imagePreviewUrl();
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
    this.imagePreviewUrl.set(URL.createObjectURL(file));
  }

  onImageRemoved(): void {
    const currentUrl = this.imagePreviewUrl();

    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }

    this.imagePreviewUrl.set(null);
  }
}
