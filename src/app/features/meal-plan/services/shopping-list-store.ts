import {computed, Injectable, signal} from '@angular/core';
import {
  ShoppingList,
  ShoppingListBackendCategory,
  ShoppingListCategory
} from '../../../core/models/shopping-list.model';

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

  buildFromBackendResponse(response: ShoppingListBackendCategory[] | null): void {
    if (!response) {
      this.shoppingList.set(null);
      return;
    }

    let itemId = 1;
    console.log(response);
    const categories: ShoppingListCategory[] = response.map((backendCategory, index) => ({
      id: index + 1,
      title: this.formatCategoryName(backendCategory.category),
      collapsed: false,
      items: backendCategory.ingredients.map((itemName) => ({
        id: itemId++,
        name: itemName,
        quantity: '',
        checked: false
      }))
    }));

    this.shoppingList.set({ categories });
  }

  private formatCategoryName(category: string): string {
    const labels: Record<string, string> = {
      LACTEO: 'Lácteos',
      VERDURA: 'Verduras',
      CEREAL: 'Cereales',
      PESCADO: 'Pescado',
      DULCE: 'Dulces'
    };

    return (
      labels[category] ??
      category
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/^\w/, (letter) => letter.toUpperCase())
    );
  }

  toggleCategory(categoryId: number): void {
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

  deleteItem(itemId: number): void {
    const list = this.shoppingList();
    if (!list) {
      return;
    }

    this.shoppingList.set({
      categories: list.categories.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== itemId)
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
