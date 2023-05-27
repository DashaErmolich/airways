import { createReducer, on } from '@ngrx/store';
import { BookingState } from '../state.models';
import * as BookingActions from '../actions/booking.actions';

export const bookingReducersNode = 'booking';

export const initialState: BookingState = {
  step: 1,
  passengers: null,
  forwardFlights: [],
  returnFlights: [],
  passengersInfo: null,
};

export const bookingReducers = createReducer(
  initialState,
  on(
    BookingActions.setFlights,
    (state, action) => ({
      ...state,
      forwardFlights: action.directFlights,
      returnFlights: action.forwardFlights,
    }),
  ),
  on(
    BookingActions.setPassengers,
    (state, action) => ({
      ...state,
      passengers: action.passengers,
    }),
  ),
  on(
    BookingActions.setStep,
    (state, action) => ({
      ...state,
      step: action.step,
    }),
  ),
  on(
    BookingActions.setPassengersInfo,
    (state, action) => ({
      ...state,
      passengersInfo: action.passengersInfo,
    }),
  ),
);
