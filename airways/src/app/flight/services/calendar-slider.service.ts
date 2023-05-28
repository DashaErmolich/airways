import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { DatesService } from 'src/app/flight/services/dates.service';
import { Slide } from 'src/app/flight/models/slider.models';

@Injectable()
export class CalendarSliderService {
  public allSlides$ = new BehaviorSubject<Slide[]>([]);

  public visibleSlides$ = new BehaviorSubject<Slide[]>([]);

  constructor(
    private datesService: DatesService,
  ) { }

  setSlides(slides: Slide[]): void {
    this.allSlides$.next(slides);
    this.visibleSlides$.next(slides);
  }

  addNextSlide(slide: Slide): void {
    this.allSlides$.next([...this.allSlides$.value, slide]);
    const visibleSlides = this.visibleSlides$.value;
    const nextVisibleSlide = this.findSlide(this.datesService.getNextCalendarDate(visibleSlides[visibleSlides.length - 1].date));
    this.visibleSlides$.next([...visibleSlides.slice(1), nextVisibleSlide!]);
  }

  addPrevSlide(slide: Slide): void {
    this.allSlides$.next([slide, ...this.allSlides$.value]);
    const visibleSlides = this.visibleSlides$.value;
    const prevVisibleSlide = this.findSlide(this.datesService.getPrevCalendarDate(visibleSlides[0].date));
    this.visibleSlides$.next([prevVisibleSlide!, ...visibleSlides.slice(0, -1)]);
  }

  private findSlide(date: string): Slide | undefined {
    return this.allSlides$.value.find((item: Slide) => item.date === date);
  }
}
