/* eslint-disable class-methods-use-this */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
import moment from 'moment';
import { StateService } from 'src/app/core/services/state.service';
import { BehaviorSubject } from 'rxjs';
import { AvailableFlight } from '../../models/flight.models';
import { FlightsService } from '../../services/flights.service';

import * as FlightActions from '../../../redux/actions/flights.actions';

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

  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    startPosition: 1,
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

  public slides: Slide[] = [];

  public isControlsDisabled = false;

  private isNextClicked = false;

  private isPrevClicked = false;

  private searchData!: FlightSearchState;

  private newDate = new BehaviorSubject<string | null>(null);

  private newSlide: Slide | null = null;

  constructor(
    private store$: Store<AppState>,
    private flightsService: FlightsService,
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.stateService.slides$.subscribe((res) => {
      this.slides = res;
    });

    this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.searchData = res;
    });

    this.newDate.subscribe((date) => {
      this.flightsService.searchFlights({ ...this.searchData, startTripDate: date }).subscribe((res: AvailableFlight[]) => {
        // debugger;
        this.newSlide = {
          flightDate: date!,
          data: res[0],
        };
        if (date) {
          if (this.isNextClicked) {
            this.stateService.addNextSlide(this.newSlide!);
          }
          if (this.isPrevClicked) {
            this.stateService.addPrevSlide(this.newSlide!);
          }
        }
      });
    });
  }

  changeDepartureDate(date: string) {
    const slide = this.slides.find((item: Slide) => item.flightDate === date);
    this.stateService.setFlight(slide!.data);
    console.log(slide);
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

  updateSlides() {
    if (this.isNextClicked) {
      this.newDate.next(moment(this.slides[this.slides.length - 1].flightDate).add(1, 'days').toLocaleString());
    }
    if (this.isPrevClicked) {
      this.newDate.next(moment(this.slides[0].flightDate).subtract(1, 'days').toLocaleString());
    }
    this.isControlsDisabled = false;
  }

  onPrev() {
    this.isPrevClicked = true;
    this.isNextClicked = false;
    this.isControlsDisabled = true;
  }

  onNext() {
    this.isPrevClicked = false;
    this.isNextClicked = true;
    this.isControlsDisabled = true;
  }
}
