import { Component, OnInit } from '@angular/core';
import { StepsEnum } from 'src/app/core/constants/steps.enum';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as BookingActions from '../../../redux/actions/booking.actions';

import { flightData } from '../../../shared/mocked/flight-data-response';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private store$: Store<AppState>,
  ) {
    this.matIconRegistry.addSvgIcon(
      'summary-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/summary-logo.svg'),
    );
  }
}
