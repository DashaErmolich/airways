/* eslint-disable class-methods-use-this */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageKeysEnum } from 'src/app/shared/constants/local-storage-keys.enum';
import { ActiveUser, User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = ' http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) { }

  signUp(user: User): Observable<ActiveUser> {
    return this.http.post<ActiveUser>(`${this.BASE_URL}/register`, user);
  }

  login(user: User): Observable<ActiveUser> {
    return this.http.post<ActiveUser>(`${this.BASE_URL}/login`, user);
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeysEnum.AccessToken);
  }

  getToken(): string | null {
    return localStorage.getItem(LocalStorageKeysEnum.AccessToken);
  }
}
