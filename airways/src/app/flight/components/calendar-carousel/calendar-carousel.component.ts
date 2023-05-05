import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { Store, select } from '@ngrx/store';
import { selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
import { AvailableFlight } from '../../models/flight.models';
import { FlightsService } from '../../services/flights.service';

interface Slide {
  date: string,
  price: number,
}

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
        items: 5,
      },
    },
    nav: true,
  };

  flightData!: FlightSearchState;

  dataNew!: AvailableFlight[];

  datesArr!: (string | null | undefined)[];

  searchData!: FlightSearchState;

  slides: Slide[] = [];

  constructor(
    private store$: Store<AppState>,
    private flightsService: FlightsService,
  ) { }

  ngOnInit(): void {
    console.log(this.flight);
    this.slides = this.getDatesArr(this.flight.takeoffDate);

    this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.searchData = res;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getDatesArr(chosenDate: string) {
    const result: Slide[] = [];

    const activeDate = moment(chosenDate);
    const today = moment(new Date());

    let startDate = today.toLocaleString();

    console.log(activeDate.diff(today, 'days'));

    if (activeDate.diff(today, 'days') <= 2) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      startDate = activeDate.subtract(1, 'days').toLocaleString();
    }

    for (let i = 0; i <= 7; i += 1) {
      if (i === 0) {
        result.push({
          date: startDate,
          price: 1,
        });
      } else {
        startDate = moment(startDate).add(1, 'days').toLocaleString();
        result.push({
          date: startDate,
          price: 2,
        });
      }
    }
    return result;
  }

  changeDepartureDate(date: string | null | undefined) {
    if (typeof date === 'string') {
      this.selectDepartureDateEvent.emit(date);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isInvalidDate(date: string | null | undefined) {
    let result = false;

    const now = new Date().getTime();

    const chosen = new Date(String(date)).getTime();

    if ((chosen - now) < 0) {
      result = true;
    }

    return result;
  }
}
