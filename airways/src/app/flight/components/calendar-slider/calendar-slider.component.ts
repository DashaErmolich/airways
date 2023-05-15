import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectCurrency } from 'src/app/redux/selectors/auth.selectors';
import {
  selectForwardFlights, selectFlightSearchData, selectReturnFlights, selectForwardFlight, selectReturnFlight,
} from 'src/app/redux/selectors/flights.selectors';
import { TripSearchState, AppState } from 'src/app/redux/state.models';
import { MatIconService } from 'src/app/shared/services/icon.service';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { DatesService } from 'src/app/flight/services/dates.service';
import { Flight } from '../../models/flight.models';
import { FlightsService } from '../../services/flights.service';
import * as FlightsActions from '../../../redux/actions/flights.actions';
import { Slide } from '../../models/slider.models';
import { CalendarSliderService } from '../../services/calendar-slider.service';
import { FlightsTypesEnum } from '../../constants/flights-response-indexes.enum';

@Component({
  selector: 'app-calendar-slider',
  templateUrl: './calendar-slider.component.html',
  styleUrls: ['./calendar-slider.component.scss'],
  providers: [CalendarSliderService],
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
  @Input() flightTypeIndex!: number;

  private allSlides: Slide[] = [];

  isNextClicked = false;

  isPrevClicked = false;

  private searchData!: TripSearchState;

  private newDate = new BehaviorSubject<string | null>(null);

  private newSlide: Slide | null = null;

  slides: Slide[] = [];

  isControlsDisabled = false;

  activeFlight: Flight | null = null;

  currency$: Observable<string>;

  currentIndex: number = 0;

  flight$!: Observable<Flight | null>;

  flights$!: Observable<Flight[][]>;

  searchData$: Observable<TripSearchState>;

  constructor(
    private store$: Store<AppState>,
    private flightsService: FlightsService,
    private sliderService: CalendarSliderService,
    private matIconService: MatIconService,
    private datesService: DatesService,
  ) {
    this.currency$ = this.store$.pipe(select(selectCurrency));
    this.searchData$ = this.store$.pipe(select(selectFlightSearchData));
  }

  ngOnInit(): void {
    this.flights$ = this.store$.pipe(select(this.flightTypeIndex <= FlightsTypesEnum.RoundTripForwardFlight ? selectForwardFlights : selectReturnFlights));

    this.flight$ = this.store$.pipe(select(this.flightTypeIndex <= FlightsTypesEnum.RoundTripForwardFlight ? selectForwardFlight : selectReturnFlight));

    this.sliderService.visibleSlides$.subscribe((res) => {
      this.slides = res;
    });

    this.sliderService.allSlides$.subscribe((res) => {
      this.allSlides = res;
    });

    this.flights$.subscribe((res) => {
      this.sliderService.setSlides(res.map((item: Flight[]) => ({ date: new Date(new Date(item[0].takeoffDate).toJSON().substring(0, 10)).toJSON(), flight: item[0] })));
    });

    this.flight$.subscribe((res) => {
      this.activeFlight = res;
    });

    this.store$.pipe(select(selectFlightSearchData)).subscribe((res) => {
      this.searchData = res;
    });

    this.newDate.subscribe((date) => {
      this.flightsService.searchFlight({
        fromKey: this.activeFlight?.form.key, toKey: this.activeFlight?.to.key, forwardDate: date, backDate: '',
      }).subscribe((res: Flight[]) => {
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
    this.store$.dispatch(
      this.flightTypeIndex <= 1
        ? FlightsActions.setForwardFlight({ forwardFlight: slide!.flight })
        : FlightsActions.setReturnFlight({ returnFlight: slide!.flight }),
    );
    // this.sliderService.setFlight(slide!.flight);
    // this.store$.dispatch(FlightsActions.setDepartureDate({ startTripDate: slide!.date }));
  }
}
