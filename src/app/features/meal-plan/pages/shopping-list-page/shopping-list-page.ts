import {Component, computed, OnInit} from '@angular/core';
import {MealPlanStore} from '../../services/meal-plan-store';
import {ShoppingListStore} from '../../services/shopping-list-store';
import {Router, RouterLink} from '@angular/router';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {ShoppingCategoryGroup} from '../../components/shopping-category-group/shopping-category-group';
import {UiEmptyState} from '../../../../shared/ui/ui-empty-state/ui-empty-state';
import {UiPageHeader} from '../../../../shared/ui/ui-page-header/ui-page-header';
import {MealPlanApi} from '../../services/meal-plan-api';

@Component({
  selector: 'app-shopping-list-page',
  imports: [
    UiButton,
    ShoppingCategoryGroup,
    RouterLink,
    UiEmptyState,
    UiPageHeader
  ],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.scss',
})
export class ShoppingListPage implements OnInit {

  constructor(
    private router: Router,
    private mealPlanStore: MealPlanStore,
    protected shoppingListStore: ShoppingListStore,
    private mealPlanApi: MealPlanApi
  ) {
  }

  protected readonly list = computed(() => this.shoppingListStore.shoppingList());

  ngOnInit(): void {
    const currentPlan = this.mealPlanStore.currentPlan();

    if (!currentPlan?.id) {
      this.shoppingListStore.buildFromBackendResponse(null);
      return;
    }

    this.mealPlanApi.getShoppingList(currentPlan.id).subscribe({
      next: (response) => {
        this.shoppingListStore.buildFromBackendResponse(response);
      },
      error: () => {
        this.shoppingListStore.buildFromBackendResponse(null);
      }
    });
  }

  protected goBackToMenu(): void {
    this.router.navigate(['/meal-plan/result']);
  }

  protected markAll(): void {
    this.shoppingListStore.markAll();
  }

  protected unmarkAll(): void {
    this.shoppingListStore.unmarkAll();
  }

  protected print(): void {
    window.print();
  }

  protected toggleCategory(categoryId: number): void {
    this.shoppingListStore.toggleCategory(categoryId);
  }

  protected toggleItem(itemId: number): void {
    this.shoppingListStore.toggleItem(itemId);
  }

  protected deleteItem(itemId: number): void {
    this.shoppingListStore.deleteItem(itemId);
  }

}
