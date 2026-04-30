import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {MealPlan, MealPlanRecipe, MealType} from '../../../core/models/meal-plan.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealPlanApi {
  private readonly baseUrl = 'http://localhost:8080/api/meal-plans';

  constructor(private http: HttpClient) {
  }

  generateMealPlan(config: { days: number; meals: string[]; excludeRepeatedRecipes: boolean }): Observable<MealPlan> {
    return this.http.post<MealPlan>(this.baseUrl, config);
  }

  replaceSlot(
    mealPlanId: string,
    dayNumber: number,
    mealType: MealType
  ): Observable<MealPlanRecipe> {
    return this.http.put<MealPlanRecipe>(
      `${this.baseUrl}/${mealPlanId}/days/${dayNumber}/slots/${mealType}/replace`,
      {}
    );
  }
}


