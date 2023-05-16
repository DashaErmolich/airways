import { Component, Input } from '@angular/core';
import { Flight } from '../../models/flight.models';

@Component({
  selector: 'app-flight-description',
  templateUrl: './flight-description.component.html',
  styleUrls: ['./flight-description.component.scss'],
})
export class FlightDescriptionComponent {
  @Input() flightTypeIndex: number | null = null;

  @Input() flight: Flight | null = null;
}
