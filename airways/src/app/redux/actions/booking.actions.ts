import { createAction, props } from '@ngrx/store';
import { Flight, Passengers } from 'src/app/flight/models/flight.models';
import { BookingPassengersInfo } from 'src/app/flight/models/passengers.models';

const enum BookingActionsTypes {
  BOOKING_SET_FLIGHTS = '[Booking] Set Flights',
  BOOKING_SET_PASSENGERS = '[Booking] Set Passengers',
  BOOKING_SET_STEP = '[Booking] Set Step',
  BOOKING_SET_PASSENGERS_INFO = '[Booking] Set Passengers Info',
}

export const setFlights = createAction(
  BookingActionsTypes.BOOKING_SET_FLIGHTS,
  props<{ directFlights: Flight[], forwardFlights: Flight[] }>(),
);

export const setPassengers = createAction(
  BookingActionsTypes.BOOKING_SET_PASSENGERS,
  props<{ passengers: Passengers }>(),
);

export const setStep = createAction(
  BookingActionsTypes.BOOKING_SET_STEP,
  props<{ step: number }>(),
);

export const setPassengersInfo = createAction(
  BookingActionsTypes.BOOKING_SET_PASSENGERS_INFO,
  props<{ passengersInfo: BookingPassengersInfo }>(),
);
