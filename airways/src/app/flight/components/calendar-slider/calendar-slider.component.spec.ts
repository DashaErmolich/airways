import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSliderComponent } from './calendar-slider.component';

describe('CalendarSliderComponent', () => {
  let component: CalendarSliderComponent;
  let fixture: ComponentFixture<CalendarSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarSliderComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
