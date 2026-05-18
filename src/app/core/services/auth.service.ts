import {Injectable} from '@angular/core';
import {UserAuth} from '../models/user.model';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthResponse, LoginRequest, RegisterRequest} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly userApiUrl = 'http://localhost:8080/api/users';

  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  constructor(private http: HttpClient) {
  }

  private userSubject = new BehaviorSubject<UserAuth | null>(null);
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

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('auth_user');
    this.userSubject.next(null);
  }

  private saveSession(response: AuthResponse): void {
    const user: UserAuth = {
      id: response.userId,
      username: response.username,
      email: response.email,
      avatar: response.avatar,
    };

    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  loadCurrentUser(): Observable<UserAuth> {
    return this.http.get<UserAuth>(`${this.userApiUrl}/profile`).pipe(
      tap((user) => {
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  updateCurrentUser(user: UserAuth): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

}
