import {
  Component, Input,
} from '@angular/core';
import { MatIconService } from 'src/app/core/services/icon.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { BOOKING_STEPS_CONFIG } from 'src/app/core/constants/booking-steps.constants';
import { BookingStepsService } from 'src/app/core/services/booking-steps.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input() currentBookingStepNumber: number | null = null;

  steps = BOOKING_STEPS_CONFIG;

  constructor(
    private matIconService: MatIconService,
    public layout: LayoutService,
    private bookingStepsService: BookingStepsService,
  ) { }

  isActive(step: number): boolean {
    return step === this.currentBookingStepNumber;
  }

  isDone(step: number): boolean {
    return step < this.currentBookingStepNumber!;
  }

  isFuture(step: number): boolean {
    return !this.isDone(step) && !this.isActive(step);
  }

  isStepperVisible(): boolean {
    return this.bookingStepsService.isStepperVisible(this.currentBookingStepNumber!);
  }

  isPrimaryColor(step: number): boolean {
    return this.isDone(step) || this.isActive(step);
  }

  isLastStep(step: number): boolean {
    return this.bookingStepsService.isLastStep(step);
  }
}
