import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AvailableFlightsState, FlightSearchState } from '../state.models';
import { flightsReducersNode } from '../reducers/flights.reducers';
import { availableFlightsReducersNode } from '../reducers/available-flights.reducers';

export const selectFlightsFeature = createFeatureSelector<FlightSearchState>(flightsReducersNode);

// eslint-disable-next-line max-len
export const selectAvailableFlightsFeature = createFeatureSelector<AvailableFlightsState>(availableFlightsReducersNode);

export const selectFlightSearchData = createSelector(
  selectFlightsFeature,
  (state) => state,
);

export const selectIsOneWayTrip = createSelector(
  selectFlightsFeature,
  (state) => state.isOneWayTrip,
);

export const selectAvailableFlights = createSelector(
  selectAvailableFlightsFeature,
  (state) => state.availableFlights,
);

export const selectAvailableFlightsIsLoading = createSelector(
  selectAvailableFlightsFeature,
  (state) => state.isLoading,
);

export const selectAvailableFlightsError = createSelector(
  selectAvailableFlightsFeature,
  (state) => state.error,
);
