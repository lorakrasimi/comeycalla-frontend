import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      await firstValueFrom(this.authService.login({ email, password }));
      await this.router.navigate(['/dashboard']);
      return null;
    } catch (error: any) {
      return error?.userMessage;
    }
  }

  async register(username: string, email: string, password: string): Promise<string | null> {
    try {
      await firstValueFrom(
        this.authService.register({ username, email, password })
      );

      await this.router.navigate(['/dashboard']);
      return null;
    } catch (error: any) {
      return error?.userMessage;
    }
  }

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }

  async recoverPassword(email: string): Promise<boolean> {
    return !!email;
  }

  getCurrentUser() {
    return this.authService.user$;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadCurrentUser() {
    return this.authService.loadCurrentUser();
  }
}
