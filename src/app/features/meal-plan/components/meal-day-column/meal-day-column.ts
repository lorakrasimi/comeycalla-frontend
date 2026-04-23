import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MealPlanDay, MealSlot} from '../../../../core/models/meal-plan.model';
import {MealSlotCard} from '../meal-slot-card/meal-slot-card';

@Component({
  selector: 'app-meal-day-column',
  imports: [
    MealSlotCard
  ],
  templateUrl: './meal-day-column.html',
  styleUrl: './meal-day-column.scss',
})
export class MealDayColumn {
  @Input({ required: true }) day!: MealPlanDay;
  @Output() replaceSlot = new EventEmitter<{ dayNumber: number; slot: MealSlot }>();

  protected onReplace(slot: MealSlot): void {
    this.replaceSlot.emit({
      dayNumber: this.day.dayNumber,
      slot
    });
  }
}
