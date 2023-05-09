import {
  Component, Input, OnInit, Output, EventEmitter,
} from '@angular/core';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
import moment from 'moment';
import { selectCurrency, selectDateFormat, selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import { CalendarCarouselService } from 'src/app/flight/services/calendar-carousel.service';
import { MatIconService } from 'src/app/shared/services/icon.service';
import { Flight, DatesRange } from '../../models/flight.models';

import * as FlightsActions from '../../../redux/actions/flights.actions';
import { FlightsAPIResponseIndexesEnum } from '../../constants/flights-response-indexes.enum';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  @Input() responseIndex!: number;

  @Output() flightSelectedEvent = new EventEmitter<boolean>();

  searchData!: FlightSearchState;

  flight!: Flight;

  isAuth$: Observable<boolean>;

  dateFormat$: Observable<string>;

  currency$: Observable<string>;

  flightSelected = false;

  constructor(
    private store$: Store<AppState>,
    private sliderService: CalendarCarouselService,
    private matIconService: MatIconService,
  ) {
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));
    this.currency$ = this.store$.pipe(select(selectCurrency));
  }

  ngOnInit(): void {
    this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.searchData = res;
    });

    this.sliderService.flight$.subscribe((res) => {
      this.flight = res!;
    });
  }

  searchAvailableFlights(date: string) {
    if (this.searchData.isOneWayTrip) {
      this.store$.dispatch(FlightsActions.setDepartureDate({ startTripDate: date }));
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

      this.store$.dispatch(FlightsActions.setDatesRange({ range: newRange }));
    }
  }

  getFlightTitle() {
    let title = `From ${this.searchData.from?.city} to ${this.searchData.to?.city}`;
    if (this.responseIndex === 1) {
      title = `From ${this.searchData.to?.city} to ${this.searchData.from?.city}`;
    }
    return title;
  }

  toggleFlightSelection() {
    this.flightSelected = !this.flightSelected;
    this.flightSelectedEvent.emit(this.flightSelected);
  }
}
