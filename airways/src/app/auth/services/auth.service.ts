/* eslint-disable class-methods-use-this */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { ActiveUser, User } from 'src/app/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = ' http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signUp(user: User): Observable<ActiveUser> {
    return this.http.post<ActiveUser>(`${this.BASE_URL}/register`, user);
  }

  login(user: User): Observable<ActiveUser> {
    return this.http.post<ActiveUser>(`${this.BASE_URL}/login`, user);
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
}
