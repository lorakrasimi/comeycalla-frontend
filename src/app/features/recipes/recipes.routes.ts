import { Routes } from '@angular/router';

export const RECIPES_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/recipe-create-manual-page/recipe-create-manual-page').then(m => m.RecipeCreateManualPage)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/recipe-detail-page/recipe-detail-page').then(m => m.RecipeDetailPage)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/recipe-edit-page/recipe-edit-page').then(m => m.RecipeEditPage)
  }
];
