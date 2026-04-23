import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MealSlot} from '../../../../core/models/meal-plan.model';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-meal-slot-card',
  imports: [
    UiButton,
    RouterLink
  ],
  templateUrl: './meal-slot-card.html',
  styleUrl: './meal-slot-card.scss',
})
export class MealSlotCard {
  @Input({ required: true }) slot!: MealSlot;
  @Output() replace = new EventEmitter<MealSlot>();

  protected get mealLabel(): string {
    switch (this.slot.type) {
      case 'breakfast':
        return 'DESAYUNO';
      case 'lunch':
        return 'COMIDA';
      case 'dinner':
        return 'CENA';
      default:
        return '';
    }
  }

  protected onReplace(): void {
    this.replace.emit(this.slot);
  }
}
