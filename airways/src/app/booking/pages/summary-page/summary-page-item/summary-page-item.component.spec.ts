import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPageItemComponent } from './summary-page-item.component';

describe('SummaryPageItemComponent', () => {
  let component: SummaryPageItemComponent;
  let fixture: ComponentFixture<SummaryPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryPageItemComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SummaryPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
