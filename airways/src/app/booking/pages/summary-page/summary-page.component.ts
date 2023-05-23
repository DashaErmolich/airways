import { Component, OnInit } from '@angular/core';
import { BookingStepsEnum } from 'src/app/core/constants/booking-steps.constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import * as BookingActions from 'src/app/redux/actions/booking.actions';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(BookingActions.setStep({ step: BookingStepsEnum.Fourth }));
  }
}
