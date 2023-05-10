import {
  Directive, ElementRef, Input, OnChanges, OnInit, Renderer2,
} from '@angular/core';
import { AvailableSeatsStateColorsEnum } from '../constants/available-seats-state.enum';
import { FlightSeats } from '../models/flight.models';

@Directive({
  selector: '[appFlightAvailableSeats]',
})
export class FlightAvailableSeatsDirective implements OnInit, OnChanges {
  @Input() appFlightAvailableSeats!: FlightSeats;

  constructor(
    private element: ElementRef,
    private renderer2: Renderer2,
  ) { }

  ngOnInit(): void {
    this.changeBorderColor();
  }

  ngOnChanges(): void {
    this.changeBorderColor();
  }

  private changeBorderColor(): void {
    if (this.element) {
      this.renderer2.setStyle(
        this.element.nativeElement,
        'background-color',
        `${this.getColor()}`,
      );
    }
  }

  private getColor(): string {
    let bgColor: string = '';
    switch (true) {
      case this.appFlightAvailableSeats.avaible >= this.appFlightAvailableSeats.total / 2:
        bgColor = AvailableSeatsStateColorsEnum.MoreThanHalf;
        break;
      case this.appFlightAvailableSeats.avaible < this.appFlightAvailableSeats.total / 2 && this.appFlightAvailableSeats.avaible >= 10:
        bgColor = AvailableSeatsStateColorsEnum.LessThanHalf;
        break;
      default:
        bgColor = AvailableSeatsStateColorsEnum.LessThanTen;
    }
    return bgColor;
  }
}
