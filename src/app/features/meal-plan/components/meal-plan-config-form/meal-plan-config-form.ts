import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MealPlanConfig, MealType} from '../../../../core/models/meal-plan.model';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-meal-plan-config-form',
  imports: [
    ReactiveFormsModule,
    UiButton
  ],
  templateUrl: './meal-plan-config-form.html',
  styleUrl: './meal-plan-config-form.scss',
})
export class MealPlanConfigForm {
  private readonly fb = inject(FormBuilder);

  @Input() submitting = false;
  @Output() formSubmit = new EventEmitter<MealPlanConfig>();

  protected readonly dayOptions = [1, 2, 3, 4, 5, 6, 7];

  protected readonly form: FormGroup = this.fb.group({
    days: this.fb.nonNullable.control(3, [Validators.required]),
    breakfast: this.fb.nonNullable.control(false),
    lunch: this.fb.nonNullable.control(true),
    dinner: this.fb.nonNullable.control(true),
    excludeRepeatedRecipes: this.fb.nonNullable.control(true)
  });

  protected selectDays(days: number): void {
    this.form.controls['days'].setValue(days);
  }

  protected onSubmit(): void {
    const meals: MealType[] = [];

    if (this.form.controls['breakfast'].value) {
      meals.push('breakfast');
    }

    if (this.form.controls['lunch'].value) {
      meals.push('lunch');
    }

    if (this.form.controls['dinner'].value) {
      meals.push('dinner');
    }

    if (meals.length === 0) {
      this.form.controls['breakfast'].markAsTouched();
      this.form.controls['lunch'].markAsTouched();
      this.form.controls['dinner'].markAsTouched();
      return;
    }

    this.formSubmit.emit({
      days: this.form.controls['days'].value,
      meals,
      excludeRepeatedRecipes: this.form.controls['excludeRepeatedRecipes'].value
    });
  }
}
