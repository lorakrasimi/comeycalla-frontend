import {Component, inject} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {AuthForm} from '../../components/auth-form/auth-form';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthForm
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isSubmitting = false;
  serverError = '';

  // Reactive form group for email and password creation
  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.serverError = '';

    const { email, password } = this.loginForm.getRawValue();

    // Temporary login until backend is connected
    if (email === 'test@test.com' && password === '123456') {
      this.authService.setToken('fake-token');
      this.router.navigate(['/dashboard']);
      return;
    }

    this.serverError = 'Credenciales incorrectas.';
    this.isSubmitting = false;
  }
}
