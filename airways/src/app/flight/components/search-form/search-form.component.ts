/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
import {
  ChangeDetectionStrategy, Component, EventEmitter, Inject, OnDestroy, OnInit, Output,
} from '@angular/core';
import {
  FormGroup, FormControl, Validators, AbstractControl, ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import {
  Subject, Observable, takeUntil, debounceTime, startWith, map,
} from 'rxjs';

import { AppState, TripSearchState } from 'src/app/redux/state.models';
import { selectTripSearchState } from 'src/app/redux/selectors/trip-search.selectors';
import * as TripSearchActions from 'src/app/redux/actions/trip-search.actions';

import { DatesService } from 'src/app/flight/services/dates.service';
import { PASSENGERS_DEFAULT } from 'src/app/flight/constants/passengers.constants';
import { AIRPORTS } from 'src/app/flight/constants/airports.constants';
import { Airport, Passengers } from 'src/app/flight/models/flight.models';
import { FlightsUpdateService } from 'src/app/flight/services/flights-update.service';

import {
  MAT_DATE_FORMATS,
} from '@angular/material/core';

import * as _moment from 'moment';
// eslint-disable-next-line import/no-named-default
import { default as _rollupMoment } from 'moment';
import { selectDateFormat } from 'src/app/redux/selectors/settings.selectors';
import { DateFormatEnum } from 'src/app/core/constants/date-format.enum';

const moment = _rollupMoment || _moment;

enum TripTypesEnum {
  OneWayTrip = 'one-way-trip',
  RoundTrip = 'round-trip',
}

export class MyFormat {
  value = DateFormatEnum.DD_MM_YYYY;

  get display() {
    return { dateInput: this.value };
  }

  get parse() {
    return { dateInput: this.value };
  }
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_DATE_FORMATS, useClass: MyFormat },
  ],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Output() toggleSearchFormVisibilityEvent = new EventEmitter<boolean>();

  private destroy$ = new Subject<boolean>();

  searchForm!: FormGroup;

  isVisibleCounter = false;

  filteredAirportsFrom!: Observable<Airport[]>;

  filteredAirportsTo!: Observable<Airport[]>;

  searchState!: TripSearchState;

  isSearchPage = true;

  dateFormat$!: Observable<string>;

  constructor(
    @Inject(MAT_DATE_FORMATS) private config: MyFormat,
    private store$: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private datesService: DatesService,
    private flightsUpdateService: FlightsUpdateService,
  ) {}

  ngOnInit(): void {
    this.isSearchPage = this.route.snapshot.routeConfig?.path !== 'selection';

    this.store$
      .pipe(
        select(selectTripSearchState),
        takeUntil(this.destroy$),
      ).subscribe((res) => {
        this.searchState = res;
      });

    this.searchForm = new FormGroup({
      tripType: new FormControl(this.searchState.isRoundTrip ? TripTypesEnum.RoundTrip : TripTypesEnum.OneWayTrip),
      directions: new FormGroup({
        departureFrom: new FormControl(
          this.searchState.from || '',
          [Validators.required],
        ),
        destinationTo: new FormControl(
          this.searchState.to || '',
          [Validators.required],
        ),
      }, { validators: this.sameDirectionsValidator }),
      range: new FormGroup({
        start: new FormControl(
          new Date(this.searchState.rangeTripDates?.start || ''),
          Validators.required,
        ),
        end: new FormControl(
          new Date(this.searchState.rangeTripDates?.end || ''),
          Validators.required,
        ),
      }),
      date: new FormControl(new Date(this.searchState.startTripDate || ''), Validators.required),
      passengers: new FormGroup({
        adult: new FormControl(this.searchState.passengers?.adult),
        child: new FormControl(this.searchState.passengers?.child),
        infant: new FormControl(this.searchState.passengers?.infant),
      }),
    });

    this.filteredAirportsFrom = this.searchForm.get('directions')!.get('departureFrom')!.valueChanges
      .pipe(
        debounceTime(300),
        startWith(''),
        map((value) => this.filter(value)),
      );

    this.filteredAirportsTo = this.searchForm.get('directions')!.get('destinationTo')!.valueChanges
      .pipe(
        debounceTime(300),
        startWith(''),
        map((value) => this.filter(value)),
      );

    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));

    this.dateFormat$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      this.config.value = res as DateFormatEnum;

      const { date } = this.searchForm.value;
      const { range } = this.searchForm.value;

      this.searchForm.removeControl('date');
      this.searchForm.addControl('date', new FormControl(new Date(date), Validators.required));

      (this.searchForm.get('range') as FormGroup).removeControl('start');
      (this.searchForm.get('range') as FormGroup).addControl('start', new FormControl(new Date(range.start), Validators.required));

      (this.searchForm.get('range') as FormGroup).removeControl('end');
      (this.searchForm.get('range') as FormGroup).addControl('end', new FormControl(new Date(range.end), Validators.required));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sameDirectionsValidator(group: AbstractControl): ValidationErrors | null {
    const departureFrom = group.get('departureFrom')?.value;
    const destinationTo = group.get('destinationTo')?.value;
    if (departureFrom.key && destinationTo.key && departureFrom.key === destinationTo.key) {
      return { sameDirectionsValidator: true };
    }
    return null;
  }

  filter(searchValue: string) {
    const value = typeof searchValue === 'string' ? searchValue.toLowerCase().trim() : '';
    return AIRPORTS.filter((airport) => Object.values(airport)
      .find((el) => el.toLowerCase().includes(value)));
  }

  displayAirport(airport: Airport): string {
    return airport ? `${airport.city} ${airport.key}` : '';
  }

  unavailableDate(calendarDate: Date | null): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(calendarDate!) && new Date(calendarDate!).getTime() === today.getTime()) return true;
    // eslint-disable-next-line no-constant-condition
    if (new Date(calendarDate!)) return new Date(calendarDate!) > today;
    return true;
  }

  decrement(typePassenger: keyof Passengers) {
    let countPassengers = Number(this.searchForm.get('passengers')?.get(typePassenger)?.value);
    if (countPassengers === PASSENGERS_DEFAULT[typePassenger]) {
      countPassengers = PASSENGERS_DEFAULT[typePassenger];
    } else {
      countPassengers -= 1;
    }
    this.searchForm.get('passengers')?.get(typePassenger)?.setValue(countPassengers);

    this.store$.dispatch(TripSearchActions.setPassengers({ passengers: this.searchForm.value.passengers }));
    this.flightsUpdateService.setIsUpdate(false);
  }

  increment(typePassenger: keyof Passengers) {
    let countPassengers = Number(this.searchForm.get('passengers')?.get(typePassenger)?.value);
    countPassengers += 1;
    this.searchForm.get('passengers')?.get(typePassenger)?.setValue(countPassengers);

    this.store$.dispatch(TripSearchActions.setPassengers({ passengers: this.searchForm.value.passengers }));
    this.flightsUpdateService.setIsUpdate(false);
  }

  getCountPassengers() {
    let countPassengers = `${this.searchForm.get('passengers')?.get('adult')?.value} Adult`;
    if (this.searchForm.get('passengers')?.get('child')?.value) {
      countPassengers += `, ${this.searchForm.get('passengers')?.get('child')?.value} Child`;
    }
    if (this.searchForm.get('passengers')?.get('infant')?.value) {
      countPassengers += `, ${this.searchForm.get('passengers')?.get('infant')?.value} Infant`;
    }
    return countPassengers;
  }

  visibleCounter() {
    this.isVisibleCounter = !this.isVisibleCounter;
  }

  swapDirections() {
    const departureFrom = this.searchForm.get('directions')?.get('departureFrom')?.value;
    const destinationTo = this.searchForm.get('directions')?.get('destinationTo')?.value;
    this.searchForm.get('directions')?.patchValue({
      departureFrom: destinationTo,
      destinationTo: departureFrom,
    });
  }

  isFormInvalid() {
    if (this.searchForm.get('directions')?.valid
      && ((this.isRoundTrip() && this.searchForm.get('range')?.valid)
    || (!this.isRoundTrip() && this.searchForm.get('date')?.valid))) {
      return false;
    }
    return true;
  }

  submitForm() {
    this.saveCurrentState();
    this.toggleSearchFormVisibilityEvent.emit(false);
    this.flightsUpdateService.setIsUpdate(true);
    this.router.navigate(['flights', 'selection']);
  }

  saveCurrentState() {
    if (!this.isFormInvalid()) {
      this.store$.dispatch(TripSearchActions.searchFormSubmit({
        flightsSearchData: {
          isRoundTrip: this.isRoundTrip(),
          isOneWayTrip: !this.isRoundTrip(),
          from: this.searchForm.value.directions.departureFrom,
          to: this.searchForm.value.directions.destinationTo,
          startTripDate: !this.isRoundTrip() ? this.datesService.formatTimezone((this.searchForm.value.date)) : null,
          rangeTripDates: this.isRoundTrip() ? {
            start: this.datesService.formatTimezone((this.searchForm.value.range.start)),
            end: this.datesService.formatTimezone((this.searchForm.value.range.end)),
          } : null,
          passengers: this.searchForm.value.passengers,
        },
      }));
    }
  }

  isRoundTrip(): boolean {
    return this.searchForm.value.tripType === TripTypesEnum.RoundTrip;
  }

  isToAirportUnavailable(key: string): boolean {
    return this.searchForm.value.directions.departureFrom.key === key;
  }

  isFromAirportUnavailable(key: string): boolean {
    return this.searchForm.value.directions.destinationTo.key === key;
  }
}
