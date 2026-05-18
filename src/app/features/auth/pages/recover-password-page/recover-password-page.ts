import {Component, inject} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {AuthForm} from '../../components/auth-form/auth-form';
import AuthFacade from '../../services/auth-facade';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';

@Component({
  selector: 'app-recover-password-page',
  imports: [ReactiveFormsModule, RouterLink, AuthForm, UiButton],
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

  constructor(private authFacade: AuthFacade) {
  }

  async submit(): Promise<void> {
    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';

    const {email} = this.recoverForm.getRawValue();
    const success = await this.authFacade.recoverPassword(email);

    if (success) {
      this.successMessage =
        'Te hemos enviado un enlace para restablecer tu contraseña.';
    }

    this.isSubmitting = false;
  }
}
