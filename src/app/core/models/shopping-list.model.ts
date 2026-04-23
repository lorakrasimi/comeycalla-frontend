export interface ShoppingListItem {
  id: number;
  name: string;
  quantity: string;
  checked: boolean;
}

export interface ShoppingListCategory {
  id: string;
  title: string;
  collapsed: boolean;
  items: ShoppingListItem[];
}

export interface ShoppingList {
  categories: ShoppingListCategory[];
}
