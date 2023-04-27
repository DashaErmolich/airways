import {
  Component, Input, OnInit,
} from '@angular/core';
import { FoundFlightsWithDate, SearchParams } from '../../models/flight.models';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss'],
})
export class DirectionComponent implements OnInit {
  @Input() foundFlightsWithDate!: FoundFlightsWithDate[];

  @Input() searchParams!: SearchParams;

  activeFlights!: FoundFlightsWithDate | undefined;

  ngOnInit() {
    // console.log('active', this.activeFlights);
    // const activeDate = new Date(this.searchParams.date).toDateString();
    // this.activeFlights = this.foundFlightsWithDate.find((el) => el.day === activeDate);
  }

  getActiveFlights(event: FoundFlightsWithDate) {
    this.activeFlights = event;
  }
}
