import {
  Component, Input, OnInit, Output, EventEmitter, OnDestroy,
} from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable, Subject, takeUntil } from 'rxjs';

import { AppState, TripSearchState } from 'src/app/redux/state.models';
import { selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import { selectPassengersQty, selectTripSearchState } from 'src/app/redux/selectors/trip-search.selectors';
import { selectForwardFlight, selectReturnFlight } from 'src/app/redux/selectors/flights.selectors';
import { selectCurrency, selectDateFormat } from 'src/app/redux/selectors/settings.selectors';

import { MatIconService } from 'src/app/shared/services/icon.service';

import { Flight } from 'src/app/flight/models/flight.models';
import { FlightsTypesEnum } from 'src/app/flight/constants/flights-response-indexes.enum';
import { DatesService } from 'src/app/flight/services/dates.service';
import { LayoutService } from 'src/app/shared/services/responsive.service';
import { FlightsHelperService } from '../../services/flights-helper.service';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  @Input() flightTypeIndex!: number;

  @Output() flightSelectedEvent = new EventEmitter<boolean>();

  private destroy$ = new Subject<boolean>();

  private searchData$!: Observable<TripSearchState>;

  passengersQty$!: Observable<number>;

  flight: Flight | null = null;

  isAuth$!: Observable<boolean>;

  dateFormat$!: Observable<string>;

  currency$!: Observable<string>;

  flightSelected = false;

  searchData!: TripSearchState;

  constructor(
    private store$: Store<AppState>,
    private matIconService: MatIconService,
    private datesService: DatesService,
    private flightHelper: FlightsHelperService,
    public layout: LayoutService,
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));
    this.currency$ = this.store$.pipe(select(selectCurrency));
    this.searchData$ = this.store$.pipe(select(selectTripSearchState));
    this.passengersQty$ = this.store$.pipe(select(selectPassengersQty));

    this.store$.pipe(
      select(this.getFlightType()),
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      this.flight = res;
    });

    this.searchData$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      this.searchData = res;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getFlightType() {
    return this.flightTypeIndex <= FlightsTypesEnum.RoundTripForwardFlight
      ? selectForwardFlight
      : selectReturnFlight;
  }

  toggleFlightSelection() {
    this.flightSelected = !this.flightSelected;
    this.flightSelectedEvent.emit(this.flightSelected);
  }

  isValidDate(date: string) {
    return this.datesService.isValidDate(date, this.flightTypeIndex, this.searchData.rangeTripDates?.start, this.searchData.rangeTripDates?.end);
  }

  isFlightNotSelected(flightTakeOffDate: string): boolean {
    return !this.flightSelected && this.isValidDate(flightTakeOffDate);
  }

  isReturnFlight(): boolean {
    return this.flightHelper.isReturnFlight(this.flightTypeIndex);
  }

  isFlightAvailable(seatsQty: number, passengersQty: number): boolean {
    return this.flightHelper.isFlightAvailable(seatsQty, passengersQty);
  }
}
