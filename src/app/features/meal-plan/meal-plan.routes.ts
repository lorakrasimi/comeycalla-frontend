import {Routes} from '@angular/router';

export const MEAL_PLAN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/create-meal-plan-page/create-meal-plan-page').then(
        (m) => m.CreateMealPlanPage
      )
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./pages/meal-plan-result-page/meal-plan-result-page').then(
        (m) => m.MealPlanResultPage
      )
  },
  {
    path: 'shopping-list',
    loadComponent: () =>
      import('./pages/shopping-list-page/shopping-list-page').then(
        (m) => m.ShoppingListPage
      )
  }
];
