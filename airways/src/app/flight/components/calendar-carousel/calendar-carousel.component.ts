/* eslint-disable class-methods-use-this */
import {
  Component, Input, OnInit,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
import moment from 'moment';
import { CalendarCarouselService } from 'src/app/flight/services/calendar-carousel.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectCurrency } from 'src/app/redux/selectors/auth.selectors';
import { MatIconService } from 'src/app/shared/services/icon.service';
import { Flight } from '../../models/flight.models';
import { FlightsService } from '../../services/flights.service';
import * as FlightsActions from '../../../redux/actions/flights.actions';

export interface Slide {
  flightDate: string,
  data: Flight,
}

@Component({
  selector: 'app-calendar-carousel',
  templateUrl: './calendar-carousel.component.html',
  styleUrls: ['./calendar-carousel.component.scss'],
})
export class CalendarCarouselComponent implements OnInit {
  @Input() responseIndex!: number;

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

  private allSlides: Slide[] = [];

  private isNextClicked = false;

  private isPrevClicked = false;

  private searchData!: FlightSearchState;

  private newDate = new BehaviorSubject<string | null>(null);

  private newSlide: Slide | null = null;

  slides: Slide[] = [];

  isControlsDisabled = false;

  activeFlight: Flight | null = null;

  currency$: Observable<string>;

  constructor(
    private store$: Store<AppState>,
    private flightsService: FlightsService,
    private sliderService: CalendarCarouselService,
    private matIconService: MatIconService,
  ) {
    this.currency$ = this.store$.pipe(select(selectCurrency));
  }

  ngOnInit(): void {
    this.sliderService.visibleSlides$.subscribe((res) => {
      this.slides = res;
    });

    this.sliderService.allSlides$.subscribe((res) => {
      this.allSlides = res;
    });

    this.sliderService.flight$.subscribe((res) => {
      this.activeFlight = res;
    });

    this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.searchData = res;
    });

    this.newDate.subscribe((date) => {
      this.flightsService.searchFlights({ ...this.searchData, startTripDate: date }).subscribe((res: Flight[]) => {
        this.newSlide = {
          flightDate: moment(date).format('LL'),
          data: res[0],
        };
        if (date) {
          if (this.isNextClicked) {
            this.sliderService.addNextSlide(this.newSlide!);
          }
          if (this.isPrevClicked) {
            this.sliderService.addPrevSlide(this.newSlide!);
          }
        }
      });
    });
  }

  changeDepartureDate(date: string) {
    const slide = this.slides.find((item: Slide) => item.flightDate === date);
    this.sliderService.setFlight(slide!.data);
    this.store$.dispatch(FlightsActions.setDepartureDate({ startTripDate: moment(slide!.flightDate).toString() }));
  }

  isValidDate(date: string) {
    // debugger;
    let result = false;

    const now = new Date().getTime();

    const chosen = new Date(date).getTime();

    if ((chosen - now) < 0) {
      result = true;
    }

    return result;
  }

  updateSlides() {
    if (this.isNextClicked) {
      this.newDate.next(moment(this.allSlides[this.allSlides.length - 1].flightDate).add(1, 'days').toString());
    }
    if (this.isPrevClicked) {
      this.newDate.next(moment(this.allSlides[0].flightDate).subtract(1, 'days').toString());
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
