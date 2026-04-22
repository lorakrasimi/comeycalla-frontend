import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-image-field',
  standalone: true,
  templateUrl: './recipe-image-field.html',
  styleUrl: './recipe-image-field.scss',
})
export class RecipeImageField {
  @Input() imageUrl: string | null = null;
  @Input() allowUpload = false;
  @Input() label = 'Imagen de la receta';

  @Output() imageSelected = new EventEmitter<File>();
  isPreviewOpen = false;

  openPreview(): void {
    if (!this.imageUrl) return;
    this.isPreviewOpen = true;
  }

  closePreview(): void {
    this.isPreviewOpen = false;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    console.log('onFileChange', file);
    this.imageSelected.emit(file);
    input.value = '';
  }
}
