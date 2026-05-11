import {CommonModule} from '@angular/common';
import {Component, OnInit, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';

import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {UiLoader} from '../../../../shared/ui/ui-loader/ui-loader';
import {AvatarCell} from '../../../../shared/components/avatar-cell/avatar-cell';
import {ProfileStore} from '../../services/profile-store';

@Component({
  selector: 'app-profile-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiButton,
    UiLoader,
    AvatarCell
  ],
  templateUrl: './profile-edit-page.html',
  styleUrl: './profile-edit-page.scss'
})
export class ProfileEditPage implements OnInit {
  private readonly fb = inject(FormBuilder);

  constructor(private profileStore: ProfileStore, private router: Router) {
  }

  protected readonly loading = signal(true);
  protected readonly submitting = signal(false);

  protected avatarUrl: string | null = null;
  protected avatarFile: File | null = null;
  protected removeAvatar = false;

  protected readonly form: FormGroup = this.fb.group({
    username: this.fb.nonNullable.control('', [Validators.required]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this.profileStore.loadProfile()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((profile) => {
        this.avatarUrl = profile.avatar;

        this.form.patchValue({
          username: profile.username,
          email: profile.email,
        });
      });
  }

  protected goBack(): void {
    this.router.navigate(['/profile']);
  }

  protected onCancel(): void {
    this.router.navigate(['/profile']);
  }

  protected onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.avatarFile = file;
    this.removeAvatar = false;

    this.avatarUrl = URL.createObjectURL(file);
  }

  protected onAvatarRemoved(): void {
    this.avatarFile = null;
    this.avatarUrl = null;
    this.removeAvatar = true;
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.profileStore.updateProfile(
      this.form.getRawValue(),
      this.avatarFile
    )
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }
}
