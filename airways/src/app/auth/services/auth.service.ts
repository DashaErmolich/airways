/* eslint-disable class-methods-use-this */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from 'src/app/shared/constants/local-storage-keys.enum';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = ' http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) { }

  login(user: User): Observable<User> {
    localStorage.setItem(LocalStorageKeys.AuthToken, '12345');
    return this.http.post<User>(`${this.BASE_URL}/register`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeys.AuthToken);
  }
}
