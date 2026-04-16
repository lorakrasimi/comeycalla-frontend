import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  @Input() placeholder: string = "Buscar..."
  value = '';

  @Output() valueChange = new EventEmitter<string>();

  onInput(): void {
    this.valueChange.emit(this.value);
  }
}
