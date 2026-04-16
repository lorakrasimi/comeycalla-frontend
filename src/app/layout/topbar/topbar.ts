import { Component } from '@angular/core';
import {AuthFacade} from '../../features/auth/services/auth-facade';
import {SearchBar} from '../../shared/components/search-bar/search-bar';
import {UiButton} from '../../shared/ui/ui-button/ui-button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [
    SearchBar,
    UiButton,
    RouterLink
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  constructor(private authFacade: AuthFacade) {}

  async logout(): Promise<void> {
    await this.authFacade.logout();
  }
}
