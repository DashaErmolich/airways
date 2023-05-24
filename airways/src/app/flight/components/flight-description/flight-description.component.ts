import { Component, Input } from '@angular/core';
import { Flight } from 'src/app/flight/models/flight.models';
import { LayoutService } from 'src/app/core/services/layout.service';
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
    public layout: LayoutService,
  ) { }

  isReturnFlight(): boolean {
    return this.flightHelper.isReturnFlight(this.flightTypeIndex);
  }
}
