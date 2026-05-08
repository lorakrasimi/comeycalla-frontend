import {ChangeDetectorRef, Component, inject} from '@angular/core';
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
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthForm,
    UiButton
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(private authFacade: AuthFacade) {
  }


  isSubmitting = false;
  serverError = '';

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

  async submit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.serverError = '';
    // Used because Angular was not automatically updating the view after async login,
    // so I manually trigger change detection to reflect updated state (error/loading)
    this.cdr.markForCheck();

    try {
      const {email, password} = this.loginForm.getRawValue();

      const errorMessage = await this.authFacade.login(email, password);

      if (errorMessage) {
        this.serverError = errorMessage;
      }
    } finally {
      this.isSubmitting = false;
      this.cdr.markForCheck();
    }
  }

}
