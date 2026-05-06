import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ImageDropzone} from '../../components/image-dropzone/image-dropzone';
import {RecipeImportStore} from '../../services/recipe-import-store';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-import-from-image-page',
  standalone: true,
  imports: [ImageDropzone, UiButton],
  templateUrl: './import-from-image-page.html',
  styleUrl: './import-from-image-page.scss',
})
export class ImportFromImagePage {
  readonly sectionOptions = [
    { value: 'main', label: 'Título, descripción y datos' },
    { value: 'ingredients', label: 'Ingredientes' },
    { value: 'steps', label: 'Pasos' },
    { value: 'cover', label: 'Imagen de la receta' }
  ] as const;

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

  onProcessRecipe(): void {
    if (this.importStore.images().length === 0) {
      return;
    }

    this.router.navigate(['/recipes/create/image/processing']);
  }
}
