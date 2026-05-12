import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipeRequest} from '../../../core/models/recipe.model';
import {RecipeFormValue} from '../../../core/models/recipe-form.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeFormMapper {
  constructor(private readonly fb: FormBuilder) {
  }

  createEmptyForm(): FormGroup {
    return this.fb.group({
      title: this.fb.nonNullable.control('', Validators.required),
      description: this.fb.control<string | null>(null),
      category: this.fb.control(''),
      tags: this.fb.control<string[]>([]),
      cookingTime: this.fb.control<string | null>(null),
      servings: this.fb.control<number | null>(null),
      ingredients: this.fb.array([this.createIngredientGroup()]),
      steps: this.fb.array([this.createStepGroup()])
    });
  }

  createIngredientGroup(value = ''): FormGroup {
    return this.fb.group({
      name: this.fb.nonNullable.control(value)
    });
  }

  createStepGroup(value = ''): FormGroup {
    return this.fb.group({
      description: this.fb.nonNullable.control(value)
    });
  }

  fillForm(form: FormGroup, recipe: any): void {
    form.patchValue({
      title: recipe.title ?? recipe.name ?? '',
      description: recipe.description ?? '',
      category: recipe.category ?? recipe.nationality ?? '',
      tags: recipe.tags ?? [],
      cookingTime: recipe.cookingTime?.toString() ?? recipe.time?.toString() ?? null,
      servings: recipe.servings ?? null
    });

    const ingredientsArray = form.get('ingredients') as FormArray;
    const stepsArray = form.get('steps') as FormArray;

    ingredientsArray.clear();
    stepsArray.clear();

    const ingredients = recipe.ingredients?.length ? recipe.ingredients : [{name: ''}];
    const steps = recipe.steps?.length ? recipe.steps : [{description: ''}];

    for (const ingredient of ingredients) {
      ingredientsArray.push(this.createIngredientGroup(ingredient.name ?? ingredient));
    }

    for (const step of steps) {
      stepsArray.push(this.createStepGroup(step.description ?? step));
    }
  }

  toCreatePayload(formValue: RecipeFormValue): RecipeRequest {
    const ingredients = (formValue.ingredients ?? [])
      .map((ingredient) => ({
        name: ingredient.name.trim(),
      }))
      .filter((ingredient) => ingredient.name);

    const steps = (formValue.steps ?? [])
      .map((step) => ({
        description: step.description.trim(),
      }))
      .filter((step) => step.description);

    return {
      title: formValue.title,
      description: formValue.description ?? '',
      img: null,
      cookingTime: formValue.cookingTime ? Number(formValue.cookingTime) : null,
      servings: formValue.servings,
      difficulty: 'easy',
      category: formValue.category,
      ingredients: ingredients.length ? ingredients : null,
      steps: steps.length ? steps : null,
      tags: formValue.tags ?? [],
    };
  }

  toFormData(payload: unknown, image?: File | Blob | null): FormData {
    const formData = new FormData();

    formData.append(
      'recipe',
      new Blob([JSON.stringify(payload)], {
        type: 'application/json',
      })
    );

    if (image) {
      formData.append('image', image);
    }

    return formData;
  }

  toUpdateFormData(
    payload: RecipeRequest,
    image?: File | null,
    removeImage = false
  ): FormData {
    const formData = this.toFormData(payload, image);

    if (removeImage && !image) {
      formData.append('image', new Blob());
    }

    return formData;
  }
}
