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

  constructor(private readonly profileApi: ProfileApi, private authService: AuthService) {}

  loadProfile(): Observable<User> {
    return this.profileApi.getProfile().pipe(
      tap((profile) => this.profile.set(profile))
    );
  }

  updateProfile(payload: Partial<User>, avatarFile?: File | null): Observable<User> {
    return this.profileApi.updateProfile(payload, avatarFile).pipe(
      tap((updatedProfile) => {
        this.profile.set(updatedProfile);

        this.authService.updateCurrentUser({
          id: updatedProfile.id,
          username: updatedProfile.username,
          email: updatedProfile.email,
          avatar: updatedProfile.avatar,
        });
      })
    );
  }
}
