import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightsState } from '../state.models';
import { flightsReducersNode } from '../reducers/new-flights.reducers';

// export const selectFlightsFeature = (state: AppState) => state.flights;

export const selectFlightsFeature = createFeatureSelector<FlightsState>(flightsReducersNode);

export const selectFlights = createSelector(
  selectFlightsFeature,
  (state) => state,
);
