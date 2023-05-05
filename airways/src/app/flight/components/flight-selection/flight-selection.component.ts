import {
  Component, Input, OnInit,
} from '@angular/core';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectActiveFlights, selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';
import { selectCurrency, selectDateFormat, selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import { AvailableFlight, DatesRange } from '../../models/flight.models';

import * as FlightsActions from '../../../redux/actions/flights.actions';
import { FlightsAPIResponseIndexesEnum } from '../../constants/flights-response-indexes.enum';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  @Input() responseIndex!: number;

  searchData!: FlightSearchState;

  flight!: AvailableFlight;

  public isAuth$: Observable<boolean>;

  public dateFormat$: Observable<string>;

  public currency$: Observable<string>;

  constructor(
    private store$: Store<AppState>,
    private fl: FlightsService,
  ) {
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));
    this.currency$ = this.store$.pipe(select(selectCurrency));
  }

  ngOnInit(): void {
    this.store$.pipe(select(selectActiveFlights)).subscribe((res: AvailableFlight[]) => {
      this.flight = res[this.responseIndex];
    });

    this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.searchData = res;
    });
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

        if (moment(newRange.start).diff(moment(newRange.end)) > 0) {
          newRange.end = newRange.start;
        }
      }

      this.store$.dispatch(FlightsActions.setRange({ range: newRange }));
    }

    // this.store$.dispatch(FlightsActions.getAvailableFlights({ flightsSearchData: this.searchData }));
  }

  getFlightTitle() {
    let title = `From ${this.searchData.from?.city} to ${this.searchData.to?.city}`;
    if (this.responseIndex === 1) {
      title = `From ${this.searchData.to?.city} to ${this.searchData.from?.city}`;
    }
    return title;
  }
}
