import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Slide } from 'src/app/flight/components/calendar-carousel/calendar-carousel.component';
import { Flight } from 'src/app/flight/models/flight.models';

@Injectable({
  providedIn: 'root',
})
export class CalendarCarouselService {
  public allSlides$ = new BehaviorSubject<Slide[]>([]);

  public visibleSlides$ = new BehaviorSubject<Slide[]>([]);

  public flight$ = new BehaviorSubject<Flight | null>(null);

  setSlides(slides: Slide[]): void {
    this.allSlides$.next(slides);
    this.visibleSlides$.next(slides);
    this.flight$.next(slides[3]?.data);
  }

  addNextSlide(slide: Slide): void {
    this.allSlides$.next([...this.allSlides$.value, slide]);
    const visibleSlides = this.visibleSlides$.value;
    const nextVisibleSlide = this.findSlide(moment(visibleSlides[visibleSlides.length - 1].flightDate).add(1, 'days').format('LL'));
    this.visibleSlides$.next([...visibleSlides.slice(1), nextVisibleSlide!]);
  }

  addPrevSlide(slide: Slide): void {
    this.allSlides$.next([slide, ...this.allSlides$.value]);
    const visibleSlides = this.visibleSlides$.value;
    const prevVisibleSlide = this.findSlide(moment(visibleSlides[0].flightDate).subtract(1, 'days').format('LL'));
    this.visibleSlides$.next([prevVisibleSlide!, ...visibleSlides.slice(0, -1)]);
  }

  setFlight(newFlight: Flight): void {
    this.flight$.next(newFlight);
  }

  private findSlide(date: string): Slide | undefined {
    return this.allSlides$.value.find((item: Slide) => item.flightDate === date);
  }
}
