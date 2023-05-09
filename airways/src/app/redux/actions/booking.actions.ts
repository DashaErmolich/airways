import { createAction, props } from '@ngrx/store';
import { Flight, Passengers } from 'src/app/flight/models/flight.models';

const enum BookingActionsTypes {
  BOOKING_SET_FLIGHTS = '[Booking] Set Flights',
  BOOKING_SET_PASSENGERS = '[Booking] Set Passengers',
}

export const setFlights = createAction(
  BookingActionsTypes.BOOKING_SET_FLIGHTS,
  props<{ directFlights: Flight[], forwardFlights: Flight[] }>(),
);

export const setPassengers = createAction(
  BookingActionsTypes.BOOKING_SET_PASSENGERS,
  props<{ passengers: Passengers }>(),
);
