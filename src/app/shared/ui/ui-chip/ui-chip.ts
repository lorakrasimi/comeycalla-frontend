import { Component, Input } from '@angular/core';

type ChipVariant = 'primary' | 'secondary' | 'outline';

@Component({
  selector: 'ui-chip',
  standalone: true,
  templateUrl: './ui-chip.html',
  styleUrl: './ui-chip.scss',
})
export class UiChip {
  @Input() variant: ChipVariant = 'primary';
  @Input() clickable = false;

  get chipClass(): string {
    let base = 'ui-chip';

    switch (this.variant) {
      case 'secondary':
        base += ' ui-chip--secondary';
        break;
      case 'outline':
        base += ' ui-chip--outline';
        break;
      default:
        base += ' ui-chip--primary';
    }

    if (this.clickable) {
      base += ' ui-chip--clickable';
    }

    return base;
  }
}
