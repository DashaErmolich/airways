/* eslint-disable class-methods-use-this */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { selectSlides } from 'src/app/redux/selectors/flights.selectors';
import { AvailableFlight } from '../../models/flight.models';

export interface Slide {
  flightDate: string,
  data: AvailableFlight,
}

@Component({
  selector: 'app-calendar-carousel',
  templateUrl: './calendar-carousel.component.html',
  styleUrls: ['./calendar-carousel.component.scss'],
})
export class CalendarCarouselComponent implements OnInit {
  @Input() responseIndex!: number;

  @Output() selectDepartureDateEvent = new EventEmitter<string>();

  activeFlight!: AvailableFlight;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    // navText: ['<span>&ShortLeftArrow;</span>', '<span>&ShortRightArrow;</span>'],
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
  };

  slides: Slide[] = [];

  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store$.pipe(select(selectSlides)).subscribe((res) => {
      this.slides = res;
    });
  }

  changeDepartureDate(date: string) {
    this.selectDepartureDateEvent.emit(date);
  }

  isInvalidDate(date: string) {
    let result = false;

    const now = new Date().getTime();

    const chosen = new Date(String(date)).getTime();

    if ((chosen - now) < 0) {
      result = true;
    }

    return result;
  }

  getPassedData() {
    console.log('next');
  }
}
