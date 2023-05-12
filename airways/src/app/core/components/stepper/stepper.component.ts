import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectStep } from 'src/app/redux/selectors/booking.selectors';
import { AppState } from 'src/app/redux/state.models';
import { MatIconService } from 'src/app/shared/services/icon.service';
import { Subscription } from 'rxjs';
import { StepsEnum } from '../../constants/steps.enum';

interface Step {
  number: number,
  label: string,
  icon: string,
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {
  steps: Step[] = [
    {
      number: 1,
      label: 'Search',
      icon: 'one',
    },
    {
      number: 2,
      label: 'Flights',
      icon: 'two',
    },
    {
      number: 3,
      label: 'Passengers',
      icon: 'three',
    },
    {
      number: 4,
      label: 'Payment',
      icon: 'four',
    },
  ];

  allSteps = Object.values(StepsEnum);

  activeState!: number;

  private subscription = new Subscription();

  constructor(
    private matIconService: MatIconService,
    private store$: Store<AppState>,
  ) { }

  ngOnInit() {
    this.subscription = this.store$.select(selectStep).subscribe((res: number) => {
      this.activeState = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isActive(step: number): boolean {
    return step === this.activeState;
  }

  isDone(step: number): boolean {
    return step < this.activeState;
  }

  isFuture(step: number): boolean {
    return !this.isDone(step) && !this.isActive(step);
  }
}
