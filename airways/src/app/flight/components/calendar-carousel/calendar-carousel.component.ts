import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FlightSearchState } from 'src/app/redux/state.models';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { AvailableFlight } from '../../models/flight.models';

@Component({
  selector: 'app-calendar-carousel',
  templateUrl: './calendar-carousel.component.html',
  styleUrls: ['./calendar-carousel.component.scss'],
})
export class CalendarCarouselComponent implements OnInit {
  @Input() flight!: AvailableFlight;

  @Output() selectDepartureDateEvent = new EventEmitter<string>();

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<span>&ShortLeftArrow;</span>', '<span>&ShortRightArrow;</span>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  flightData!: FlightSearchState;

  dataNew!: AvailableFlight[];

  datesArr!: (string | null | undefined)[];

  ngOnInit(): void {
    console.log(this.flight);
    this.datesArr = this.getDatesArr(this.flight.takeoffDate);
  }

  // eslint-disable-next-line class-methods-use-this
  getDatesArr(chosenDate: string | null | undefined) {
    const result: string[] = [];
    if (typeof chosenDate === 'string') {
      // let date = moment(chosenDate).subtract(2, 'days').toISOString();
      const date = moment(chosenDate);
      const today = moment();

      let startDate = date.toISOString();

      if (date.diff(today) <= 2) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        startDate = moment(chosenDate).subtract(2, 'days').toISOString();
      }

      for (let i = 0; i < 1000; i += 1) {
        if (i === 0) {
          result.push(startDate);
        } else {
          startDate = moment(startDate).add(1, 'days').toISOString();
          result.push(startDate);
        }
      }
    }
    return result;
  }

  changeDepartureDate(date: string | null | undefined) {
    if (typeof date === 'string') {
      this.selectDepartureDateEvent.emit(date);
    }
  }
}
