import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripSearchState } from '../state.models';
import { tripSearchReducersNode } from '../reducers/trip-search.reducers';

export const selectTripSearchFeature = createFeatureSelector<TripSearchState>(tripSearchReducersNode);

export const selectTripSearchState = createSelector(
  selectTripSearchFeature,
  (state) => state,
);

export const selectIsOneWayTrip = createSelector(
  selectTripSearchFeature,
  (state) => state.isOneWayTrip,
);

export const selectPassengersQty = createSelector(
  selectTripSearchFeature,
  (state) => state.passengers.adult + state.passengers.child + state.passengers.infant,
);

export const selectPassengers = createSelector(
  selectTripSearchFeature,
  (state) => state.passengers,
);
