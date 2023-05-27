import { Component, Input } from '@angular/core';
import { Flight } from 'src/app/flight/models/flight.models';

@Component({
  selector: 'app-summary-page-item',
  templateUrl: './summary-page-item.component.html',
  styleUrls: ['./summary-page-item.component.scss'],
})
export class SummaryPageItemComponent {
  @Input() currentFlight!: Flight | null;
}
