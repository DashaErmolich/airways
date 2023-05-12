import { createReducer, on } from '@ngrx/store';
import { BookingState } from '../state.models';
import * as BookingActions from '../actions/booking.actions';

export const bookingReducersNode = 'booking';

export const initialState: BookingState = {
  step: 1,
  passengers: null,
  directFlights: [],
  forwardFlights: [],
};

export const bookingReducers = createReducer(
  initialState,
  on(
    BookingActions.setFlights,
    (state, action) => ({
      ...state,
      directFlights: action.directFlights,
      forwardFlights: action.forwardFlights,
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
);
