import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightsState, TripSearchState } from '../state.models';
import { flightsSearchReducersNode } from '../reducers/flights.reducers';
import { flightsReducersNode } from '../reducers/available-flights.reducers';

export const selectFlightsSearchFeature = createFeatureSelector<TripSearchState>(flightsSearchReducersNode);

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

export const selectPassengers = createSelector(
  selectFlightsSearchFeature,
  (state) => state.passengers,
);

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
