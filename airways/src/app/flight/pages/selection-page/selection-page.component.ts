/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import { Location } from '@angular/common';
import {
  Component, OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectFlightSearchData, selectSelectedFlightError, selectSelectedFlightIsLoading,
} from 'src/app/redux/selectors/flights.selectors';
import {
  AppState, TripSearchState,
} from 'src/app/redux/state.models';
import { selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import { SlidesOutputData } from 'ngx-owl-carousel-o';
import { StepsEnum } from 'src/app/core/constants/steps.enum';
import * as FlightsActions from '../../../redux/actions/flights.actions';
import * as BookingActions from '../../../redux/actions/booking.actions';
import { FlightsTypesEnum } from '../../constants/flights-response-indexes.enum';
import { Flight } from '../../models/flight.models';
import { Slide } from '../../models/slider.models';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit {
  isSearchFormVisible = false;

  flightsTypes = FlightsTypesEnum;

  isLoading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  searchData$!: Observable<TripSearchState>;

  isAuth$: Observable<boolean>;

  slides: Slide[] = [];

  activeSlides!: SlidesOutputData;

  forwardFlight!: Flight;

  directFlight!: Flight;

  isFlightsSelected = false;

  constructor(
    private store$: Store<AppState>,
    private location: Location,
  ) {
    this.isLoading$ = this.store$.pipe(select(selectSelectedFlightIsLoading));
    this.error$ = this.store$.pipe(select(selectSelectedFlightError));
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));

    this.searchData$ = this.store$.pipe(select(selectFlightSearchData));
  }

  ngOnInit(): void {
    this.searchData$.subscribe((searchData) => {
      this.store$.dispatch(FlightsActions.searchFlights({ isReturn: false }));
      if (searchData.isRoundTrip) {
        this.store$.dispatch(FlightsActions.searchFlights({ isReturn: true }));
      }
    });

    this.store$.dispatch(BookingActions.setStep({ step: StepsEnum.Second }));
  }

  toggleSearchFormVisibility(event: boolean): void {
    this.isSearchFormVisible = event;
  }

  goBack(): void {
    this.location.back();
  }

  submitFlights(): void {
    this.store$.dispatch(BookingActions.setFlights({ directFlights: [this.directFlight], forwardFlights: [this.forwardFlight] }));
  }

  toggleDirectFlightSelection(event: boolean) {
    this.isFlightsSelected = event;
  }

  toggleForwardFlightSelection(event: boolean) {
    this.isFlightsSelected = event;
  }
}
