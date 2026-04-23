import {computed, Injectable, signal} from '@angular/core';
import {ShoppingList} from '../../../core/models/shopping-list.model';
import {MealPlan} from '../../../core/models/meal-plan.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListStore {
  readonly shoppingList = signal<ShoppingList | null>(null);

  readonly totalItems = computed(() => {
    const list = this.shoppingList();
    if (!list) {
      return 0;
    }

    let total = 0;

    for (const category of list.categories) {
      total += category.items.length;
    }

    return total;
  });

  readonly checkedItems = computed(() => {
    const list = this.shoppingList();

    if (!list) return 0;

    let total = 0;

    for (const category of list.categories) {
      for (const item of category.items) {
        if (item.checked) {
          total++;
        }
      }
    }

    return total;
  });

  readonly progressPercentage = computed(() => {
    const total = this.totalItems();
    if (total === 0) {
      return 0;
    }

    return Math.round((this.checkedItems() / total) * 100);
  });

  buildFromMealPlan(plan: MealPlan | null): void {
    if (!plan) {
      this.shoppingList.set(null);
      return;
    }

    // Mock temporal para maquetar la pantalla
    const list: ShoppingList = {
      categories: [
        {
          id: 'vegetables',
          title: 'Verduras',
          collapsed: false,
          items: [
            { id: 1, name: 'Cebolla', quantity: '2 unidades', checked: false },
            { id: 2, name: 'Tomate', quantity: '4 unidades', checked: true },
            { id: 3, name: 'Pimiento rojo', quantity: '1 unidad', checked: false },
            { id: 4, name: 'Lechuga', quantity: '2 unidades', checked: false },
            { id: 5, name: 'Zanahoria', quantity: '2 unidades', checked: false }
          ]
        },
        {
          id: 'meat',
          title: 'Carne',
          collapsed: false,
          items: [
            { id: 6, name: 'Pollo', quantity: '800 g', checked: false },
            { id: 7, name: 'Bacon', quantity: '200 g', checked: false }
          ]
        }
      ]
    };

    this.shoppingList.set(list);
  }

  toggleCategory(categoryId: string): void {
    const list = this.shoppingList();
    if (!list) {
      return;
    }

    this.shoppingList.set({
      categories: list.categories.map((category) =>
        category.id === categoryId
          ? { ...category, collapsed: !category.collapsed }
          : category
      )
    });
  }

  toggleItem(itemId: number): void {
    const list = this.shoppingList();
    if (!list) {
      return;
    }

    this.shoppingList.set({
      categories: list.categories.map((category) => ({
        ...category,
        items: category.items.map((item) =>
          item.id === itemId
            ? { ...item, checked: !item.checked }
            : item
        )
      }))
    });
  }

  markAll(): void {
    const list = this.shoppingList();
    if (!list) {
      return;
    }

    this.shoppingList.set({
      categories: list.categories.map((category) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          checked: true
        }))
      }))
    });
  }

  unmarkAll(): void {
    const list = this.shoppingList();
    if (!list) {
      return;
    }

    this.shoppingList.set({
      categories: list.categories.map((category) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          checked: false
        }))
      }))
    });
  }
}
