import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFinishedComponent } from './booking-finished.component';

describe('BookingFinishedComponent', () => {
  let component: BookingFinishedComponent;
  let fixture: ComponentFixture<BookingFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingFinishedComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookingFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
