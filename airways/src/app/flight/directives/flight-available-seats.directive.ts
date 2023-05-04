import {
  Directive, ElementRef, Input, OnInit, Renderer2,
} from '@angular/core';
import { AvailableSeatsStateColorsEnum } from '../constants/available-seats-state.enum';

const MAX_SEATS_AVAILABLE = 300;

@Directive({
  selector: '[appFlightAvailableSeats]',
})
export class FlightAvailableSeatsDirective implements OnInit {
  @Input() appFlightAvailableSeats!: number;

  isStateCaseMatch = false;

  constructor(
    private element: ElementRef,
    private renderer2: Renderer2,
  ) { }

  ngOnInit(): void {
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
    let bgColor: string;

    switch (true) {
      case this.appFlightAvailableSeats >= MAX_SEATS_AVAILABLE / 2:
        bgColor = AvailableSeatsStateColorsEnum.MoreThanHalf;
        break;
      case this.appFlightAvailableSeats < MAX_SEATS_AVAILABLE / 2 && this.appFlightAvailableSeats >= 10:
        bgColor = AvailableSeatsStateColorsEnum.LessThanHalf;
        break;
      default:
        bgColor = AvailableSeatsStateColorsEnum.LessThanTen;
    }
    return bgColor;
  }
}
