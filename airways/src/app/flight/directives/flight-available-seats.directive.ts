import {
  Directive, ElementRef, Input, OnChanges, OnInit, Renderer2,
} from '@angular/core';
import { AvailableSeatsStateColorsEnum } from '../constants/available-seats-state.enum';
import { FlightSeats } from '../models/flight.models';

const CSS_PROPS = ['background-color', 'border-bottom-color'];

@Directive({
  selector: '[appFlightAvailableSeats]',
})
export class FlightAvailableSeatsDirective implements OnInit, OnChanges {
  @Input() appFlightAvailableSeats: FlightSeats | null = null;

  @Input() appFlightAvailableSeatsStyle!: string;

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
        this.appFlightAvailableSeatsStyle,
        `${this.getColor()}`,
      );
    }
  }

  private getColor(): string {
    let color: string = '';
    if (this.appFlightAvailableSeats) {
      switch (true) {
        case this.appFlightAvailableSeats.avaible >= this.appFlightAvailableSeats.total / 2:
          if (this.appFlightAvailableSeatsStyle === CSS_PROPS[0]) {
            color = AvailableSeatsStateColorsEnum.MoreThanHalf_30;
          }
          if (this.appFlightAvailableSeatsStyle === CSS_PROPS[1]) {
            color = AvailableSeatsStateColorsEnum.MoreThanHalf;
          }
          break;
        case this.appFlightAvailableSeats.avaible < this.appFlightAvailableSeats.total / 2 && this.appFlightAvailableSeats.avaible >= 10:
          if (this.appFlightAvailableSeatsStyle === CSS_PROPS[0]) {
            color = AvailableSeatsStateColorsEnum.LessThanHalf_30;
          }
          if (this.appFlightAvailableSeatsStyle === CSS_PROPS[1]) {
            color = AvailableSeatsStateColorsEnum.LessThanHalf;
          }
          break;
        default:
          if (this.appFlightAvailableSeatsStyle === CSS_PROPS[0]) {
            color = AvailableSeatsStateColorsEnum.LessThanTen_30;
          }
          if (this.appFlightAvailableSeatsStyle === CSS_PROPS[1]) {
            color = AvailableSeatsStateColorsEnum.LessThanTen;
          }
      }
    }
    return color;
  }
}
