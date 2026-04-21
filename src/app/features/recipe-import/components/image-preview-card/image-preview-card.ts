import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-image-preview-card',
  imports: [
    UiButton
  ],
  templateUrl: './image-preview-card.html',
  styleUrl: './image-preview-card.scss',
})
export class ImagePreviewCard {
  @Input({ required: true }) previewUrl!: string;
  @Output() changeImage = new EventEmitter<void>();
}
