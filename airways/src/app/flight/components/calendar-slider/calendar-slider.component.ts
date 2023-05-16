import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  BehaviorSubject, Observable, Subject, take, takeUntil,
} from 'rxjs';
import { selectCurrency } from 'src/app/redux/selectors/auth.selectors';
import {
  selectForwardFlights, selectReturnFlights,
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
export class CalendarSliderComponent implements OnInit, OnDestroy {
  @Input() flightTypeIndex!: number;

  @Input() flight!: Flight;

  @Input() searchData!: TripSearchState;

  private allSlides: Slide[] = [];

  private newFlightDate = new BehaviorSubject<string | null>(null);

  private newSlide: Slide | null = null;

  private flights$!: Observable<Flight[]>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  isNextClicked = false;

  isPrevClicked = false;

  slides: Slide[] = [];

  isControlsDisabled = false;

  currency$: Observable<string>;

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
    this.flights$ = this.store$.pipe(
      select(
        this.flightTypeIndex <= FlightsTypesEnum.RoundTripForwardFlight
          ? selectForwardFlights
          : selectReturnFlights,
      ),
    );

    this.flights$.pipe(
      take(1),
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      this.sliderService.setSlides(
        res.map(
          (item: Flight) => ({ date: this.datesService.formatTimezone(item.takeoffDate), flight: item }),
        ),
      );
    });

    this.sliderService.visibleSlides$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      this.slides = res;
    });

    this.sliderService.allSlides$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      this.allSlides = res;
    });

    this.newFlightDate.pipe(
      takeUntil(this.destroy$),
    ).subscribe((date) => {
      this.flightsService.searchFlight(
        {
          fromKey: this.flight!.form.key,
          toKey: this.flight!.to.key,
          forwardDate: date!,
          backDate: '',
        },
      ).pipe(
        takeUntil(this.destroy$),
      ).subscribe((res: Flight[]) => {
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
      this.newFlightDate.next(this.datesService.getNextCalendarDate(this.allSlides[this.allSlides.length - 1].date));
    }
    if (this.isPrevClicked) {
      this.newFlightDate.next(this.datesService.getPrevCalendarDate(this.allSlides[0].date));
    }
    this.isControlsDisabled = false;
  }

  isValidDate(date: string) {
    return this.datesService.isValidDate(date, this.flightTypeIndex, this.searchData.rangeTripDates!.start, this.searchData.rangeTripDates!.end);
  }

  changeDepartureDate(newDate: string) {
    const slide = this.slides.find((item: Slide) => item.date === newDate);

    switch (this.flightTypeIndex) {
      case FlightsTypesEnum.RoundTripForwardFlight:
        this.store$.dispatch(FlightsActions.setForwardFlight({ forwardFlight: slide!.flight }));
        this.store$.dispatch(FlightsActions.setRangeTripDates({ range: { start: slide!.date, end: this.searchData.rangeTripDates!.end } }));
        break;
      case FlightsTypesEnum.RoundTripReturnFlight:
        this.store$.dispatch(FlightsActions.setReturnFlight({ returnFlight: slide!.flight }));
        this.store$.dispatch(FlightsActions.setRangeTripDates({ range: { start: this.searchData.rangeTripDates!.start, end: slide!.date } }));
        break;
      default:
        this.store$.dispatch(FlightsActions.setForwardFlight({ forwardFlight: slide!.flight }));
        this.store$.dispatch(FlightsActions.setStartTripDate({ startTripDate: slide!.date }));
    }
  }
}
