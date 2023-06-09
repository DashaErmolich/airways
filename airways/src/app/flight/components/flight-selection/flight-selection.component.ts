import {
  Component, Input, OnInit, Output, EventEmitter, OnDestroy,
} from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable, Subject, takeUntil } from 'rxjs';

import { AppState, TripSearchState } from 'src/app/redux/state.models';
import { selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import { selectPassengersQty, selectTripSearchState } from 'src/app/redux/selectors/trip-search.selectors';
import {
  selectForwardConnectedFlights, selectForwardFlight, selectReturnConnectedFlights, selectReturnFlight,
} from 'src/app/redux/selectors/flights.selectors';
import { selectCurrency, selectDateFormat } from 'src/app/redux/selectors/settings.selectors';

import { MatIconService } from 'src/app/core/services/icon.service';

import { Flight } from 'src/app/flight/models/flight.models';
import { FlightsTypesEnum } from 'src/app/flight/constants/flights-response-indexes.enum';
import { DatesService } from 'src/app/flight/services/dates.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { FlightsHelperService } from '../../services/flights-helper.service';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  @Input() flightTypeIndex!: number;

  @Output() isFlightSelectedEvent = new EventEmitter<boolean>();

  private destroy$ = new Subject<boolean>();

  private searchData$!: Observable<TripSearchState>;

  passengersQty$!: Observable<number>;

  flight: Flight | null = null;

  isAuth$!: Observable<boolean>;

  dateFormat$!: Observable<string>;

  currency$!: Observable<string>;

  isFlightSelected = false;

  searchData!: TripSearchState;

  connectedFlights: Flight[] | null = null;

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
    ).subscribe((res: Flight | null) => {
      this.flight = res;
    });

    this.searchData$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: TripSearchState) => {
      this.searchData = res;
    });

    this.store$.pipe(
      select(this.getConnectedFlightsType()),
      takeUntil(this.destroy$),
    ).subscribe((res: Flight[] | null) => {
      this.connectedFlights = res;
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

  toggleFlightSelection(value?: boolean) {
    if (value === undefined) {
      this.isFlightSelected = !this.isFlightSelected;
    } else {
      this.isFlightSelected = value;
    }
    this.isFlightSelectedEvent.emit(this.isFlightSelected);
  }

  isValidDate(date: string) {
    return this.datesService.isValidDate(date, this.flightTypeIndex, this.searchData.rangeTripDates?.start, this.searchData.rangeTripDates?.end);
  }

  isFlightNotSelected(flightTakeOffDate: string): boolean {
    return !this.isFlightSelected && this.isValidDate(flightTakeOffDate);
  }

  isReturnFlight(): boolean {
    return this.flightHelper.isReturnFlight(this.flightTypeIndex);
  }

  isFlightAvailable(seatsQty: number, passengersQty: number): boolean {
    return this.flightHelper.isFlightAvailable(seatsQty, passengersQty);
  }

  private getConnectedFlightsType() {
    return this.flightTypeIndex <= FlightsTypesEnum.RoundTripForwardFlight
      ? selectForwardConnectedFlights
      : selectReturnConnectedFlights;
  }

  isDirectFlight(): boolean {
    return this.flightHelper.isDirectFlight(this.connectedFlights);
  }
}
