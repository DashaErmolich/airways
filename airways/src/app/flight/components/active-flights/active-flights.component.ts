import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectFlightsByDay } from 'src/app/redux/selectors/flights.selectors';
import { FlightNew, FoundFlightsWithDate, SearchParams } from '../../models/flight.models';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-active-flights',
  templateUrl: './active-flights.component.html',
  styleUrls: ['./active-flights.component.scss'],
})
export class ActiveFlightsComponent implements OnInit, OnDestroy {
  @Input() searchParams!: SearchParams;

  activeDay!: string | null;

  flightsByActiveDay!: FoundFlightsWithDate | undefined;

  state$ = new Subscription();

  flights!: FlightNew[];

  constructor(private store$: Store, private flightsService: FlightsService) {}

  ngOnInit(): void {
    this.state$ = this.store$
      .pipe(select(selectFlightsByDay))
      .subscribe((res) => { this.flightsByActiveDay = res; });
    this.flightsService.searchFlights(
      {
        fromKey: this.searchParams.directions?.departureFrom.IATA,
        toKey: this.searchParams.directions?.destinationTo.IATA,
        forwardDate: this.searchParams.date,
        backDate: this.searchParams.date,
      },
    ).subscribe((res) => {
      this.flights = res;
      console.log(this.flights);
    });
  }

  ngOnDestroy(): void {
    this.state$.unsubscribe();
  }
}
