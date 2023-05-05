/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAvailableFlights, selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';
import { AvailableFlight, DatesRange } from '../../models/flight.models';

import * as FlightsActions from '../../../redux/actions/flights.actions';
import { FlightsAPIResponseIndexesEnum } from '../../constants/flights-response-indexes.enum';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  @Input() responseIndex!: number;

  searchData!: FlightSearchState;

  flight!: AvailableFlight;

  private subscriptions: Subscription[] = [];

  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    const availableFlightsSubscription = this.store$.pipe(select(selectAvailableFlights)).subscribe((res: AvailableFlight[]) => {
      this.flight = res[this.responseIndex];
    });

    const flightsSearchDataSubscription = this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.searchData = res;
    });
    this.subscriptions = [...this.subscriptions, availableFlightsSubscription, flightsSearchDataSubscription];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  searchAvailableFlights(date: string) {
    if (this.searchData.isOneWayTrip) {
      this.store$.dispatch(FlightsActions.setDate({ startTripDate: date }));
    }

    if (this.searchData.isRoundTrip) {
      const newRange: DatesRange = {
        start: this.searchData.rangeTripDates!.start,
        end: this.searchData.rangeTripDates!.end,
      };

      if (this.responseIndex === FlightsAPIResponseIndexesEnum.OneWayFlightResponseIndex) {
        newRange.start = date;

        if (moment(newRange.start).diff(moment(newRange.end)) > 0) {
          newRange.end = newRange.start;
        }
      }

      if (this.responseIndex === FlightsAPIResponseIndexesEnum.ReturnFlightResponseIndex) {
        newRange.end = date;
      }

      this.store$.dispatch(FlightsActions.setRange({ range: newRange }));
    }

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
