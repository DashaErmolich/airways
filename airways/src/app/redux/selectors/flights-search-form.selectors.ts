import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  Directions, SearchFormState,
} from 'src/app/flight/models/flight.models';
import { searchParamsNode } from '../reducers/flights-search-form.reducers';

export const selectSearchParamsFeature = createFeatureSelector<SearchFormState>(searchParamsNode);

export const selectAllSearchParams = createSelector(
  selectSearchParamsFeature,
  (state: SearchFormState): SearchFormState => state,
);

export const selectDirections = createSelector(
  selectSearchParamsFeature,
  (state: SearchFormState): Directions | null => state.directions,
);

export const selectDate = createSelector(
  selectSearchParamsFeature,
  (state: SearchFormState): string | null => state.date,
);
