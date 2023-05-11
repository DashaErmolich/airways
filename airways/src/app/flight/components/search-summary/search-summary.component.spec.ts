import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsSearchSummaryComponent } from './search-summary.component';

describe('FlightInfoComponent', () => {
  let component: FlightsSearchSummaryComponent;
  let fixture: ComponentFixture<FlightsSearchSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsSearchSummaryComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlightsSearchSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
