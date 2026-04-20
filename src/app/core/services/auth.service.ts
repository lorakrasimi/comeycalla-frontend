import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);

  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;

  }
}
