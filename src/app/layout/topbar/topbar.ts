import { Component } from '@angular/core';
import AuthFacade from '../../features/auth/services/auth-facade';
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {UiButton} from '../../shared/ui/ui-button/ui-button';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../core/models/user.model';
import {AvatarCell} from '../../shared/components/avatar-cell/avatar-cell';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [
    SearchBar,
    UiButton,
    RouterLink,
    AvatarCell,
    AsyncPipe
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  protected user$: Observable<User | null>;

  constructor(private authFacade: AuthFacade) {
   this.user$ = this.authFacade.getCurrentUser();
  }

  async logout(): Promise<void> {
    await this.authFacade.logout();
  }
}
