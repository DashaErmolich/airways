import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl, FormGroup, ValidationErrors, Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { data } from '../../constants';
import { Airport } from '../../models/flight.models';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  searchForm!: FormGroup;

  // range!: FormGroup;

  // passengers!: FormGroup;

  // directions!: FormGroup;

  countAdult = 1;

  countChild = 0;

  countInfant = 0;

  isVisibleCounter = false;

  airports: Airport[] = data;

  filteredAirportsFrom!: Observable<Airport[]>;

  filteredAirportsTo!: Observable<Airport[]>;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      isRoundTrip: new FormControl(true),
      directions: new FormGroup({
        departureFrom: new FormControl('', [Validators.required]),
        destinationTo: new FormControl('', [Validators.required]),
      }, { validators: this.sameDirectionsValidator }),
      range: new FormGroup({
        start: new FormControl<Date | null>(null, Validators.required),
        end: new FormControl<Date | null>(null, Validators.required),
      }),
      date: new FormControl('', Validators.required),
      passengers: new FormGroup({
        adult: new FormControl(1),
        child: new FormControl(0),
        infant: new FormControl(0),
      }),
    });

    this.filteredAirportsFrom = this.searchForm.get('directions')!.get('departureFrom')!.valueChanges
      .pipe(
        startWith(''),
        map((value) => this.filter(value)),
      );

    this.filteredAirportsTo = this.searchForm.get('directions')!.get('destinationTo')!.valueChanges
      .pipe(
        startWith(''),
        map((value) => this.filter(value)),
      );
  }

  // eslint-disable-next-line class-methods-use-this
  sameDirectionsValidator(group: AbstractControl): ValidationErrors | null {
    const departureFrom = group.get('departureFrom')?.value;
    const destinationTo = group.get('destinationTo')?.value;
    if (departureFrom && destinationTo && departureFrom.IATA === destinationTo.IATA) {
      return { sameDirectionsValidator: true };
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  filter(value: string) {
    const val = typeof value === 'string' ? value.toLowerCase().trim() : '';
    return data.filter((airport) => airport.IATA.toLowerCase().includes(val)
    || airport.city.toLowerCase().includes(val)
    || airport.name.toLowerCase().includes(val)
    || airport.country.toLowerCase().includes(val));
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

  decrementAdult() {
    if (this.countAdult === 1) {
      this.countAdult = 1;
    } else {
      this.countAdult -= 1;
    }
    this.searchForm.get('passengers')?.get('adult')?.setValue(this.countAdult);
  }

  incrementAdult() {
    this.countAdult += 1;
    this.searchForm.get('passengers')?.get('adult')?.setValue(this.countAdult);
  }

  decrementChild() {
    if (this.countChild === 0) {
      this.countChild = 0;
    } else {
      this.countChild -= 1;
    }
    this.searchForm.get('passengers')?.get('child')?.setValue(this.countChild);
  }

  incrementChild() {
    this.countChild += 1;
    this.searchForm.get('passengers')?.get('child')?.setValue(this.countChild);
  }

  decrementInfant() {
    if (this.countInfant === 0) {
      this.countInfant = 0;
    } else {
      this.countInfant -= 1;
    }
    this.searchForm.get('passengers')?.get('infant')?.setValue(this.countInfant);
  }

  incrementInfant() {
    this.countInfant += 1;
    this.searchForm.get('passengers')?.get('infant')?.setValue(this.countInfant);
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
    if (this.searchForm.get('directions')?.valid && formValue.directions.departureFrom
      && formValue.directions.destinationTo
      && ((formValue.isRoundTrip && formValue.range.start && formValue.range.end)
    || (!formValue.isRoundTrip && formValue.date))) {
      return false;
    }
    return true;
  }

  submitForm() {
    console.log('submit', this.searchForm.getRawValue());
  }
}
