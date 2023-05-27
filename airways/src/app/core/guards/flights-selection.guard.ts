import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivate } from '@angular/router';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class FlightsSelectionGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(): boolean | UrlTree {
    const searchParams: string | null = localStorage.getItem(LocalStorageKeysEnum.SearchParams);
    return !!searchParams || this.router.parseUrl('');
  }
}
