import {Component, signal} from '@angular/core';
import {MealPlanStore} from '../../services/meal-plan-store';
import {Router} from '@angular/router';
import {MealPlanConfig} from '../../../../core/models/meal-plan.model';
import {finalize} from 'rxjs';
import {MealPlanConfigForm} from '../../components/meal-plan-config-form/meal-plan-config-form';

@Component({
  selector: 'app-create-meal-plan-page',
  imports: [
    MealPlanConfigForm
  ],
  templateUrl: './create-meal-plan-page.html',
  styleUrl: './create-meal-plan-page.scss',
})
export class CreateMealPlanPage {

  constructor(private mealPlanStore: MealPlanStore, private router: Router) {
  }

  protected readonly submitting = signal(false);

  protected onGenerateMenu(config: MealPlanConfig): void {
    this.submitting.set(true);

    this.mealPlanStore.generateMealPlan(config)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/meal-plan/result']);
        },
        error: (error: any) => {
          console.error('Error generating meal plan', error);
        }
      });
  }
}
