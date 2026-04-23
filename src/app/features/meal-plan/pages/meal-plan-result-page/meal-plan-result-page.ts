import {Component, computed, inject} from '@angular/core';
import {MealPlanStore} from '../../services/meal-plan-store';
import {Router, RouterLink} from '@angular/router';
import {MealSlot} from '../../../../core/models/meal-plan.model';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {MealDayColumn} from '../../components/meal-day-column/meal-day-column';
import {UiEmptyState} from '../../../../shared/ui/ui-empty-state/ui-empty-state';
import {UiPageHeader} from '../../../../shared/ui/ui-page-header/ui-page-header';

@Component({
  selector: 'app-meal-plan-result-page',
  imports: [
    UiButton,
    MealDayColumn,
    UiEmptyState,
    RouterLink,
    UiPageHeader
  ],
  templateUrl: './meal-plan-result-page.html',
  styleUrl: './meal-plan-result-page.scss',
})
export class MealPlanResultPage {
  private readonly router = inject(Router);

  constructor(private mealPlanStore: MealPlanStore) {
  }

  protected readonly plan = computed(() => this.mealPlanStore.currentPlan());

  protected regenerate(): void {
    this.router.navigate(['/meal-plan']);
  }

  protected savePlan(): void {
    console.log('Save meal plan');
  }

  protected goToShoppingList(): void {
    this.router.navigate(['/meal-plan/shopping-list']);
  }

  protected onReplaceSlot(event: { dayNumber: number; slot: MealSlot }): void {
    console.log('Replace slot', event);
  }
}
