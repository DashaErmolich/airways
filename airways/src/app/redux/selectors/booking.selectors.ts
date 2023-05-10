import { createSelector } from '@ngrx/store';
import { AppState } from '../state.models';

export const selectFeature = (state: AppState) => state.booking;

export const selectDirectFlights = createSelector(
  selectFeature,
  (state) => state.directFlights,
);

export const selectForwardFlights = createSelector(
  selectFeature,
  (state) => state.forwardFlights,
);

export const selectBookingPassengers = createSelector(
  selectFeature,
  (state) => state.passengers,
);
