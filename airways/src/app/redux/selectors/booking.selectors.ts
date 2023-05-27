import { createSelector } from '@ngrx/store';
import { AppState } from '../state.models';

export const selectFeature = (state: AppState) => state.booking;

export const selectStep = createSelector(
  selectFeature,
  (state) => state.step,
);

export const selectAdult = createSelector(
  selectFeature,
  (state) => state.adult,
);

export const selectChild = createSelector(
  selectFeature,
  (state) => state.child,
);

export const selectInfant = createSelector(
  selectFeature,
  (state) => state.infant,
);

export const selectBookingState = createSelector(
  selectFeature,
  (state) => state,
);
