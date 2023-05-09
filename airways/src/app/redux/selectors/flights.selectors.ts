import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightsState, FlightSearchState } from '../state.models';
import { flightsSearchReducersNode } from '../reducers/flights.reducers';
import { flightsReducersNode } from '../reducers/available-flights.reducers';

export const selectFlightsSearchFeature = createFeatureSelector<FlightSearchState>(flightsSearchReducersNode);

export const selectFlightsFeature = createFeatureSelector<FlightsState>(flightsReducersNode);

export const selectFlightSearchData = createSelector(
  selectFlightsSearchFeature,
  (state) => state,
);

export const selectIsOneWayTrip = createSelector(
  selectFlightsSearchFeature,
  (state) => state.isOneWayTrip,
);

export const selectPassengersQty = createSelector(
  selectFlightsSearchFeature,
  (state) => state.passengers.adult + state.passengers.child + state.passengers.infant,
);

export const selectSelectedFlight = createSelector(
  selectFlightsFeature,
  (state) => state.flights,
);

export const selectSelectedFlightIsLoading = createSelector(
  selectFlightsFeature,
  (state) => state.isLoading,
);

export const selectSelectedFlightError = createSelector(
  selectFlightsFeature,
  (state) => state.error,
);
