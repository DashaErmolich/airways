import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MatIconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'plane',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/plane.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'round-trip',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/round-trip.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'no-flight',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/no-flight.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'airplane-takeoff',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/airplane-takeoff.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'one',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/1.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'two',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/2.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'three',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/3.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'four',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/4.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'shopping_basket',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping_basket.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'user',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/user.svg'),
    );
  }
}
