import { createReducer, on } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { BookingDetails, BookingState } from '../state.models';
import * as BookingActions from '../actions/booking.actions';

export const bookingReducersNode = 'booking';

function getBookingState(): BookingDetails | null {
  const user = localStorage.getItem(LocalStorageKeysEnum.BookingDetails);
  return user ? JSON.parse(user) : null;
}

const initialState: BookingState = {
  step: 1,
  adult: getBookingState() ? getBookingState()!.adult : [],
  child: getBookingState() ? getBookingState()!.child : [],
  infant: getBookingState() ? getBookingState()!.infant : [],
  contactDetails: {
    countryCode: getBookingState() ? getBookingState()!.contactDetails.countryCode : null,
    phoneNumber: getBookingState() ? getBookingState()!.contactDetails.phoneNumber : null,
    email: getBookingState() ? getBookingState()!.contactDetails.email : null,
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
  on(
    BookingActions.reset,
    () => ({
      ...initialState,
    }),
  ),
);
