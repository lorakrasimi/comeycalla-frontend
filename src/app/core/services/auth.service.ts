import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {BehaviorSubject, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthResponse, LoginRequest, RegisterRequest} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  constructor(private http: HttpClient) {
  }

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();


  register(request: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, request)
      .pipe(tap((response) => this.saveSession(response)));
  }

  login(request: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(tap((response) => this.saveSession(response)));
  }


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
    localStorage.removeItem('auth_user');
    this.userSubject.next(null);
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;

  }

  private saveSession(response: AuthResponse): void {
    const user: User = {
      id: response.userId,
      username: response.username,
      email: response.email,
      avatar: '/img/avatar-default.png',
      stats: {
        savedRecipes: 0,
        createdMenus: 0,
        cookedRecipes: 0,
      },
    };

    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private loadUserFromStorage(): User | null {
    const user = localStorage.getItem(this.userKey);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }
}
