import {Component, Input} from '@angular/core';

type ChipVariant = 'primary' | 'secondary' | 'outline';
type ChipSize = 'md' | 'sm';

@Component({
  selector: 'ui-chip',
  standalone: true,
  templateUrl: './ui-chip.html',
  styleUrl: './ui-chip.scss',
})
export class UiChip {
  @Input() variant: ChipVariant = 'primary';
  @Input() size: ChipSize = 'md';
  @Input() clickable = false;

  get chipClass(): string {
    let base = 'ui-chip';

    // variant
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

    // size
    if (this.size === 'sm') {
      base += ' ui-chip--sm';
    }

    // clickable
    if (this.clickable) {
      base += ' ui-chip--clickable';
    }

    return base;
  }
}
