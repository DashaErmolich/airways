import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { Store, select } from '@ngrx/store';
import { selectFoundFlights } from 'src/app/redux/selectors/app.selectors';
import { chooseFlightsByDayAction } from 'src/app/redux/actions/app.actions';
import { Subscription } from 'rxjs';
import { FoundFlightsWithDate } from '../../models/flight.models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 200,
    navText: ['<', '>'],
    startPosition: 5,
    responsive: {
      0: {
        items: 3,
        slideBy: 3,
      },
      400: {
        items: 3,
        slideBy: 3,
      },
      760: {
        items: 5,
        slideBy: 5,
      },
      1000: {
        items: 5,
        slideBy: 5,
      },
    },
    nav: true,
  };

  activeSlides?: SlidesOutputData;

  selectedDay!: string | null;

  foundFlightsWithDate!: FoundFlightsWithDate[] | null;

  state$ = new Subscription();

  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.state$ = this.store$
      .pipe(select(selectFoundFlights))
      .subscribe((res) => {
        this.foundFlightsWithDate = res.flightsWithDates;
        this.selectedDay = res.day;
      });
  }

  ngOnDestroy(): void {
    this.state$.unsubscribe();
  }

  getFlightDay(event: Event) {
    const day = (event.currentTarget as HTMLButtonElement).id;
    this.store$.dispatch(chooseFlightsByDayAction(day));
  }

  // // eslint-disable-next-line class-methods-use-this
  // startDragging(event: boolean) {
  //   console.log('startDragging', event);
  // }

  // // eslint-disable-next-line class-methods-use-this
  // getData(event: SlidesOutputData) {
  //   console.log('inicialized', event);
  // }

  // getPassedData(data: SlidesOutputData) {
  //   this.activeSlides = data;
  //   console.log('getPassedData', this.activeSlides);
  // }
}
