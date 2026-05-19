import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../core/models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileApi {
  private readonly baseUrl = `${environment.apiUrl}//users/profile`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(this.baseUrl);
  }

  updateProfile(payload: Partial<User>, avatarFile?: File | null): Observable<User> {
    const formData = new FormData();

    formData.append(
      'profile',
      new Blob([JSON.stringify({
        username: payload.username,
        email: payload.email
      })], { type: 'application/json' })
    );

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.http.put<User>(
      this.baseUrl,
      formData
    );
  }
}
