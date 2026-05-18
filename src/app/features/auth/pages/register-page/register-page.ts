import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthForm} from '../../components/auth-form/auth-form';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {AuthFacade} from '../../services/auth-facade';


function passwordsMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : {passwordsMismatch: true};
}

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    AuthForm,
    RouterLink,
    UiButton
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  isSubmitting = false;
  serverError = '';

  readonly registerForm = this.fb.nonNullable.group(
    {
      loginName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {validators: passwordsMatchValidator}
  );

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }

  get loginName() {
    return this.registerForm.controls['loginName'];
  }

  constructor(private authFacade: AuthFacade) {
  }

  async submit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.serverError = '';
    this.cdr.markForCheck();

    try {
      const {loginName, email, password} = this.registerForm.getRawValue();

      const errorMessage = await this.authFacade.register(loginName, email, password);

      if (errorMessage) {
        this.serverError = errorMessage;
      }
    } finally {
      this.isSubmitting = false;
      this.cdr.markForCheck();

    }
  }
}
