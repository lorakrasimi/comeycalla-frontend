import {Injectable} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ProfileStore} from '../../profile/services/profile-store';

@Injectable({
  providedIn: 'root',
})
class AuthFacade {
  readonly user$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileStore: ProfileStore
  ) {
    this.user$ = this.authService.user$;
  }

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
