import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllSearchParams } from 'src/app/redux/selectors/app.selectors';
import { Flight, FoundFlightsWithDate, SearchParams } from '../../models/flight.models';
import { flights } from '../../constants/flights';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit {
  searchParams!: SearchParams;

  foundFlights?: Flight[];

  isVisibleSearchForm = false;

  foundFlightsWithDate!: FoundFlightsWithDate[];

  constructor(
    public store$: Store,
  ) { }

  ngOnInit(): void {
    this.store$.pipe(select(selectAllSearchParams))
      .subscribe((res) => {
        this.searchParams = res;
        if (!this.searchParams.isRoundTrip) {
          // const dateFrom = new Date(this.searchParams.date).toDateString();
          this.foundFlights = flights
            .filter((flight) => flight.departureFrom.IATA
              === this.searchParams.directions.departureFrom.IATA
              && flight.destinationTo.IATA === this.searchParams.directions.destinationTo.IATA);
          // && new Date(flight.departureDate).toDateString() === dateFrom
          const datesArray = this.createDates(this.searchParams.date);
          this.foundFlightsWithDate = datesArray.map((date) => {
            // eslint-disable-next-line max-len
            const el = this.foundFlights?.filter((flight: Flight) => date === new Date(flight.departureDate).toDateString());
            return { day: date, flights: el };
          });
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  createDates(currentDay: string): string[] {
    const date = new Date(currentDay);
    const datesArr = [];
    datesArr.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2).toDateString());
    datesArr.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).toDateString());
    datesArr.push(date.toDateString());
    datesArr.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toDateString());
    datesArr.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2).toDateString());
    return datesArr;
  }
}
