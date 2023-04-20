import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { airports } from '../../constants';
import { Airport } from '../../models/flight.models';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  searchForm!: FormGroup;

  range!: FormGroup;

  passengers!: FormGroup;

  countAdult = 1;

  countChild = 0;

  countInfant = 0;

  isVisibleCounter = false;

  airports: Airport[] = airports;

  filteredAirportsFrom!: Observable<Airport[]>;

  filteredAirportsTo!: Observable<Airport[]>;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      typeOfFlight: new FormControl(''),
      destinationFrom: new FormControl(''),
      destinationTo: new FormControl(''),
      range: new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      }),

      passengers: new FormGroup({
        adult: new FormControl(1),
        child: new FormControl(0),
        infant: new FormControl(0),
      }),
    });

    this.filteredAirportsFrom = this.searchForm.get('destinationFrom')!.valueChanges
      .pipe(
        startWith(''),
        map((value) => this.filter(value)),
      );

    this.filteredAirportsTo = this.searchForm.get('destinationTo')!.valueChanges
      .pipe(
        startWith(''),
        map((value) => this.filter(value)),
      );
  }

  // eslint-disable-next-line class-methods-use-this
  filter(value: string) {
    const val = typeof value === 'string' ? value.toLowerCase().trim() : '';
    return airports.filter((airport) => airport.IATA.toLowerCase().includes(val)
    || airport.city.toLowerCase().includes(val)
    || airport.name.toLowerCase().includes(val)
    || airport.country.toLowerCase().includes(val));
  }

  // eslint-disable-next-line class-methods-use-this
  displayAirport(airport: Airport): string {
    return airport ? `${airport.city} ${airport.IATA}` : '';
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

  submitForm() {
    // console.log(this.range.get('start')?.value);
    console.log(this.searchForm.getRawValue());
  }

  vis() {
    this.isVisibleCounter = !this.isVisibleCounter;
    console.log(this.isVisibleCounter);
  }
}
