import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  @Input() placeholder: string = "Buscar...";
  @Input() variant = "primary";
  @Input() trigger: 'input' | 'submit' = 'input';

  value = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  onInput(): void {
    this.valueChange.emit(this.value);

    if (this.trigger === 'input') {
      this.search.emit(this.value);
    }
  }

  onEnter(): void {
    console.log('ENTER PRESSED', this.value);
    if (this.trigger === 'submit') {
      this.search.emit(this.value);
    }
  }
}
