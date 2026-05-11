import {Component, computed, OnInit, signal} from '@angular/core';
import {ProfileStore} from '../../services/profile-store';
import {Router, RouterLink} from '@angular/router';
import {finalize} from 'rxjs';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {UiLoader} from '../../../../shared/ui/ui-loader/ui-loader';
import {AvatarCell} from '../../../../shared/components/avatar-cell/avatar-cell';

@Component({
  selector: 'app-profile-page',
  imports: [
    UiButton,
    RouterLink,
    UiLoader,
    AvatarCell
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  constructor(private profileStore: ProfileStore, private router: Router) {
  }

  protected readonly loading = signal(true);
  protected readonly profile = computed(() => this.profileStore.profile());

  ngOnInit(): void {
    this.profileStore.loadProfile()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        error: () => this.loading.set(false)
      });
  }

  protected goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
