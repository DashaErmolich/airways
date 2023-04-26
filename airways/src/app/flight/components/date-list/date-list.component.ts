import { Component, Input } from '@angular/core';
import { FoundFlightsWithDate } from '../../models/flight.models';

@Component({
  selector: 'app-date-list',
  templateUrl: './date-list.component.html',
  styleUrls: ['./date-list.component.scss'],
})
export class DateListComponent {
  @Input() foundFlightsWithDate!: FoundFlightsWithDate[];
}
