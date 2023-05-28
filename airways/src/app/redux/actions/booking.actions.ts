import { createAction, props } from '@ngrx/store';
import { BookingContactDetails, PassengerBooking } from 'src/app/booking/models/passengers-bookings.model';

const enum BookingActionsTypes {
  BOOKING_SET_STEP = '[Booking] Set Step',
  BOOKING_SET_PASSENGERS = '[Booking] Set Passengers',
  BOOKING_RESET = '[Booking] Reset',
}

export const setStep = createAction(
  BookingActionsTypes.BOOKING_SET_STEP,
  props<{ step: number }>(),
);

export const setPassengers = createAction(
  BookingActionsTypes.BOOKING_SET_PASSENGERS,
  props<{
    adult: PassengerBooking[],
    child: PassengerBooking[],
    infant: PassengerBooking[],
    contactDetails: BookingContactDetails,
  }>(),
);

export const reset = createAction(
  BookingActionsTypes.BOOKING_RESET,
);
