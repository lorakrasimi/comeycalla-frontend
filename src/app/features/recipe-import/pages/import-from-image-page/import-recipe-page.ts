import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ImageDropzone} from '../../components/image-dropzone/image-dropzone';
import {RecipeImportStore} from '../../services/recipe-import-store';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-import-from-image-page',
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
    { value: 'cover', label: 'Imagen de la receta' }
  ] as const;

  recipeUrl = '';
  urlErrorMessage = '';

  constructor(
    private router: Router,
    protected importStore: RecipeImportStore
  ) {}

  onFilesSelected(files: File[]): void {
    this.importStore.setFiles(files);
  }

  onSectionChange(index: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.importStore.updateImageSection(index, select.value as any);
  }

  onRemoveImage(index: number): void {
    this.importStore.removeImage(index);
  }

  onProcessImageRecipe(): void {
    if (this.importStore.images().length === 0) {
      return;
    }

    this.router.navigate(['/create-recipe/image/processing']);
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

    this.router.navigate(['/create-recipe/image/processing'], {
      queryParams: { source: 'url' }
    });
  }
}
