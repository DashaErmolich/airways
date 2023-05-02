import { Component, Input, OnInit } from '@angular/core';
import { AppState, FlightsState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { selectFlights } from 'src/app/redux/selectors/new-flights.selectors';
import { FlightsService } from '../../services/flights.service';
import { FlightNew } from '../../models/flight.models';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  @Input() data!: FlightsState;

  flightData!: FlightsState;

  dataNew!: FlightNew[];

  constructor(
    private flightsService: FlightsService,
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store$.pipe(select(selectFlights)).subscribe((res) => {
      this.flightData = res;
      this.flightsService.searchFlights({
        fromKey: this.flightData.from?.IATA,
        toKey: this.flightData.to?.IATA,
        forwardDate: this.flightData.rangeTripDates
          ? this.flightData.rangeTripDates.start
          : this.flightData.startTripDate,
        backDate: this.flightData.rangeTripDates
          ? this.flightData.rangeTripDates.end
          : null,
      }).subscribe((ress) => {
        this.dataNew = ress;
        console.log(ress)
      });
    });
  }
}
