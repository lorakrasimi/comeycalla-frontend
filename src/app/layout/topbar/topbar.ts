import {Component} from '@angular/core';
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {UiButton} from '../../shared/ui/ui-button/ui-button';
import {Router, RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {UserAuth} from '../../core/models/user.model';
import {AvatarCell} from '../../shared/components/avatar-cell/avatar-cell';
import {AsyncPipe} from '@angular/common';
import AuthFacade from '../../features/auth/services/auth-facade';

@Component({
  selector: 'app-topbar',
  imports: [
    SearchBar,
    UiButton,
    RouterLink,
    AvatarCell,
    AsyncPipe,
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  protected user$: Observable<UserAuth | null>;

  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {
    this.user$ = this.authFacade.loadCurrentUser();
  }

  async logout(): Promise<void> {
    await this.authFacade.logout();
  }

  onTopbarSearch(value: string): void {
    if (!value) return;

    this.router.navigate(['/recipes'], {
      queryParams: {search: value}
    });
  }
}
