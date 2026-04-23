import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface RecipeFormValue {
  title: string;
  description: string;
  category: string;
  tags: string[];
  cookingTime: number | null;
  servings: number | null;
  ingredients: { name: string }[];
  steps: { description: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeFormMapper {
  constructor(private readonly fb: FormBuilder) {}

  createEmptyForm(): FormGroup {
    return this.fb.group({
      title: this.fb.nonNullable.control('', Validators.required),
      description: this.fb.nonNullable.control(''),
      category: this.fb.nonNullable.control(''),
      tags: this.fb.nonNullable.control<string[]>([]),
      cookingTime: this.fb.control<number | null>(null),
      servings: this.fb.control<number | null>(null),
      ingredients: this.fb.array([this.createIngredientGroup()]),
      steps: this.fb.array([this.createStepGroup()])
    });
  }

  createIngredientGroup(value = ''): FormGroup {
    return this.fb.group({
      name: this.fb.nonNullable.control(value, Validators.required)
    });
  }

  createStepGroup(value = ''): FormGroup {
    return this.fb.group({
      description: this.fb.nonNullable.control(value, Validators.required)
    });
  }

  fillForm(form: FormGroup, recipe: any): void {
    form.patchValue({
      title: recipe.title ?? recipe.name ?? '',
      description: recipe.description ?? '',
      category: recipe.category ?? recipe.nationality ?? '',
      tags: recipe.tags ?? [],
      cookingTime: recipe.cookingTime ?? recipe.time ?? null,
      servings: recipe.servings ?? null
    });

    const ingredientsArray = form.get('ingredients') as FormArray;
    const stepsArray = form.get('steps') as FormArray;

    ingredientsArray.clear();
    stepsArray.clear();

    const ingredients = recipe.ingredients?.length ? recipe.ingredients : [{ name: '' }];
    const steps = recipe.steps?.length ? recipe.steps : [{ description: '' }];

    for (const ingredient of ingredients) {
      ingredientsArray.push(this.createIngredientGroup(ingredient.name ?? ingredient));
    }

    for (const step of steps) {
      stepsArray.push(this.createStepGroup(step.description ?? step));
    }
  }

  toCreatePayload(formValue: RecipeFormValue, imageFile: File | null): FormData | RecipeFormValue {
    return formValue;
  }

  toUpdatePayload(formValue: RecipeFormValue, imageFile: File | null): FormData | RecipeFormValue {
    return formValue;
  }
}
