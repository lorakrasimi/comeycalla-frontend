import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ImageDropzone} from '../../components/image-dropzone/image-dropzone';
import {ImagePreviewCard} from '../../components/image-preview-card/image-preview-card';
import {RecipeImportStore} from '../../services/recipe-import-store';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-import-from-image-page',
  standalone: true,
  imports: [ImageDropzone, ImagePreviewCard, UiButton],
  templateUrl: './import-from-image-page.html',
  styleUrl: './import-from-image-page.scss',
})
export class ImportFromImagePage {

  constructor(
    private router: Router,
    protected importStore: RecipeImportStore
  ) {
  }

  onFileSelected(file: File): void {
    this.importStore.setFile(file);
  }

  onChangeImage(): void {
    this.importStore.clearFile();
  }

  onProcessRecipe(): void {
    if (!this.importStore.file()) {
      return;
    }

    this.router.navigate(['/recipes/create/image/processing']);
  }
}
