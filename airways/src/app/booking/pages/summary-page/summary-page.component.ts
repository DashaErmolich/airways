import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { selectForwardFlight, selectReturnFlight } from 'src/app/redux/selectors/flights.selectors';
import { Flight } from 'src/app/flight/models/flight.models';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  forwardFlight!:Flight | null;

  returnFlight!: Flight | null;

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

  ngOnInit(): void {
    this.store$.pipe(select(selectForwardFlight)).subscribe((flight) => {
      this.forwardFlight = flight;
    });
    this.store$.pipe(select(selectReturnFlight)).subscribe((flight) => {
      this.returnFlight = flight;
    });
  }
}
