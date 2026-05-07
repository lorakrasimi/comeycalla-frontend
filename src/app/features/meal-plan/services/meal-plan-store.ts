import {Injectable, signal} from '@angular/core';
import {MealPlan} from '../../../core/models/meal-plan.model';
import {MealPlanApi} from './meal-plan-api';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealPlanStore {
  readonly currentPlan = signal<MealPlan | null>(null);

  constructor(private readonly mealPlanApi: MealPlanApi) {
  }

  generateMealPlan(config: {
    days: number;
    meals: string[];
    excludeRepeatedRecipes: boolean,
  }): Observable<MealPlan> {
    return this.mealPlanApi.generateMealPlan(config).pipe(
      tap((plan: MealPlan) => this.currentPlan.set(plan))
    );
  }

  setPlan(plan: MealPlan): void {
    this.currentPlan.set(plan);
  }
}
