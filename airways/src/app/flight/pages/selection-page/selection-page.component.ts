import { Location } from '@angular/common';
import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  Observable, Subject, takeUntil,
} from 'rxjs';
import {
  selectFlightSearchData, selectSelectedFlightError, selectSelectedFlightIsLoading,
} from 'src/app/redux/selectors/flights.selectors';
import {
  AppState, TripSearchState,
} from 'src/app/redux/state.models';
import { selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import { StepsEnum } from 'src/app/core/constants/steps.enum';
import * as FlightsActions from '../../../redux/actions/flights.actions';
import * as BookingActions from '../../../redux/actions/booking.actions';
import { FlightsTypesEnum } from '../../constants/flights-response-indexes.enum';
import { Flight } from '../../models/flight.models';
import { DatesService } from '../../services/dates.service';
import { FlightsUpdateService } from '../../services/flights-update.service';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit, OnDestroy {
  isSearchFormVisible = false;

  flightsTypes = FlightsTypesEnum;

  isLoading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  searchData$!: Observable<TripSearchState>;

  isAuth$!: Observable<boolean>;

  forwardFlight!: Flight;

  directFlight!: Flight;

  isFlightsSelected: boolean[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  searchData!: TripSearchState;

  constructor(
    private store$: Store<AppState>,
    private location: Location,
    private datesService: DatesService,
    private flightsUpdateService: FlightsUpdateService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store$.pipe(select(selectSelectedFlightIsLoading));
    this.error$ = this.store$.pipe(select(selectSelectedFlightError));
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.searchData$ = this.store$.pipe(select(selectFlightSearchData));

    this.searchData$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((searchData) => {
        this.searchData = searchData;
      });

    this.flightsUpdateService.isUpdate$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      if (res) {
        this.store$.dispatch(FlightsActions.searchFlights({ isReturn: false }));
        this.isFlightsSelected = [...this.isFlightsSelected, false];
        if (this.searchData.isRoundTrip) {
          this.store$.dispatch(FlightsActions.searchFlights({ isReturn: true }));
          this.isFlightsSelected = [...this.isFlightsSelected, false];
        }
      }
    });

    this.store$.dispatch(BookingActions.setStep({ step: StepsEnum.Second }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  toggleSearchFormVisibility(isVisible: boolean): void {
    this.isSearchFormVisible = isVisible;
  }

  toggleForwardFlightSelection(isSelected: boolean) {
    this.isFlightsSelected = [isSelected, ...this.isFlightsSelected.slice(1)];
  }

  toggleReturnFlightSelection(isSelected: boolean) {
    this.isFlightsSelected = [...this.isFlightsSelected.slice(0, -1), isSelected];
  }

  goBack(): void {
    this.location.back();
  }

  submitFlights(): void {
    this.store$.dispatch(BookingActions.setFlights({ directFlights: [this.directFlight], forwardFlights: [this.forwardFlight] }));
  }

  isNextStepAvailable() {
    return this.isFlightsSelected.every((item) => item);
  }
}
