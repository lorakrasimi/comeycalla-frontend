import {Component, Input, inject, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { UiButton } from '../../../../shared/ui/ui-button/ui-button';
import { UiTagsInput } from '../../../../shared/ui/ui-tags-input/ui-tags-input';
import {RecipeImageField} from '../recipe-image-field/recipe-image-field';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButton, UiTagsInput, RecipeImageField],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
})
export class RecipeForm {
  private readonly fb = inject(FormBuilder);

  @Input({ required: true }) form!: FormGroup;
  @Input() imageUrl: string | null = null;
  @Input() allowImageUpload = false;
  @Output() imageSelected = new EventEmitter<File>();

  get ingredients(): FormArray<FormGroup> {
    return this.form.get('ingredients') as FormArray<FormGroup>;
  }

  get steps(): FormArray<FormGroup> {
    return this.form.get('steps') as FormArray<FormGroup>;
  }

  addIngredient(): void {
    console.log(this.allowImageUpload)
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
    console.log('onImageSelected', file);
    this.imageSelected.emit(file);
  }
}
