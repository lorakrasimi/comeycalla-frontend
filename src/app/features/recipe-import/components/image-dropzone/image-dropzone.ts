import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-image-dropzone',
  standalone: true,
  imports: [NgClass, UiButton],
  templateUrl: './image-dropzone.html',
  styleUrl: './image-dropzone.scss'
})
export class ImageDropzone {
  @Input() accept: string = 'image/*';
  @Input() disabled: boolean = false;

  @Output() fileSelected = new EventEmitter<File>();

  isDragging = false;
  previewUrl: string | null = null;
  selectedFile: File | null = null;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.disabled) return;
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (this.disabled) return;

    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.handleFile(file);
      input.value = '';
    }
  }

  openFilePicker(input: HTMLInputElement): void {
    if (this.disabled) return;
    input.click();
  }

  removeFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  private handleFile(file: File): void {
    if (!file.type.startsWith('image/')) return;

    this.selectedFile = file;
    this.fileSelected.emit(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
