import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDescriptionComponent } from './flight-description.component';

describe('FlightDescriptionComponent', () => {
  let component: FlightDescriptionComponent;
  let fixture: ComponentFixture<FlightDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightDescriptionComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlightDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
