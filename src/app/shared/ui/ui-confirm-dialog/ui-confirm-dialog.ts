import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UiButton} from '../ui-button/ui-button';

@Component({
  selector: 'ui-confirm-dialog',
  imports: [
    UiButton
  ],
  templateUrl: './ui-confirm-dialog.html',
  styleUrl: './ui-confirm-dialog.scss',
})
export class ConfirmDialog {
  @Input() open = false;
  @Input() title = '¿Confirmar acción?';
  @Input() message = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
