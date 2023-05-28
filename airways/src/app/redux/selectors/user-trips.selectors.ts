import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Orders } from '../state.models';
import { userTripsReducersNode } from '../reducers/user-trips.reducers';

const selectFeature = createFeatureSelector<Orders>(userTripsReducersNode);

export const selectUserTrips = createSelector(
  selectFeature,
  (state) => state.orders,
);
