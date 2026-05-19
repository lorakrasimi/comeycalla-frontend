import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import AuthFacade from './features/auth/services/auth-facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet/>`,
})
export class App implements OnInit {
  constructor(private authFacade: AuthFacade) {
  }

  ngOnInit(): void {
    if (this.authFacade.isAuthenticated()) {
      this.authFacade.loadCurrentUser().subscribe();
    }
  }

  protected readonly title = signal('FE-comeycalla');
}
