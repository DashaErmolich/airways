/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { ActiveUser, User } from 'src/app/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'https://airways-auth.onrender.com';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signUp(user: User): Observable<ActiveUser> {
    return this.http.post<ActiveUser>(`${this.BASE_URL}/register`, user).pipe(catchError(this.handleError));
  }

  login(user: User): Observable<ActiveUser> {
    return this.http.post<ActiveUser>(`${this.BASE_URL}/login`, user).pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeysEnum.AccessToken);
    localStorage.removeItem(LocalStorageKeysEnum.User);
    this.router.navigateByUrl('');
  }

  getToken(): string | null {
    return localStorage.getItem(LocalStorageKeysEnum.AccessToken);
  }

  getDefaultUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/defaultUsers`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('Something bad happened. Please try again later.'));
    }
    return throwError(() => new Error(error.error));
  }
}
