import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Slide } from 'src/app/flight/components/calendar-carousel/calendar-carousel.component';
import { AvailableFlight } from 'src/app/flight/models/flight.models';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  slides$ = new BehaviorSubject<Slide[]>([]);

  flight$ = new BehaviorSubject<AvailableFlight | null>(null);

  addSlide(slide: Slide) {
    this.slides$.next([...this.slides$.value, slide]);
  }

  setSlides(slides: Slide[]) {
    this.slides$.next(slides);
  }

  shiftSlide() {
    this.slides$.next(this.slides$.value.slice(1));
  }

  addNextSlide(slide: Slide) {
    this.slides$.next([...this.slides$.value.slice(1), slide]);
  }

  addPrevSlide(slide: Slide) {
    this.slides$.next([slide, ...this.slides$.value.slice(0, -1)]);
  }

  setFlight(newFlight: AvailableFlight) {
    this.flight$.next(newFlight);
  }
}
