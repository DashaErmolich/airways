import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTabComponent } from './sign-up-tab.component';

describe('SignUpTabComponent', () => {
  let component: SignUpTabComponent;
  let fixture: ComponentFixture<SignUpTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpTabComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
