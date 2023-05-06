/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import { Location } from '@angular/common';
import {
  Component, OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAvailableFlightsError, selectAvailableFlightsIsLoading, selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import moment from 'moment';
import { SlidesOutputData } from 'ngx-owl-carousel-o';
import * as FlightsActions from '../../../redux/actions/flights.actions';
import { FlightsAPIResponseIndexesEnum } from '../../constants/flights-response-indexes.enum';
import { FlightsService } from '../../services/flights.service';
import { Slide } from '../../components/calendar-carousel/calendar-carousel.component';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit {
  isSearchFormVisible = false;

  flightsSearchData!: FlightSearchState;

  public flightsResponseIndexes = FlightsAPIResponseIndexesEnum;

  isLoading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  public isAuth$: Observable<boolean>;

  slides: Slide[] = [];

  activeSlides!: SlidesOutputData;

  datesArr: string[] = [];

  allSlides: Slide[] = [];

  // allFlights: AvailableFlight[][] = [];

  constructor(
    private store$: Store<AppState>,
    private location: Location,
    private fl: FlightsService,
  ) {
    this.isLoading$ = this.store$.pipe(select(selectAvailableFlightsIsLoading));
    this.error$ = this.store$.pipe(select(selectAvailableFlightsError));
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
  }

  ngOnInit(): void {
    this.store$.pipe(select(selectFlightSearchData)).subscribe((searchState) => {
      this.flightsSearchData = searchState;
      this.datesArr = this.getDatesArr(this.flightsSearchData.startTripDate!);
      this.fl.searchMultipleFlights(this.flightsSearchData, this.datesArr).subscribe((allFlights) => {
        this.allSlides = [];
        allFlights.forEach((item, i) => {
          this.allSlides = [...this.allSlides, {
            flightDate: this.datesArr[i],
            data: item[0],
          }];
        });
        this.store$.dispatch(FlightsActions.setActiveFlights({ activeFlights: [this.allSlides[3].data] }));
        this.store$.dispatch(FlightsActions.setSlides({ slides: this.allSlides }));
      });
    });
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

  getDatesArr(activeDate: string) {
    const result = [];

    for (let i = -3; i < 3; i++) {
      if (i < 0) {
        result.push(moment(activeDate).subtract(Math.abs(i), 'days').toLocaleString());
      }

      if (i === 0) {
        result.push(moment(activeDate).toLocaleString());
      }

      if (i > 0) {
        result.push(moment(activeDate).add(i, 'days').toLocaleString());
      }
    }

    return result;
  }
}
