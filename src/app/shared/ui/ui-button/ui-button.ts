import {Component, Input} from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonType = 'button' | 'submit' | 'reset';

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

  get buttonClass(): string {
    switch (this.variant) {
      case 'secondary':
        return 'ui-button ui-button--secondary';
      case 'outline':
        return 'ui-button ui-button--outline';
      case 'primary':
      default:
        return 'ui-button ui-button--primary';
    }
  }
}
