import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
