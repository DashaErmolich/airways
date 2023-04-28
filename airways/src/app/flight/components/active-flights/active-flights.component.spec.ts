import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFlightsComponent } from './active-flights.component';

describe('ActiveFlightsComponent', () => {
  let component: ActiveFlightsComponent;
  let fixture: ComponentFixture<ActiveFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveFlightsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActiveFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
