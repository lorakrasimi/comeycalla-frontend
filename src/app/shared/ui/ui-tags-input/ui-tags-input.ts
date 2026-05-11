import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiChip } from '../ui-chip/ui-chip';
import {UiButton} from '../ui-button/ui-button';

@Component({
  selector: 'ui-tags-input',
  standalone: true,
  imports: [FormsModule, UiChip, UiButton],
  templateUrl: './ui-tags-input.html',
  styleUrl: './ui-tags-input.scss',
})
export class UiTagsInput {
  @Input() tags: string[] = [];
  @Input() placeholder: string = 'Añadir tag';
  @Output() tagsChange = new EventEmitter<string[]>();

  newTag: string = '';

  addTag(): void {
    const value = this.newTag.trim();

    if (!value) return;
    if (this.tags.includes(value)) {
      this.newTag = '';
      return;
    }

    this.tagsChange.emit([...this.tags, value]);
    this.newTag = '';
  }

  removeTag(tagToRemove: string): void {
    this.tagsChange.emit(this.tags.filter(tag => tag !== tagToRemove));
  }

  onKeydownEnter(event: Event): void {
    event.preventDefault();
    this.addTag();
  }
}
