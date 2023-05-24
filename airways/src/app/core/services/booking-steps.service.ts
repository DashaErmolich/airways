/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { BookingStepsEnum } from 'src/app/core/constants/booking-steps.constants';

@Injectable({
  providedIn: 'root',
})
export class BookingStepsService {
  isSearchPage(currentStep: number): boolean {
    return currentStep === BookingStepsEnum.First;
  }

  isStepperVisible(currentStep: number): boolean {
    return currentStep >= BookingStepsEnum.Second && currentStep <= BookingStepsEnum.Fourth;
  }

  isLastStep(currentStep: number): boolean {
    return currentStep === BookingStepsEnum.Fourth;
  }
}
