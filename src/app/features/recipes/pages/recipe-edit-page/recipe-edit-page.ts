import {CommonModule} from '@angular/common';
import {Component, OnInit, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {finalize} from 'rxjs';
import {RecipeFormComponent} from '../../components/recipe-form/recipe-form';
import {RecipeFormMapper} from '../../services/recipe-form-mapper';
import {RecipesApi} from '../../services/recipes-api';
import {UiLoader} from '../../../../shared/ui/ui-loader/ui-loader';

@Component({
  selector: 'app-recipe-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RecipeFormComponent, UiLoader],
  templateUrl: './recipe-edit-page.html',
  styleUrl: './recipe-edit-page.scss'
})
export class RecipeEditPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipesApi = inject(RecipesApi);
  private readonly recipeFormMapper = inject(RecipeFormMapper);

  protected form: FormGroup = this.recipeFormMapper.createEmptyForm();
  protected loading = signal(true);
  protected submitting = signal(false);
  protected imageUrl = signal<string | null>(null);

  private recipeId!: number;
  private selectedImageFile: File | null = null;
  private removeCurrentImage = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.router.navigate(['/recipes']);
      return;
    }

    this.recipeId = Number(idParam);
    this.loadRecipe();
  }

  private loadRecipe(): void {
    this.loading.set(true);

    this.recipesApi.getRecipeById(this.recipeId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (recipe) => {
          this.recipeFormMapper.fillForm(this.form, recipe);
          this.imageUrl.set(recipe.img ?? null);
        },
        error: () => {
          this.router.navigate(['/recipes']);
        }
      });
  }

  protected onImageSelected(file: File): void {
    this.selectedImageFile = file;
    this.removeCurrentImage = false;

    const previewUrl = URL.createObjectURL(file);
    this.imageUrl.set(previewUrl);
  }

  protected onImageRemoved(): void {
    this.selectedImageFile = null;
    this.removeCurrentImage = true;
    this.imageUrl.set(null);
  }

  protected onCancel(): void {
    this.router.navigate(['/recipes', this.recipeId]);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    const payload = {
      ...this.form.getRawValue(),
      removeImage: this.removeCurrentImage
    };

    this.recipesApi.updateRecipe(this.recipeId, payload)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/recipes', this.recipeId]);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
