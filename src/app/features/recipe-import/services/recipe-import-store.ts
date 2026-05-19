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

  setFiles(images: File[]): void {
    this.releaseImagePreviewUrls();

    const recipeImages: RecipeImportImage[] = images.map((image) => ({
      file: image,
      previewUrl: URL.createObjectURL(image),
      section: images.length === 1 ? 'main' : '',
    }));

    this.state.set({
      images: recipeImages,
      recipeUrl: '',
      status: recipeImages.length > 0 ? 'ready' : 'idle',
      extractedRecipe: null,
      error: null,
    });
  }

  replaceImage(index: number, file: File): void {
    const currentImages = this.images();

    const updatedImages = currentImages.map((image, imageIndex) => {
      if (imageIndex !== index) {
        return image;
      }

      URL.revokeObjectURL(image.previewUrl);

      return {
        file,
        previewUrl: URL.createObjectURL(file),
        section: image.section,
      };
    });

    this.state.update((state) => ({
      ...state,
      images: updatedImages,
    }));
  }

  removeImage(index: number): void {
    const currentImages = this.images();
    const imageToRemove = currentImages[index];

    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }

    const updatedImages = currentImages.filter((_, imageIndex) => imageIndex !== index);

    this.state.update((state) => ({
      ...state,
      images: updatedImages,
      status: updatedImages.length > 0 ? 'ready' : 'idle',
    }));
  }
  //Actualiza la seccion de una imagen concreta
  updateImageSection(
    index: number,
    section: RecipeImageSection
  ): void {
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

  // Limpia el import state
  clearImport(): void {
    this.releaseImagePreviewUrls();
    this.state.set(initialState);
  }

  private releaseImagePreviewUrls(): void {
    this.state().images.forEach((image) => {
      URL.revokeObjectURL(image.previewUrl);
    });
  }

  setRecipeUrl(url: string): void {
    this.releaseImagePreviewUrls();

    this.state.set({
      images: [],
      recipeUrl: url,
      status: url ? 'ready' : 'idle',
      extractedRecipe: null,
      error: null,
    });
  }

  addImages(images: File[]): void {
    const currentImages = this.images();

    const newImages: RecipeImportImage[] = images.map((image) => ({
      file: image,
      previewUrl: URL.createObjectURL(image),
      section: '',
    }));

    const updatedImages = [...currentImages, ...newImages];

    this.state.update((state) => ({
      ...state,
      images: updatedImages.map((image) => ({
        ...image,
        section: updatedImages.length === 1 ? 'main' : image.section,
      })),
      recipeUrl: '',
      status: updatedImages.length > 0 ? 'ready' : 'idle',
      extractedRecipe: null,
      error: null,
    }));
  }

  clearImages(): void {
    this.releaseImagePreviewUrls();

    this.state.update((state) => ({
      ...state,
      images: [],
      status: 'idle',
      extractedRecipe: null,
      error: null,
    }));
  }
}
