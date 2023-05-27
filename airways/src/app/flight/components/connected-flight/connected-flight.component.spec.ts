import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedFlightComponent } from './connected-flight.component';

describe('ConnectedFlightComponent', () => {
  let component: ConnectedFlightComponent;
  let fixture: ComponentFixture<ConnectedFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectedFlightComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConnectedFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
