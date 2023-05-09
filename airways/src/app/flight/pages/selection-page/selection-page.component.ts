/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import { Location } from '@angular/common';
import {
  Component, OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectFlightSearchData, selectSelectedFlight, selectSelectedFlightError, selectSelectedFlightIsLoading,
} from 'src/app/redux/selectors/flights.selectors';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import { SlidesOutputData } from 'ngx-owl-carousel-o';
import { CalendarCarouselService } from 'src/app/flight/services/calendar-carousel.service';
import moment from 'moment';
import * as FlightsActions from '../../../redux/actions/flights.actions';
import { FlightsAPIResponseIndexesEnum } from '../../constants/flights-response-indexes.enum';
import { Slide } from '../../components/calendar-carousel/calendar-carousel.component';
import { Flight } from '../../models/flight.models';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit {
  isSearchFormVisible = false;

  searchData!: FlightSearchState;

  flightsResponseIndexes = FlightsAPIResponseIndexesEnum;

  isLoading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  searchData$!: Observable<FlightSearchState>;

  isAuth$: Observable<boolean>;

  slides: Slide[] = [];

  activeSlides!: SlidesOutputData;

  flight!: Flight;

  flights$: Observable<Flight[][]>;

  constructor(
    private store$: Store<AppState>,
    private location: Location,
    private sliderService: CalendarCarouselService,
  ) {
    this.isLoading$ = this.store$.pipe(select(selectSelectedFlightIsLoading));
    this.error$ = this.store$.pipe(select(selectSelectedFlightError));
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));

    this.searchData$ = this.store$.pipe(select(selectFlightSearchData));
    this.flights$ = this.store$.pipe(select(selectSelectedFlight));
  }

  ngOnInit(): void {
    this.store$.dispatch(FlightsActions.searchFlights());

    this.sliderService.flight$.subscribe((res) => {
      this.flight = res!;
    });

    this.searchData$.subscribe((res) => {
      this.searchData = res;
    });

    this.flights$.subscribe((res) => {
      this.sliderService.setSlides(res.map((item: Flight[]) => ({ flightDate: moment(item[0].takeoffDate).format('LL'), data: item[0] })));
    });
  }

  toggleSearchFormVisibility(event: boolean): void {
    this.isSearchFormVisible = event;
  }

  getPassengersQty() {
    return this.searchData.passengers
      ? this.searchData.passengers.adult + this.searchData.passengers.child + this.searchData.passengers.infant
      : '';
  }

  goBack(): void {
    this.location.back();
  }
}
