import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCarouselComponent } from './calendar-carousel.component';

describe('CarouselHolderComponent', () => {
  let component: CalendarCarouselComponent;
  let fixture: ComponentFixture<CalendarCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarCarouselComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
