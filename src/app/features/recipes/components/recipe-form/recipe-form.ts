import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {RecipeImageField} from '../recipe-image-field/recipe-image-field';
import {UiTagsInput} from '../../../../shared/ui/ui-tags-input/ui-tags-input';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiButton,
    RecipeImageField,
    UiTagsInput,
  ],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeFormComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup;
  @Input() imageUrl: string | null = null;
  @Input() submitLabel = 'Guardar receta';
  @Input() submitting = false;

  @Output() submit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() imageSelected = new EventEmitter<File>();
  @Output() imageRemoved = new EventEmitter<void>();

  ngOnInit(): void {
    this.ensureOneIngredient();
    this.ensureOneStep();
  }

  private ensureOneIngredient(): void {
    if (this.ingredients.length === 0) {
      this.addIngredient();
    }
  }

  private ensureOneStep(): void {
    if (this.steps.length === 0) {
      this.addStep();
    }
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }

  addStep(): void {
    this.steps.push(
      new FormGroup({
        description: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  onImageSelected(file: File): void {
    this.imageSelected.emit(file);
  }

  onImageRemoved(): void {
    this.imageRemoved.emit();
  }

  onBack(): void {
    this.cancel.emit();
  }
}
