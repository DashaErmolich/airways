import { createReducer, on } from '@ngrx/store';
import { BookingState } from '../state.models';
import * as BookingActions from '../actions/booking.actions';

export const bookingReducersNode = 'booking';

export const initialState: BookingState = {
  step: 1,
  adult: [],
  child: [],
  infant: [],
  contactDetails: {
    countryCode: null,
    phoneNumber: null,
    email: null,
  },
};

export const bookingReducers = createReducer(
  initialState,
  on(
    BookingActions.setStep,
    (state, action) => ({
      ...state,
      step: action.step,
    }),
  ),
  on(
    BookingActions.setPassengers,
    (state, action) => ({
      ...state,
      adult: action.adult,
      child: action.child,
      infant: action.infant,
      contactDetails: action.contactDetails,
    }),
  ),
);
