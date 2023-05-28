import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightsState } from '../state.models';
import { flightsReducersNode } from '../reducers/flights.reducers';

const selectFlightsFeature = createFeatureSelector<FlightsState>(flightsReducersNode);

export const selectSelectedFlightIsLoading = createSelector(
  selectFlightsFeature,
  (state) => state.isLoading,
);

export const selectSelectedFlightError = createSelector(
  selectFlightsFeature,
  (state) => state.error,
);

export const selectForwardFlights = createSelector(
  selectFlightsFeature,
  (state) => state.forwardFlights,
);

export const selectReturnFlights = createSelector(
  selectFlightsFeature,
  (state) => state.returnFlights,
);

export const selectForwardFlight = createSelector(
  selectFlightsFeature,
  (state) => state.forwardFlight,
);

export const selectReturnFlight = createSelector(
  selectFlightsFeature,
  (state) => state.returnFlight,
);

export const selectForwardConnectedFlights = createSelector(
  selectFlightsFeature,
  (state) => (state.forwardFlight?.connectedFlights.length ? state.forwardFlight.connectedFlights : null),
);

export const selectReturnConnectedFlights = createSelector(
  selectFlightsFeature,
  (state) => (state.returnFlight?.connectedFlights.length ? state.returnFlight.connectedFlights : null),
);

export const selectFlightsState = createSelector(
  selectFlightsFeature,
  (state) => state,
);
