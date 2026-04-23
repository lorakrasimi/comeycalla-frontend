import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ShoppingListItem} from '../../../../core/models/shopping-list.model';

@Component({
  selector: 'app-shopping-item-row',
  imports: [],
  templateUrl: './shopping-item-row.html',
  styleUrl: './shopping-item-row.scss',
})
export class ShoppingItemRow {

  @Input({ required: true }) item!: ShoppingListItem;
  @Output() toggle = new EventEmitter<number>();

  protected onToggle(): void {
    this.toggle.emit(this.item.id);
  }
}
