import {Component, OnInit, inject} from '@angular/core';
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
import {UiTagsInput} from '../../../../shared/ui/ui-tags-input/ui-tags-input';

@Component({
  selector: 'app-import-review-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButton, UiTagsInput],
  templateUrl: './import-review-page.html',
  styleUrl: './import-review-page.scss',
})
export class ImportReviewPage implements OnInit {
  private readonly fb = inject(FormBuilder);

  constructor(private router: Router,
              protected importStore: RecipeImportStore,
              private recipesApi: RecipesApi) {
  }

  readonly form = this.fb.group({
    title: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: this.fb.control<string | null>(null),
    cookingTime: this.fb.control<string | null>(null),
    servings: this.fb.control<number | null>(null),

    category: this.fb.control<string>("", { nonNullable: true }),
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
      category: extractedRecipe.category ?? null,
      tags: extractedRecipe.tags ?? [],
    });

    extractedRecipe.ingredients.forEach((ingredient) => {
      this.ingredients.push(this.createIngredientGroup(ingredient));
    });

    extractedRecipe.steps.forEach((step) => {
      this.steps.push(this.createStepGroup(step));
    });
  }

  get ingredients(): FormArray<FormGroup> {
    return this.form.get('ingredients') as FormArray<FormGroup>;
  }

  get steps(): FormArray<FormGroup> {
    return this.form.get('steps') as FormArray<FormGroup>;
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredientGroup(''));
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length === 1) {
      return;
    }

    this.ingredients.removeAt(index);
  }

  addStep(): void {
    this.steps.push(this.createStepGroup(''));
  }

  removeStep(index: number): void {
    if (this.steps.length === 1) {
      return;
    }

    this.steps.removeAt(index);
  }

  onProcessAgain(): void {
    this.router.navigate(['/recipes/create/image']);
  }

  onBack(): void {
    this.router.navigate(['/recipes/create/image']);
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
      imageUrl: this.importStore.previewUrl(),
      category: value.category ?? [],
      tags: value.tags ?? [],

      ingredients: (value.ingredients ?? []).map((item) => ({
        name: item["name"] ?? '',
      })),
      steps: (value.steps ?? []).map((item, index) => ({
        order: index + 1,
        description: item["description"] ?? '',
      })),
    };

    this.recipesApi.createRecipe(payload).subscribe({
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
}
