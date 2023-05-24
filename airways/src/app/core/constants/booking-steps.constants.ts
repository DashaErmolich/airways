import { BookingStep } from 'src/app/core/models/booking-steps.model';

export enum BookingStepsEnum {
  First = 1,
  Second = 2,
  Third = 3,
  Fourth = 4,
}

export const BOOKING_STEPS_CONFIG: BookingStep[] = [
  {
    number: BookingStepsEnum.First,
    label: 'Search',
    icon: 'one',
  },
  {
    number: BookingStepsEnum.Second,
    label: 'Flights',
    icon: 'two',
  },
  {
    number: BookingStepsEnum.Third,
    label: 'Passengers',
    icon: 'three',
  },
  {
    number: BookingStepsEnum.Fourth,
    label: 'Payment',
    icon: 'four',
  },
];
