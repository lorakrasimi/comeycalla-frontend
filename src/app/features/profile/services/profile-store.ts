import {Injectable, signal} from '@angular/core';
import {ProfileApi} from './profile-api';
import {User} from '../../../core/models/user.model';
import {Observable, tap} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  readonly profile = signal<User | null>(null);

  constructor(
    private readonly profileApi: ProfileApi,
    private readonly authService: AuthService
  ) {}

  loadProfile(): Observable<User> {
    return this.profileApi.getProfile().pipe(
      tap((profile) => {
        this.profile.set(profile);
        this.syncAuthUser(profile);
      })
    );
  }

  updateProfile(payload: Partial<User>, avatarFile?: File | null): Observable<User> {
    return this.profileApi.updateProfile(payload, avatarFile).pipe(
      tap((updatedProfile) => {
        this.profile.set(updatedProfile);
        this.syncAuthUser(updatedProfile);
      })
    );
  }

  private syncAuthUser(profile: User): void {
    this.authService.updateCurrentUser({
      id: profile.id,
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar,
    });
  }
}
