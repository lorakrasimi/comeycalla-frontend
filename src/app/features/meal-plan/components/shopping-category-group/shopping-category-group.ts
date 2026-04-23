import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ShoppingListCategory} from '../../../../core/models/shopping-list.model';
import {ShoppingItemRow} from '../shopping-item-row/shopping-item-row';

@Component({
  selector: 'app-shopping-category-group',
  imports: [
    ShoppingItemRow
  ],
  templateUrl: './shopping-category-group.html',
  styleUrl: './shopping-category-group.scss',
})
export class ShoppingCategoryGroup {
  @Input({ required: true }) category!: ShoppingListCategory;

  @Output() toggleCollapse = new EventEmitter<string>();
  @Output() toggleItem = new EventEmitter<number>();

  protected onToggleCollapse(): void {
    this.toggleCollapse.emit(this.category.id);
  }

  protected onToggleItem(itemId: number): void {
    this.toggleItem.emit(itemId);
  }
}
