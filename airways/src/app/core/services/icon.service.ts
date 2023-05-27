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
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social-network/google.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social-network/facebook.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'plane',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/flights/plane.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'round-trip',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/flights/round-trip.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'no-flight',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/flights/no-flight.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'airplane-takeoff',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/flights/airplane-takeoff.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'one',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stepper/1.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'two',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stepper/2.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'three',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stepper/3.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'four',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stepper/4.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'shopping_basket',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/header/shopping_basket.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'user',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/header/user.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/footer/github-mark.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'clock',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/flights/clock-history.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'pass-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/passengers/passengers-icon.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'pass-details',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/passengers/passengers-details.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'pass-assistance',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/passengers/passengers-assistance.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'cabin-bag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/passengers/cabin-bag.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'checked-bag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/passengers/checked-bag.svg'),
    );
  }
}
