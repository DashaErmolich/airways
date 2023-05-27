import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivate } from '@angular/router';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class BookingSummaryGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(): boolean | UrlTree {
    const bookingDetails: string | null = localStorage.getItem(LocalStorageKeysEnum.BookingDetails);
    return !!bookingDetails || this.router.parseUrl('');
  }
}
