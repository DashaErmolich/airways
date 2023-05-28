import { createSelector } from '@ngrx/store';
import { AppState } from '../state.models';

const selectFeature = (state: AppState) => state.settings;

export const selectDateFormat = createSelector(
  selectFeature,
  (state) => state.dateFormat,
);

export const selectCurrency = createSelector(
  selectFeature,
  (state) => state.currency,
);
