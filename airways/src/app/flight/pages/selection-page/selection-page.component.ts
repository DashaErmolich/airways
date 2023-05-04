/* eslint-disable max-len */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { AvailableFlight } from '../../models/flight.models';

import * as FlightsActions from '../../../redux/actions/flights.actions';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit {
  isSearchFormVisible = false;

  flightsSearchData$!: Observable<FlightSearchState>;

  flightsSearchData!: FlightSearchState;

  availableFlights!: AvailableFlight[];

  constructor(
    private store$: Store<AppState>,
    private location: Location,
  ) {
    this.flightsSearchData$ = this.store$.pipe(select(selectFlightSearchData));
  }

  ngOnInit(): void {
    this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.flightsSearchData = res;
    });
    this.store$.dispatch(FlightsActions.getAvailableFlights({ flightsSearchData: this.flightsSearchData }));
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
