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
  }
}
