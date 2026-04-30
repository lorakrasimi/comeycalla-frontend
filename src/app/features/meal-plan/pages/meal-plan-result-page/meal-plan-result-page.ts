import {Component, computed} from '@angular/core';
import {MealPlanStore} from '../../services/meal-plan-store';
import {Router} from '@angular/router';
import {MealPlan, MealSlot} from '../../../../core/models/meal-plan.model';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {MealDayColumn} from '../../components/meal-day-column/meal-day-column';
import {UiEmptyState} from '../../../../shared/ui/ui-empty-state/ui-empty-state';
import {UiPageHeader} from '../../../../shared/ui/ui-page-header/ui-page-header';
import {MealPlanApi} from '../../services/meal-plan-api';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-meal-plan-result-page',
  imports: [
    UiButton,
    MealDayColumn,
    UiEmptyState,
    UiPageHeader
  ],
  templateUrl: './meal-plan-result-page.html',
  styleUrl: './meal-plan-result-page.scss',
})
export class MealPlanResultPage {

  constructor(
    private mealPlanStore: MealPlanStore,
    private mealPlanApi: MealPlanApi,
    private router: Router
  ) {
  }

  protected mealPlan = computed(() => this.mealPlanStore.currentPlan());

  protected regenerate(): void {
    this.router.navigate(['/meal-plan']);
  }

  protected printMenu(): void {
    window.print();
  }
  protected goToShoppingList(): void {
    this.router.navigate(['/meal-plan/shopping-list']);
  }

  protected onReplaceSlot(event: { dayNumber: number; slot: MealSlot }): void {
    const currentPlan = this.mealPlan();

    if (!currentPlan) {
      return;
    }

    this.mealPlanApi
      .replaceSlot(currentPlan.id, event.dayNumber, event.slot.type)
      .subscribe({
        next: (newRecipe) => {
          const updatedPlan: MealPlan = {
            ...currentPlan,
            days: currentPlan.days.map(day => {
              if (day.dayNumber !== event.dayNumber) {
                return day;
              }

              return {
                ...day,
                slots: day.slots.map(slot => {
                  if (slot.type !== event.slot.type) {
                    return slot;
                  }

                  return {
                    ...slot,
                    recipe: newRecipe
                  };
                }),
              };
            }),
          };

          this.mealPlanStore.setPlan(updatedPlan);
        },
      });
  }
}
