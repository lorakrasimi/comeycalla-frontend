import {Injectable} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
class AuthFacade {
  constructor(
    private authService: AuthService,
    private router: Router,
    private profileStore: ProfileStore
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      await firstValueFrom(
        this.authService.login({email, password})
      );

      await this.router.navigate(['/dashboard']);
      return null;

    } catch (error: any) {
      return error?.userMessage ?? 'Ha ocurrido un error inesperado.';
    }
  }

  async register(username: string, email: string, password: string): Promise<string | null> {
    try {
      await firstValueFrom(
        this.authService.register({
          username,
          email,
          password,
        })
      );

      await this.router.navigate(['/dashboard']);
      return null;
    } catch (error: any) {
      return error?.userMessage ?? 'Ha ocurrido un error inesperado.';
    }
  }

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }

  async recoverPassword(email: string): Promise<boolean> {
    if (!email) {
      return false;
    }

    return true;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadCurrentUser() {
    return this.profileStore.loadProfile();
  }
}

export default AuthFacade;
