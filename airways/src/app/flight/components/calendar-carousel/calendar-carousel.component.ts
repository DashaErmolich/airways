/* eslint-disable class-methods-use-this */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { selectFlightSearchData, selectSlides } from 'src/app/redux/selectors/flights.selectors';
import { AvailableFlight } from '../../models/flight.models';
import moment from 'moment';
import { FlightsService } from '../../services/flights.service';
import * as FlightsActions from '../../../redux/actions/flights.actions';

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

  private activeSlides!: SlidesOutputData;

  isNextClicked = false;

  isPrevClicked = false;

  searchData!: FlightSearchState;

  datesArr: string[] = [];

  constructor(
    private store$: Store<AppState>,
    private fl: FlightsService,
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

  getPassedData(data: SlidesOutputData) {
    console.log(data);
    console.log('--- translated', this.activeSlides);
    // this.slides.shift();
    // this.slides = [...this.slides, {
    //   flightDate: (new Date('1972')).toString(),
    //   data: this.slides[0].data,
    // }];
    // console.log(this.slides);
  }

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log('--- change', this.activeSlides);
  }

  onPrev() {
    this.isPrevClicked = true;
    this.isNextClicked = false;
  }

  onNext() {
    this.isPrevClicked = false;
    this.isNextClicked = true;
  }


  getDatesArr(activeDate: string) {
    const result = [];

    for (let i = -3; i < 3; i++) {
      if (i < 0) {
        result.push(moment(activeDate).subtract(Math.abs(i), 'days').toLocaleString());
      }

      if (i === 0) {
        result.push(moment(activeDate).toLocaleString());
      }

      if (i > 0) {
        result.push(moment(activeDate).add(i, 'days').toLocaleString());
      }
    }

    return result;
  }
}
