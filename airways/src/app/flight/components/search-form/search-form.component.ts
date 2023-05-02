import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup, FormControl, Validators, AbstractControl, ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  Observable, Subscription, debounceTime, startWith, map,
} from 'rxjs';
import {
  // eslint-disable-next-line max-len
  chooseIsRoundTripAction, choosePassengersAction, chooseDirectionsAction, chooseRangeAction, chooseDateAction, chooseFlightsByDayAction,
} from 'src/app/redux/actions/flights.actions';
import { selectFlights } from 'src/app/redux/selectors/new-flights.selectors';
import { FlightsState } from 'src/app/redux/state.models';
import { minCountPassengers } from '../../constants/constants';
import { dataOld } from '../../constants/data';
import { Airport, SearchParams, Passengers } from '../../models/flight.models';

import * as FlightsActions from '../../../redux/actions/new-flights.actions';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;

  isVisibleCounter = false;

  filteredAirportsFrom!: Observable<Airport[]>;

  filteredAirportsTo!: Observable<Airport[]>;

  searchParams!: SearchParams;

  searchParams$ = new Subscription();

  data!: FlightsState;

  isSearchPage = true;

  constructor(
    private store$: Store<SearchParams>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isSearchPage = this.route.snapshot.routeConfig?.path !== 'selection';

    this.store$
      .pipe(select(selectFlights))
      .subscribe((res) => { this.data = res; });

    this.searchForm = new FormGroup({
      isRoundTrip: new FormControl(this.data.isRoundTrip),
      directions: new FormGroup({
        departureFrom: new FormControl(
          this.data.from || '',
          [Validators.required],
        ),
        destinationTo: new FormControl(
          this.data.to || '',
          [Validators.required],
        ),
      }, { validators: this.sameDirectionsValidator }),
      range: new FormGroup({
        start: new FormControl(
          new Date(this.data.rangeTripDates?.start || ''),
          Validators.required,
        ),
        end: new FormControl(
          new Date(this.data.rangeTripDates?.end || ''),
          Validators.required,
        ),
      }),
      date: new FormControl(new Date(this.data.startTripDate || ''), Validators.required),
      passengers: new FormGroup({
        adult: new FormControl(this.data.passengers?.adult),
        child: new FormControl(this.data.passengers?.child),
        infant: new FormControl(this.data.passengers?.infant),
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
  }

  ngOnDestroy(): void {
    this.searchParams$.unsubscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  sameDirectionsValidator(group: AbstractControl): ValidationErrors | null {
    const departureFrom = group.get('departureFrom')?.value;
    const destinationTo = group.get('destinationTo')?.value;
    if (departureFrom.IATA && destinationTo.IATA && departureFrom.IATA === destinationTo.IATA) {
      return { sameDirectionsValidator: true };
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  filter(searchValue: string) {
    const value = typeof searchValue === 'string' ? searchValue.toLowerCase().trim() : '';
    return dataOld.filter((airport) => Object.values(airport)
      .find((el) => el.toLowerCase().includes(value)));
  }

  // eslint-disable-next-line class-methods-use-this
  displayAirport(airport: Airport): string {
    return airport ? `${airport.city} ${airport.IATA}` : '';
  }

  // eslint-disable-next-line class-methods-use-this
  unavailableDate(calendarDate: Date | null): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (calendarDate && calendarDate.getTime() === today.getTime()) return true;
    if (calendarDate) return calendarDate > today;
    return true;
  }

  decrement(typePassenger: keyof Passengers) {
    let countPassengers = Number(this.searchForm.get('passengers')?.get(typePassenger)?.value);
    if (countPassengers === minCountPassengers[typePassenger]) {
      countPassengers = minCountPassengers[typePassenger];
    } else {
      countPassengers -= 1;
    }
    this.searchForm.get('passengers')?.get(typePassenger)?.setValue(countPassengers);
    const passengers = this.searchForm.get('passengers')?.value;
    this.store$.dispatch(choosePassengersAction(passengers));
    this.saveCurrentState();
  }

  increment(typePassenger: keyof Passengers) {
    let countPassengers = Number(this.searchForm.get('passengers')?.get(typePassenger)?.value);
    countPassengers += 1;
    this.searchForm.get('passengers')?.get(typePassenger)?.setValue(countPassengers);
    const passengers = this.searchForm.get('passengers')?.value;
    this.store$.dispatch(choosePassengersAction(passengers));
    this.saveCurrentState();
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
    this.store$.dispatch(chooseDirectionsAction(this.searchForm.get('directions')?.value));
    this.saveCurrentState();
  }

  isFormInvalid() {
    const formValue = this.searchForm.getRawValue();
    if (this.searchForm.get('directions')?.valid
      && ((formValue.isRoundTrip && this.searchForm.get('range')?.valid)
    || (!formValue.isRoundTrip && this.searchForm.get('date')?.valid))) {
      return false;
    }
    return true;
  }

  onSelectedIsRoundTrip() {
    const isRoundTrip = this.searchForm.get('isRoundTrip')?.value;
    this.store$.dispatch(chooseIsRoundTripAction(isRoundTrip));
    this.saveCurrentState();
  }

  onSelectedDirections() {
    const directions = this.searchForm.get('directions')?.value;
    this.store$.dispatch(chooseDirectionsAction(directions));
    this.saveCurrentState();
  }

  onSelectedRange() {
    const range = this.searchForm.get('range')?.value;
    this.store$.dispatch(chooseRangeAction(range));
    this.saveCurrentState();
  }

  onSelectedDate() {
    const date = this.searchForm.get('date')?.value.toDateString();
    this.store$.dispatch(chooseDateAction(date));
    this.store$.dispatch(chooseFlightsByDayAction(date));
    this.saveCurrentState();
  }

  onSelectedPassengers() {
    const passengers = this.searchForm.get('passengers')?.value;
    this.store$.dispatch(choosePassengersAction(passengers));
    this.saveCurrentState();
  }

  submitForm() {
    this.saveCurrentState();
    this.router.navigate(['flights', 'selection']);
  }

  saveCurrentState() {
    this.store$.dispatch(FlightsActions.searchFormSubmit({
      flightsState: {
        isRoundTrip: this.searchForm.value.isRoundTrip,
        isOneWayTrip: !this.searchForm.value.isRoundTrip,
        from: this.searchForm.value.directions.departureFrom,
        to: this.searchForm.value.directions.destinationTo,
        startTripDate: this.searchForm.value.date,
        rangeTripDates: {
          start: this.searchForm.value.range.start,
          end: this.searchForm.value.range.end,
        },
        passengers: this.searchForm.value.passengers,
      },
    }));
  }
}
