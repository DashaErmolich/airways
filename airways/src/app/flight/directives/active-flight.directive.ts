import {
  Directive, ElementRef, Input, OnInit, Renderer2,
} from '@angular/core';
import { Flight } from '../models/flight.models';

@Directive({
  selector: '[appActiveFlight]',
})
export class ActiveFlightDirective implements OnInit {
  @Input() appActiveFlight!: Flight;

  constructor(
    private element: ElementRef,
    private renderer2: Renderer2,
  ) { }

  ngOnInit(): void {
    // this.changeBorderColor();
  }
}
