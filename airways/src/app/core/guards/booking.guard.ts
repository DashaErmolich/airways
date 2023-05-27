import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivate } from '@angular/router';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class BookingGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(): boolean | UrlTree {
    const forwardFlight: string | null = localStorage.getItem(LocalStorageKeysEnum.ForwardFlight);
    const returnFlights: string | null = localStorage.getItem(LocalStorageKeysEnum.ReturnFlight);
    return !!(forwardFlight || returnFlights) || this.router.parseUrl('');
  }
}
