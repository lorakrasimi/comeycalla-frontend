import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
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

  @Output() filesSelected = new EventEmitter<File[]>();

  isDragging = false;
  previewUrls: string[] = [];
  selectedFiles: File[] = [];

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

    const files = Array.from(event.dataTransfer?.files ?? []);

    if (files.length > 0) {
      this.handleFiles(files);
    }
  }


  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    if (files.length > 0) {
      this.handleFiles(files);
      input.value = '';
    }
  }

  openFilePicker(input: HTMLInputElement): void {
    if (this.disabled) return;
    input.click();
  }

  removeFile(index: number): void {
    URL.revokeObjectURL(this.previewUrls[index]);

    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);

    this.filesSelected.emit([...this.selectedFiles]);
  }


  private handleFiles(files: File[]): void {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) return;

    this.clearPreviews();

    this.selectedFiles = imageFiles;
    this.filesSelected.emit(imageFiles);

    this.previewUrls = imageFiles.map(file => URL.createObjectURL(file));
  }
  private clearPreviews(): void {
    this.previewUrls.forEach(url => URL.revokeObjectURL(url));
    this.previewUrls = [];
  }

}
