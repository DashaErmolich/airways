import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllSearchParams } from 'src/app/redux/selectors/flights.selectors';
import { chooseDirectionsAction, foundFlightsAction } from 'src/app/redux/actions/flights.actions';
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
          this.foundFlights = flights
            .filter((flight) => flight.departureFrom.IATA
              === this.searchParams.directions?.departureFrom.IATA
              && flight.destinationTo.IATA === this.searchParams.directions.destinationTo.IATA);
          const datesArray = this.createDates(this.searchParams.date || '');
          this.foundFlightsWithDate = datesArray.map((date) => {
            // eslint-disable-next-line max-len
            const el = this.foundFlights?.filter((flight: Flight) => date === new Date(flight.departureDate).toDateString());
            return { day: date, flights: el };
          });
          this.store$.dispatch(foundFlightsAction(this.foundFlightsWithDate));
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  createDates(currentDay: string): string[] {
    const datesArr = [];
    const currentDate = new Date(currentDay);
    for (let i = -7; i <= 7; i += 1) {
      // eslint-disable-next-line max-len
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
      datesArr.push(date.toDateString());
    }
    return datesArr;
  }

  swapDirections() {
    const departureFrom = this.searchParams.directions?.departureFrom;
    const destinationTo = this.searchParams.directions?.destinationTo;
    if (departureFrom && destinationTo) {
      this.store$.dispatch(chooseDirectionsAction({
        departureFrom: destinationTo,
        destinationTo: departureFrom,
      }));
    }
  }
}
