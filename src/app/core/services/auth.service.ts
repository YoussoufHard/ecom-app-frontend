import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private isBrowser: boolean;

  constructor(
    private apiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.checkAuthStatus();
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    // Default authentication for development
    if (credentials.username === 'admin@gmail.com' && credentials.password === 'admin') {
      if (this.isBrowser) {
        localStorage.setItem('auth_token', 'default-admin-token');
      }
      this.isAuthenticatedSubject.next(true);
      return new Observable(observer => {
        observer.next({ token: 'default-admin-token' });
        observer.complete();
      });
    }
    return this.apiService.post('/auth/login', credentials);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('auth_token');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isBrowser ? !!localStorage.getItem('auth_token') : false;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('auth_token') : null;
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    this.isAuthenticatedSubject.next(!!token);
  }
}
