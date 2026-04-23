import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {User} from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileApi {
  getProfile(): Observable<User> {
    return of({
      id: 1,
      username: 'Usuario Demo',
      email: 'usuario@comeycalla.com',
      bio: 'Amante de la cocina italiana y la repostería',
      avatar: null,
      stats: {
        savedRecipes: 24,
        createdMenus: 8,
        cookedRecipes: 156
      }
    }).pipe(delay(300));
  }

  updateProfile(payload: Partial<User>): Observable<User> {
    return of({
      id: 1,
      username: payload.username ?? 'Usuario Demo',
      email: payload.email ?? 'usuario@comeycalla.com',
      avatar: payload.avatar ?? null,
      stats: {
        savedRecipes: 24,
        createdMenus: 8,
        cookedRecipes: 156
      }
    }).pipe(delay(300));
  }

}
