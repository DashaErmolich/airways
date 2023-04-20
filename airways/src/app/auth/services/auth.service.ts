/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { LocalStorageKeys } from 'src/app/shared/constants/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(): void {
    localStorage.setItem(LocalStorageKeys.AuthToken, '12345');
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeys.AuthToken);
  }
}
