import { Injectable, signal } from '@angular/core';
import {ExtractedRecipe, RecipeImageSection, RecipeImportImage} from '../../../core/models/recipe-import.model';

export type RecipeImportStatus =
  | 'idle'
  | 'ready'
  | 'processing'
  | 'success'
  | 'error';

export interface RecipeImportState {
  images: RecipeImportImage[];
  recipeUrl: string;
  status: RecipeImportStatus;
  extractedRecipe: ExtractedRecipe | null;
  error: string | null;
}

const initialState: RecipeImportState = {
  images: [],
  recipeUrl: '',
  status: 'idle',
  extractedRecipe: null,
  error: null,
};

@Injectable({ providedIn: 'root' })
export class RecipeImportStore {
  private readonly state = signal<RecipeImportState>(initialState);

  readonly images = () => this.state().images;
  readonly files = () => this.state().images.map((image) => image.file);
  readonly previewUrls = () => this.state().images.map((image) => image.previewUrl);
  readonly status = () => this.state().status;
  readonly extractedRecipe = () => this.state().extractedRecipe;
  readonly error = () => this.state().error;
  readonly recipeUrl = () => this.state().recipeUrl;

  setFiles(files: File[]): void {
    this.clearPreviewUrls();

    const images: RecipeImportImage[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      section: 'main',
    }));

    this.state.set({
      images,
      recipeUrl: '',
      status: images.length > 0 ? 'ready' : 'idle',
      extractedRecipe: null,
      error: null,
    });
  }

  updateImageSection(index: number, section: RecipeImageSection): void {
    this.state.update((state) => {
      const images = [...state.images];

      if (!images[index]) {
        return state;
      }

      images[index] = {
        ...images[index],
        section,
      };

      return {
        ...state,
        images,
      };
    });
  }

  removeImage(index: number): void {
    this.state.update((state) => {
      const images = [...state.images];
      const image = images[index];

      if (image) {
        URL.revokeObjectURL(image.previewUrl);
        images.splice(index, 1);
      }

      return {
        ...state,
        images,
        status: images.length > 0 ? 'ready' : 'idle',
      };
    });
  }

  setProcessing(): void {
    this.state.update((state) => ({
      ...state,
      status: 'processing',
      error: null,
    }));
  }

  setExtractedRecipe(recipe: ExtractedRecipe): void {
    this.state.update((state) => ({
      ...state,
      status: 'success',
      extractedRecipe: recipe,
      error: null,
    }));
  }

  setError(error: string): void {
    this.state.update((state) => ({
      ...state,
      status: 'error',
      error,
    }));
  }

  clearFiles(): void {
    this.clearPreviewUrls();
    this.state.set(initialState);
  }

  reset(): void {
    this.clearFiles();
  }

  private clearPreviewUrls(): void {
    this.state().images.forEach((image) => {
      URL.revokeObjectURL(image.previewUrl);
    });
  }

  setRecipeUrl(url: string): void {
    this.clearPreviewUrls();

    this.state.set({
      images: [],
      recipeUrl: url,
      status: url ? 'ready' : 'idle',
      extractedRecipe: null,
      error: null,
    });
  }
}
