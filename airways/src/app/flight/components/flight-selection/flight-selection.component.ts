import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  selectAvailableFlights, selectAvailableFlightsError,
  selectAvailableFlightsIsLoading, selectFlightSearchData,
} from 'src/app/redux/selectors/flights.selectors';
import { AvailableFlight } from '../../models/flight.models';

import * as FlightsActions from '../../../redux/actions/flights.actions';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  @Input() responseIndex!: number;

  availableFlights$!: Observable<AvailableFlight[]>;

  isLoading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  searchData$!: Observable<FlightSearchState>;

  availableFlights!: AvailableFlight[];

  private subscriptions: Subscription[] = [];

  searchData!: FlightSearchState;

  constructor(
    private store$: Store<AppState>,
  ) {
    this.availableFlights$ = this.store$.pipe(select(selectAvailableFlights));
    this.isLoading$ = this.store$.pipe(select(selectAvailableFlightsIsLoading));
    this.error$ = this.store$.pipe(select(selectAvailableFlightsError));
    this.searchData$ = this.store$.pipe(select(selectFlightSearchData));
  }

  ngOnInit(): void {
    const availableFlightsSubscription = this.availableFlights$.subscribe((res) => {
      this.availableFlights = res;
    });
    // eslint-disable-next-line max-len
    const searchDataSubscription = this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.searchData = res;
    });
    // eslint-disable-next-line max-len
    this.subscriptions = [...this.subscriptions, availableFlightsSubscription, searchDataSubscription];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  searchAvailableFlights(departureDate: string) {
    this.store$.dispatch(FlightsActions.setDate({ startTripDate: departureDate }));
    // eslint-disable-next-line max-len
    this.store$.dispatch(FlightsActions.getAvailableFlights({ flightsSearchData: this.searchData }));
  }
}
