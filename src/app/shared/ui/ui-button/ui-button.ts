import { Component, Input } from '@angular/core';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'soft';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'md' | 'sm';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
})
export class UiButton {
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() size: ButtonSize = 'md';

  get buttonClass(): string {
    let base = 'ui-button';

    switch (this.variant) {
      case 'secondary':
        base += ' ui-button--secondary';
        break;
      case 'outline':
        base += ' ui-button--outline';
        break;
      case 'ghost':
        base += ' ui-button--ghost';
        break;
      case 'danger':
        base += ' ui-button--danger';
        break;
      case 'soft':
        base += ' ui-button--soft';
        break;
      default:
        base += ' ui-button--primary';
    }

    if (this.size === 'sm') {
      base += ' ui-button--sm';
    }

    return base;
  }
}
