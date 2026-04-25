export interface ShoppingListItem {
  id: number;
  name: string;
  quantity: string;
  checked: boolean;
}

export interface ShoppingListCategory {
  id: number;
  title: string;
  collapsed: boolean;
  items: ShoppingListItem[];
}

export interface ShoppingList {
  categories: ShoppingListCategory[];
}
