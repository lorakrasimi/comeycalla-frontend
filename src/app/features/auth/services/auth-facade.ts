import {Injectable} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  //TODO: arreglar cuando esté el backend
  async login(email: string, password: string): Promise<boolean> {
    // Simulación hasta tener backend
    if (email === 'test@test.com' && password === '123456') {
      this.authService.setToken('fake-token');
      await this.router.navigate(['/dashboard']);
      return true;
    }

    return false;
  }

  //TODO: arreglar cuando esté el backend
  async register(email: string, password: string): Promise<boolean> {
    if (!email || !password) {
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    await this.router.navigate(['/login']);

    return true;
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
}
