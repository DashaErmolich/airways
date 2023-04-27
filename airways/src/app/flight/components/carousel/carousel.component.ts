import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { FoundFlightsWithDate } from '../../models/flight.models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() foundFlightsWithDate!: FoundFlightsWithDate[];

  @Output() flights = new EventEmitter();

  activeSlides?: SlidesOutputData;

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  ngOnInit(): void {
    console.log(this.foundFlightsWithDate);
  }

  // dynamicSlides = [
  //   {
  //     id: '1',
  //     src: 'https://via.placeholder.com/200/92c952',
  //     alt: 'Side 1',
  //     title: 'Side 1',
  //   },
  //   {
  //     id: '2',
  //     src: 'https://via.placeholder.com/200/771796',
  //     alt: 'Side 2',
  //     title: 'Side 2',
  //   },
  //   {
  //     id: '3',
  //     src: 'https://via.placeholder.com/200/24f355',
  //     alt: 'Side 3',
  //     title: 'Side 3',
  //   },
  //   {
  //     id: '4',
  //     src: 'https://via.placeholder.com/200/d32776',
  //     alt: 'Side 4',
  //     title: 'Side 4',
  //   },
  //   {
  //     id: '5',
  //     src: 'https://via.placeholder.com/200/f66b97',
  //     alt: 'Side 5',
  //     title: 'Side 5',
  //   },
  // ];

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

  // eslint-disable-next-line class-methods-use-this
  startDragging(event: boolean) {
    console.log('startDragging', event);
  }

  // eslint-disable-next-line class-methods-use-this
  getData(event: SlidesOutputData) {
    console.log('inicialized', event);
  }

  getFlightDay(day: string) {
    const flights = this.foundFlightsWithDate.find((el) => el.day === day);
    this.flights.emit(flights);
    console.log(flights);
  }
}
