import { Component, Input } from '@angular/core';
import { Flight } from 'src/app/flight/models/flight.models';
import { FlightsHelperService } from '../../services/flights-helper.service';

@Component({
  selector: 'app-flight-description',
  templateUrl: './flight-description.component.html',
  styleUrls: ['./flight-description.component.scss'],
})
export class FlightDescriptionComponent {
  @Input() flightTypeIndex!: number;

  @Input() flight!: Flight;

  constructor(
    private flightHelper: FlightsHelperService,
  ) { }

  isReturnFlight(): boolean {
    return this.flightHelper.isReturnFlight(this.flightTypeIndex);
  }
}
