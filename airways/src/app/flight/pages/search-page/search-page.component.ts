import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BookingStepsEnum } from 'src/app/core/constants/booking-steps.constants';

import { AppState } from 'src/app/redux/state.models';
import * as BookingActions from 'src/app/redux/actions/booking.actions';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})

export class SearchPageComponent implements OnInit {
  constructor(
    private store$: Store<AppState>,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(BookingActions.setStep({ step: BookingStepsEnum.First }));
    this.localStorage.resetFlightsSelection();
  }
}
