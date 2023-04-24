import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Directions, SearchParams } from 'src/app/flight/models/flight.models';
import { searchParamsNode } from '../reducers/search-params/search-params.reducer';

export const selectSearchParamsFeature = createFeatureSelector<SearchParams>(searchParamsNode);

export const selectAllSearchParams = createSelector(
  selectSearchParamsFeature,
  (state: SearchParams): SearchParams => state,
);

export const selectDirections = createSelector(
  selectSearchParamsFeature,
  (state: SearchParams): Directions => state.directions,
);
