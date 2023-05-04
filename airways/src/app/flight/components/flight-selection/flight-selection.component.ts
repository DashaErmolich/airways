/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAvailableFlights } from 'src/app/redux/selectors/flights.selectors';
import { AvailableFlight } from '../../models/flight.models';

import * as FlightsActions from '../../../redux/actions/flights.actions';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  @Input() responseIndex!: number;

  @Input() searchData!: FlightSearchState;

  private subscriptions: Subscription[] = [];

  flight!: AvailableFlight;

  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    const availableFlightsSubscription = this.store$.pipe(select(selectAvailableFlights)).subscribe((res: AvailableFlight[]) => {
      this.flight = res[this.responseIndex];
    });
    this.subscriptions = [...this.subscriptions, availableFlightsSubscription];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  searchAvailableFlights(departureDate: string) {
    this.store$.dispatch(FlightsActions.setDate({ startTripDate: departureDate }));
    this.store$.dispatch(FlightsActions.getAvailableFlights({ flightsSearchData: this.searchData }));
  }

  getFlightTitle() {
    let title = `From ${this.searchData.from?.city} to ${this.searchData.to?.city}`;
    if (this.responseIndex === 1) {
      title = `From ${this.searchData.to?.city} to ${this.searchData.from?.city}`;
    }
    return title;
  }
}
