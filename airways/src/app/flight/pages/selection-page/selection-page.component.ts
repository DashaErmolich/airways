/* eslint-disable max-len */
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectAvailableFlightsError, selectAvailableFlightsIsLoading, selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { AvailableFlight } from '../../models/flight.models';

import * as FlightsActions from '../../../redux/actions/flights.actions';
import { FlightsAPIResponseIndexesEnum } from '../../constants/flights-response-indexes.enum';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit, OnDestroy {
  isSearchFormVisible = false;

  flightsSearchData!: FlightSearchState;

  availableFlights!: AvailableFlight[];

  public flightsResponseIndexes = FlightsAPIResponseIndexesEnum;

  private subscriptions: Subscription[] = [];

  isLoading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  constructor(
    private store$: Store<AppState>,
    private location: Location,
  ) {
    this.isLoading$ = this.store$.pipe(select(selectAvailableFlightsIsLoading));
    this.error$ = this.store$.pipe(select(selectAvailableFlightsError));
  }

  ngOnInit(): void {
    const flightsSearchDataSubscription = this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.flightsSearchData = res;
    });
    this.store$.dispatch(FlightsActions.getAvailableFlights({ flightsSearchData: this.flightsSearchData }));

    this.subscriptions.push(flightsSearchDataSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  toggleSearchFormVisibility(): void {
    this.isSearchFormVisible = !this.isSearchFormVisible;
  }

  getPassengersQty() {
    return this.flightsSearchData.passengers
      ? this.flightsSearchData.passengers.adult + this.flightsSearchData.passengers.child + this.flightsSearchData.passengers.infant
      : '';
  }

  goBack(): void {
    this.location.back();
  }
}
