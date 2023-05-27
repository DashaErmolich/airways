import { createAction, props } from '@ngrx/store';
import { Order } from '../state.models';

const enum UserTripsActionsTypes {
  USER_TRIPS_ADD_TRIP = '[USER TRIPS] Add Trip',
  USER_TRIPS_ADD_TRIP_SUCCESS = '[USER TRIPS] Add Trip Success',
  USER_TRIPS_ADD_TRIP_FAILURE = '[USER TRIPS] Add Trip Failure',
}

export const addOrderUserTrips = createAction(
  UserTripsActionsTypes.USER_TRIPS_ADD_TRIP,
);

export const addOrderUserTripsSuccess = createAction(
  UserTripsActionsTypes.USER_TRIPS_ADD_TRIP_SUCCESS,
  props<{ order: Order }>(),
);

export const addOrderUserTripsFailure = createAction(
  UserTripsActionsTypes.USER_TRIPS_ADD_TRIP_FAILURE,
);
