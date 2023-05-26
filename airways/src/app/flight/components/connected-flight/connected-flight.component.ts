import { Component, Input } from '@angular/core';
import { Flight } from '../../models/flight.models';

@Component({
  selector: 'app-connected-flight',
  templateUrl: './connected-flight.component.html',
  styleUrls: ['./connected-flight.component.scss'],
})
export class ConnectedFlightComponent {
  @Input() flightTypeIndex!: number;

  @Input() flight!: Flight;

  @Input() connectedFlights!: Flight[];

  panelOpenState = false;
}
