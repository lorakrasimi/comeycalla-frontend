import {Injectable, signal} from '@angular/core';
import {ProfileApi} from './profile-api';
import {User} from '../../../core/models/user.model';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  readonly profile = signal<User | null>(null);

  constructor(private readonly profileApi: ProfileApi) {}

  loadProfile(): Observable<User> {
    return this.profileApi.getProfile().pipe(
      tap((profile) => this.profile.set(profile))
    );
  }

  updateProfile(payload: any, avatarFile?: File | null) {
    return this.profileApi.updateProfile(payload, avatarFile);
  }
}
