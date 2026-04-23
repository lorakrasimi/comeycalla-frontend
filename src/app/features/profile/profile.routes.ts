import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile-page/profile-page').then(
        (m) => m.ProfilePage
      )
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./pages/profile-edit-page/profile-edit-page').then(
        (m) => m.ProfileEditPage
      )
  }
];
