import {Routes} from '@angular/router';
import {LoginPage} from './pages/login-page/login-page';
import {RegisterPage} from './pages/register-page/register-page';
import {RecoverPasswordPage} from './pages/recover-password-page/recover-password-page';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'recover-password',
    component: RecoverPasswordPage
  },
]
