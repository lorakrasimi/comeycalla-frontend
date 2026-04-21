import { Injectable, signal } from '@angular/core';

export type RecipeImportStatus = 'idle' | 'ready' | 'processing' | 'success' | 'error';

export interface RecipeImportState {
  file: File | null;
  previewUrl: string | null;
  status: RecipeImportStatus;
  error: string | null;
}

const initialState: RecipeImportState = {
  file: null,
  previewUrl: null,
  status: 'idle',
  error: null,
};

@Injectable({ providedIn: 'root' })
export class RecipeImportStore {
  private readonly state = signal<RecipeImportState>(initialState);

  readonly file = () => this.state().file;
  readonly previewUrl = () => this.state().previewUrl;
  readonly status = () => this.state().status;
  readonly error = () => this.state().error;

  setFile(file: File): void {
    this.clearPreviewUrl();

    const previewUrl = URL.createObjectURL(file);

    this.state.set({
      file,
      previewUrl,
      status: 'ready',
      error: null,
    });
  }

  clearFile(): void {
    this.clearPreviewUrl();
    this.state.set(initialState);
  }

  setProcessing(): void {
    this.state.update((state) => ({
      ...state,
      status: 'processing',
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

  reset(): void {
    this.clearFile();
  }

  private clearPreviewUrl(): void {
    const previewUrl = this.state().previewUrl;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }
}
