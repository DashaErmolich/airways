import { createSelector } from '@ngrx/store';
import { AppState } from '../state.models';

export const selectFeature = (state: AppState) => state.booking;

export const selectStep = createSelector(
  selectFeature,
  (state) => state.step,
);
