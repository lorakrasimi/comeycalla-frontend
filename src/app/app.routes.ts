import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },

  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout').then(
        (m) => m.AuthLayout
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login-page/login-page').then(
            (m) => m.LoginPage
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register-page/register-page').then(
            (m) => m.RegisterPage
          ),
      },
      {
        path: 'recover-password',
        loadComponent: () =>
          import(
            './features/auth/pages/recover-password-page/recover-password-page'
            ).then((m) => m.RecoverPasswordPage),
      },
    ],
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/app-shell/app-shell').then(
        (m) => m.AppShell
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then(
            (m) => m.PROFILE_ROUTES
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page/dashboard-page')
            .then((m) => m.DashboardPage),
      },
      {
        path: 'recipes',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/recipes/pages/recipes-list-page/recipes-list-page'
                ).then((m) => m.RecipesListPage),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './features/recipes/pages/recipe-detail-page/recipe-detail-page'
                ).then((m) => m.RecipeDetailPage),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import(
                './features/recipes/pages/recipe-edit-page/recipe-edit-page'
                ).then((m) => m.RecipeEditPage),
          },
        ],
      },
      {
        path: 'create-recipe',
        loadComponent: () =>
          import('./features/recipe-create/pages/add-recipe-page')
            .then((m) => m.AddRecipePage),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'import',
          },
          {
            path: 'manual',
            loadComponent: () =>
              import(
                './features/recipes/pages/recipe-create-manual-page/recipe-create-manual-page'
                ).then((m) => m.RecipeCreateManualPage),
          },
          {
            path: 'import',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import(
                    './features/recipe-import/pages/import-recipe-page/import-recipe-page'
                    ).then((m) => m.ImportRecipePage),
              },
              {
                path: 'processing',
                loadComponent: () =>
                  import(
                    './features/recipe-import/pages/import-processing-page/import-processing-page'
                    ).then((m) => m.ImportProcessingPage),
              },
              {
                path: 'review',
                loadComponent: () =>
                  import(
                    './features/recipe-import/pages/import-review-page/import-review-page'
                    ).then((m) => m.ImportReviewPage),
              },
            ],
          },
        ],
      },
      {
        path: 'meal-plan',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/meal-plan/pages/create-meal-plan-page/create-meal-plan-page'
                ).then((m) => m.CreateMealPlanPage),
          },
          {
            path: 'result',
            loadComponent: () =>
              import(
                './features/meal-plan/pages/meal-plan-result-page/meal-plan-result-page'
                ).then((m) => m.MealPlanResultPage),
          },
          {
            path: 'shopping-list',
            loadComponent: () =>
              import(
                './features/meal-plan/pages/shopping-list-page/shopping-list-page'
                ).then((m) => m.ShoppingListPage),
          },
        ],
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
