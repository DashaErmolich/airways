import { Component, Input } from '@angular/core';
import { FoundFlightsWithDate } from '../../models/flight.models';

@Component({
  selector: 'app-active-flights',
  templateUrl: './active-flights.component.html',
  styleUrls: ['./active-flights.component.scss'],
})
export class ActiveFlightsComponent {
  @Input() activeFlights!: FoundFlightsWithDate | undefined;
}
