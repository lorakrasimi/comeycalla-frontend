import {Component, signal} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {RecipesApi} from '../../services/recipes-api';
import {RecipeFormMapper} from '../../services/recipe-form-mapper';
import {RecipeFormValue} from '../../../../core/models/recipe-form.model';
import {CommonModule} from '@angular/common';
import {RecipeFormComponent} from '../../components/recipe-form/recipe-form';

@Component({
  selector: 'app-recipe-create-manual-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RecipeFormComponent],
  templateUrl: './recipe-create-manual-page.html',
  styleUrl: './recipe-create-manual-page.scss',
})
export class RecipeCreateManualPage {
  readonly imagePreviewUrl = signal<string | null>(null);
  readonly form: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private router: Router,
    private recipesApi: RecipesApi,
    private recipeFormMapper: RecipeFormMapper
  ) {
    this.form = this.recipeFormMapper.createEmptyForm();
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as RecipeFormValue;
    const payload = this.recipeFormMapper.toCreatePayload(value);

    const formData = new FormData();

    formData.append(
      'recipe',
      new Blob([JSON.stringify(payload)], {
        type: 'application/json',
      })
    );

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.recipesApi.createRecipe(formData).subscribe({
      next: (recipe) => {
        this.router.navigate(['/recipe', recipe.id]);
      },
      error: (error) => {
        console.error('Error saving recipe', error);
      },
    });
  }

  get ingredients(): FormArray<FormGroup> {
    return this.form.get('ingredients') as FormArray<FormGroup>;
  }

  get steps(): FormArray<FormGroup> {
    return this.form.get('steps') as FormArray<FormGroup>;
  }

  onImageSelected(file: File): void {
    this.selectedImage = file;
    const currentUrl = this.imagePreviewUrl();
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }

    this.imagePreviewUrl.set(URL.createObjectURL(file));
  }

  onImageRemoved(): void {
    this.selectedImage = null;
    const currentUrl = this.imagePreviewUrl();
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }

    this.imagePreviewUrl.set(null);
  }
}
