import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectCurrency } from 'src/app/redux/selectors/auth.selectors';
import { selectFlightSearchData } from 'src/app/redux/selectors/flights.selectors';
import { FlightSearchState, AppState } from 'src/app/redux/state.models';
import { MatIconService } from 'src/app/shared/services/icon.service';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { DatesService } from 'src/app/flight/services/dates.service';
import { Flight } from '../../models/flight.models';
import { CalendarSliderService } from '../../services/calendar-slider.service';
import { FlightsService } from '../../services/flights.service';
import * as FlightsActions from '../../../redux/actions/flights.actions';
import { Slide } from '../../models/slider.models';

@Component({
  selector: 'app-calendar-slider',
  templateUrl: './calendar-slider.component.html',
  styleUrls: ['./calendar-slider.component.scss'],
  animations: [
    trigger('moveSlide', [
      state('primary', style({ transform: 'translateX(calc((-1) * 100%/5)' })),
      state('prev', style({ transform: 'translateX(0)' })),
      state('next', style({ transform: 'translateX(calc((-2) * 100%/5)' })),
      transition('primary => next', [
        animate('0.4s'),
      ]),
      transition('primary => prev', [
        animate('0.4s'),
      ]),
    ]),
  ],
})
export class CalendarSliderComponent implements OnInit {
  private allSlides: Slide[] = [];

  isNextClicked = false;

  isPrevClicked = false;

  private searchData!: FlightSearchState;

  private newDate = new BehaviorSubject<string | null>(null);

  private newSlide: Slide | null = null;

  slides: Slide[] = [];

  isControlsDisabled = false;

  activeFlight: Flight | null = null;

  currency$: Observable<string>;

  currentIndex: number = 0;

  constructor(
    private store$: Store<AppState>,
    private flightsService: FlightsService,
    private sliderService: CalendarSliderService,
    private matIconService: MatIconService,
    private datesService: DatesService,
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
          date: date!,
          flight: res[0],
        };
        if (date) {
          if (this.isNextClicked) {
            this.sliderService.addNextSlide(this.newSlide!);
            this.isNextClicked = false;
          }
          if (this.isPrevClicked) {
            this.sliderService.addPrevSlide(this.newSlide!);
            this.isPrevClicked = false;
          }
        }
      });
    });
  }

  showPrevSlide() {
    this.isNextClicked = false;
    this.isPrevClicked = true;
  }

  showNextSlide() {
    this.isNextClicked = true;
    this.isPrevClicked = false;
  }

  onSlideMovingStart() {
    this.isControlsDisabled = true;
  }

  onSlideMovingEnd() {
    if (this.isNextClicked) {
      this.newDate.next(this.datesService.getNextCalendarDate(this.allSlides[this.allSlides.length - 1].date));
    }
    if (this.isPrevClicked) {
      this.newDate.next(this.datesService.getPrevCalendarDate(this.allSlides[0].date));
    }
    this.isControlsDisabled = false;
  }

  isValidDate(date: string) {
    return this.datesService.isValidDate(date);
  }

  changeDepartureDate(date: string) {
    const slide = this.slides.find((item: Slide) => item.date === date);
    this.sliderService.setFlight(slide!.flight);
    this.store$.dispatch(FlightsActions.setDepartureDate({ startTripDate: slide!.date }));
  }
}
