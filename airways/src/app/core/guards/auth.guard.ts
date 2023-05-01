import { Injectable } from '@angular/core';
import { Router, UrlTree, CanLoad } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  canLoad(): boolean | UrlTree {
    return !!this.authService.getToken() || this.router.parseUrl('');
  }
}
