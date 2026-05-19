import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ui-select.html',
  styleUrl: './ui-select.scss'
})
export class UiSelect {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Selecciona una opción';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
