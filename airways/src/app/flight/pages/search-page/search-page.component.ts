import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl, FormGroup, ValidationErrors, Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectAllSearchParams } from 'src/app/redux/selectors/app.selectors';
import { chooseAllParamsAction } from 'src/app/redux/actions/app.actions';
import { Router } from '@angular/router';
import { minCountPassengers } from '../../constants/constants';
import { Airport, CountPassengers, SearchParams } from '../../models/flight.models';
import { data } from '../../constants/data';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})

export class SearchPageComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;

  isVisibleCounter = false;

  filteredAirportsFrom!: Observable<Airport[]>;

  filteredAirportsTo!: Observable<Airport[]>;

  searchParams!: SearchParams;

  searchParams$ = new Subscription();

  constructor(private store$: Store<SearchParams>, private router: Router) {}

  ngOnInit(): void {
    this.store$
      .pipe(select(selectAllSearchParams))
      .subscribe((res) => { this.searchParams = res; });

    this.searchForm = new FormGroup({
      isRoundTrip: new FormControl(this.searchParams.isRoundTrip),
      directions: new FormGroup({
        departureFrom: new FormControl(
          this.searchParams.directions.departureFrom,
          [Validators.required],
        ),
        destinationTo: new FormControl(
          this.searchParams.directions.destinationTo,
          [Validators.required],
        ),
      }, { validators: this.sameDirectionsValidator }),
      range: new FormGroup({
        start: new FormControl(
          new Date(this.searchParams.range.start),
          Validators.required,
        ),
        end: new FormControl(
          new Date(this.searchParams.range.end),
          Validators.required,
        ),
      }),
      date: new FormControl(new Date(this.searchParams.date), Validators.required),
      passengers: new FormGroup({
        adult: new FormControl(this.searchParams.passengers.adult),
        child: new FormControl(this.searchParams.passengers.child),
        infant: new FormControl(this.searchParams.passengers.infant),
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
    return data.filter((airport) => Object.values(airport)
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

  decrement(typePassenger: keyof CountPassengers) {
    let countPassengers = Number(this.searchForm.get('passengers')?.get(typePassenger)?.value);
    if (countPassengers === minCountPassengers[typePassenger]) {
      countPassengers = minCountPassengers[typePassenger];
    } else {
      countPassengers -= 1;
    }
    this.searchForm.get('passengers')?.get(typePassenger)?.setValue(countPassengers);
  }

  increment(typePassenger: keyof CountPassengers) {
    let countPassengers = Number(this.searchForm.get('passengers')?.get(typePassenger)?.value);
    countPassengers += 1;
    this.searchForm.get('passengers')?.get(typePassenger)?.setValue(countPassengers);
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
    const formValue = this.searchForm.getRawValue();
    if (this.searchForm.get('directions')?.valid
      && ((formValue.isRoundTrip && formValue.range.start && formValue.range.end)
    || (!formValue.isRoundTrip && formValue.date))) {
      return false;
    }
    return true;
  }

  submitForm() {
    const searchParams = this.searchForm.getRawValue();
    this.store$.dispatch(chooseAllParamsAction(searchParams));
    this.router.navigate(['flight', 'selection']);
  }
}
