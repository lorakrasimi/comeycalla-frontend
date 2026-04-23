import {Component, computed} from '@angular/core';
import {MealPlanStore} from '../../services/meal-plan-store';
import {ShoppingListStore} from '../../services/shopping-list-store';
import {Router, RouterLink} from '@angular/router';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {ShoppingCategoryGroup} from '../../components/shopping-category-group/shopping-category-group';
import {UiEmptyState} from '../../../../shared/ui/ui-empty-state/ui-empty-state';

@Component({
  selector: 'app-shopping-list-page',
  imports: [
    UiButton,
    ShoppingCategoryGroup,
    RouterLink,
    UiEmptyState
  ],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.scss',
})
export class ShoppingListPage {

  constructor(private router: Router, private mealPlanStore: MealPlanStore, protected shoppingListStore: ShoppingListStore) {
  }

  protected readonly list = computed(() => this.shoppingListStore.shoppingList());

  ngOnInit(): void {
    const currentPlan = this.mealPlanStore.currentPlan();
    this.shoppingListStore.buildFromMealPlan(currentPlan);
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

  protected toggleCategory(categoryId: string): void {
    this.shoppingListStore.toggleCategory(categoryId);
  }

  protected toggleItem(itemId: number): void {
    this.shoppingListStore.toggleItem(itemId);
  }

}
