import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedFlightDescriptionComponent } from './connected-flight-description.component';

describe('ConnectedFlightDescriptionComponent', () => {
  let component: ConnectedFlightDescriptionComponent;
  let fixture: ComponentFixture<ConnectedFlightDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectedFlightDescriptionComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConnectedFlightDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
