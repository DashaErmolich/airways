import {
  Component, OnDestroy, OnInit,
} from '@angular/core';

import { Store, select } from '@ngrx/store';

import {
  Observable, Subject, takeUntil,
} from 'rxjs';

import {
  AppState, TripSearchState,
} from 'src/app/redux/state.models';
import { selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import {
  selectForwardFlight, selectReturnFlight, selectSelectedFlightError, selectSelectedFlightIsLoading,
} from 'src/app/redux/selectors/flights.selectors';
import { selectTripSearchState } from 'src/app/redux/selectors/trip-search.selectors';
import * as FlightsActions from 'src/app/redux/actions/flights.actions';
import * as BookingActions from 'src/app/redux/actions/booking.actions';

import { BookingStepsEnum } from 'src/app/core/constants/booking-steps.constants';

import { FlightsTypesEnum } from 'src/app/flight/constants/flights-response-indexes.enum';
import { Flight } from 'src/app/flight/models/flight.models';
import { FlightsUpdateService } from 'src/app/flight/services/flights-update.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit, OnDestroy {
  private forwardFlight: Flight | null = null;

  private returnFlight: Flight | null = null;

  private searchData!: TripSearchState;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  isSearchFormVisible = false;

  flightsTypes = FlightsTypesEnum;

  isLoading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  searchData$!: Observable<TripSearchState>;

  isAuth$!: Observable<boolean>;

  isFlightsSelected: boolean[] = [];

  constructor(
    private store$: Store<AppState>,
    private flightsUpdateService: FlightsUpdateService,
    private localStorage: LocalStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store$.pipe(select(selectSelectedFlightIsLoading));
    this.error$ = this.store$.pipe(select(selectSelectedFlightError));
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.searchData$ = this.store$.pipe(select(selectTripSearchState));

    this.searchData$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((res) => {
        this.searchData = res;
      });

    this.flightsUpdateService.isUpdate$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      if (res) {
        this.store$.dispatch(FlightsActions.searchAllFlights({ isReturn: false }));
        this.isFlightsSelected = [];
        this.isFlightsSelected = [...this.isFlightsSelected, false];
        if (this.searchData.isRoundTrip) {
          this.store$.dispatch(FlightsActions.searchAllFlights({ isReturn: true }));
          this.isFlightsSelected = [...this.isFlightsSelected, false];
        }
      }
    });

    this.store$.pipe(
      takeUntil(this.destroy$),
      select(selectForwardFlight),
    ).subscribe((res: Flight | null) => {
      this.forwardFlight = res;
    });

    this.store$.pipe(
      takeUntil(this.destroy$),
      select(selectReturnFlight),
    ).subscribe((res: Flight | null) => {
      this.returnFlight = res;
    });

    this.store$.dispatch(BookingActions.setStep({ step: BookingStepsEnum.Second }));

    this.localStorage.resetFlightsSelection();
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

  isNextStepAvailable() {
    return this.isFlightsSelected.every((item) => item);
  }

  saveSelectedFlights() {
    if (this.forwardFlight) {
      this.localStorage.setForwardFlight(this.forwardFlight);
    }

    if (this.returnFlight) {
      this.localStorage.setReturnFlight(this.returnFlight);
    }

    this.router.navigateByUrl('/booking');
  }
}
