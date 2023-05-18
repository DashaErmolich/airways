import {
  Component, Input, OnInit, Output, EventEmitter,
} from '@angular/core';
import { AppState, TripSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  selectFlightSearchData, selectForwardFlight, selectReturnFlight,
} from 'src/app/redux/selectors/flights.selectors';
import { selectCurrency, selectDateFormat, selectIsAuth } from 'src/app/redux/selectors/auth.selectors';
import { MatIconService } from 'src/app/shared/services/icon.service';
import { Flight } from '../../models/flight.models';

// import * as FlightsActions from '../../../redux/actions/flights.actions';
import { FlightsTypesEnum } from '../../constants/flights-response-indexes.enum';
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  @Input() flightTypeIndex!: number;

  @Output() flightSelectedEvent = new EventEmitter<boolean>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private searchData$!: Observable<TripSearchState>;

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
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));
    this.currency$ = this.store$.pipe(select(selectCurrency));
    this.searchData$ = this.store$.pipe(select(selectFlightSearchData));

    this.store$.pipe(
      select(this.flightTypeIndex <= FlightsTypesEnum.RoundTripForwardFlight ? selectForwardFlight : selectReturnFlight),
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

  toggleFlightSelection() {
    this.flightSelected = !this.flightSelected;
    this.flightSelectedEvent.emit(this.flightSelected);
  }

  isValidDate(date: string) {
    return this.datesService.isValidDate(date, this.flightTypeIndex, this.searchData.rangeTripDates?.start, this.searchData.rangeTripDates?.end);
  }
}
