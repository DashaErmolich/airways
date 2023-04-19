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

  // selectedAirportName = '';

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
  displayFn(airport: Airport): string {
    return airport ? `${airport.city} ${airport.IATA}` : '';
  }

  submitForm() {
    // console.log(this.range.get('start')?.value);
    console.log(this.searchForm.getRawValue());
  }
}
