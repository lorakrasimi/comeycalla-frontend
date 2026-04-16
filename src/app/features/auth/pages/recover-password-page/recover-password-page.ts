import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthForm } from '../../components/auth-form/auth-form';

@Component({
  selector: 'app-recover-password-page',
  imports: [ReactiveFormsModule, RouterLink, AuthForm],
  templateUrl: './recover-password-page.html',
  styleUrl: './recover-password-page.scss',
})
export class RecoverPasswordPage {
  private readonly fb = inject(FormBuilder);

  isSubmitting = false;
  successMessage = '';

  readonly recoverForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() {
    return this.recoverForm.controls.email;
  }

  submit(): void {
    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';

    setTimeout(() => {
      this.isSubmitting = false;
      this.successMessage = 'Te hemos enviado un enlace para restablecer tu contraseña.';
    }, 500);
  }
}
