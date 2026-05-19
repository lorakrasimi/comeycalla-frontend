import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageDropzone } from '../../components/image-dropzone/image-dropzone';
import { RecipeImportStore } from '../../services/recipe-import-store';
import { UiButton } from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-import-recipe-page',
  standalone: true,
  imports: [ImageDropzone, UiButton],
  templateUrl: './import-recipe-page.html',
  styleUrl: './import-recipe-page.scss',
})
export class ImportRecipePage {
  readonly sectionOptions = [
    { value: 'main', label: 'Título, descripción y datos' },
    { value: 'ingredients', label: 'Ingredientes' },
    { value: 'steps', label: 'Pasos' },
    { value: 'cover', label: 'Imagen de la receta' },
  ] as const;

  recipeUrl = '';
  urlErrorMessage = '';
  imageErrorMessage = '';
  previewImageUrl: string | null = null;

  constructor(
    private router: Router,
    protected importStore: RecipeImportStore
  ) {}

  onImagesSelected(files: File[]): void {
    this.importStore.setFiles(files);
    this.imageErrorMessage = '';
  }

  onReplaceImage(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.importStore.replaceImage(index, file);
    this.imageErrorMessage = '';

    input.value = '';
  }

  onSectionChange(index: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.importStore.updateImageSection(index, select.value as any);
    this.imageErrorMessage = '';
  }

  onRemoveImage(index: number): void {
    this.importStore.removeImage(index);
    this.imageErrorMessage = '';
  }

  onProcessImageRecipe(): void {
    const images = this.importStore.images();

    if (images.length === 0) {
      return;
    }

    if (images.length > 1 && images.some((image) => !image.section)) {
      this.imageErrorMessage = 'Asigna una sección a cada imagen antes de continuar.';
      return;
    }

    this.router.navigate(['/create-recipe/import/processing']);
  }

  onRecipeUrlChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.recipeUrl = input.value;
    this.urlErrorMessage = '';
  }

  onProcessUrlRecipe(): void {
    const url = this.recipeUrl.trim();

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      this.urlErrorMessage = 'Introduce una URL válida.';
      return;
    }

    this.importStore.setRecipeUrl(url);

    this.router.navigate(['/create-recipe/import/processing'], {
      queryParams: { source: 'url' },
    });
  }

  onAddImages(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.importStore.addImages(Array.from(input.files));
    this.imageErrorMessage = '';

    input.value = '';
  }

  onClearImages(): void {
    this.importStore.clearImages();
    this.imageErrorMessage = '';
  }

  onOpenPreview(url: string): void {
    this.previewImageUrl = url;
  }

  onClosePreview(): void {
    this.previewImageUrl = null;
  }
}
