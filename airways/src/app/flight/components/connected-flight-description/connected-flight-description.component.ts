import { Component, Input } from '@angular/core';
import { Flight } from '../../models/flight.models';

@Component({
  selector: 'app-connected-flight-description',
  templateUrl: './connected-flight-description.component.html',
  styleUrls: ['./connected-flight-description.component.scss'],
})
export class ConnectedFlightDescriptionComponent {
  @Input() connectedFlights!: Flight[];

  @Input() flight!: Flight;

  @Input() layoverTime!: number | null;
}
