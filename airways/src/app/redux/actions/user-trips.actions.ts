import { createAction, props } from '@ngrx/store';
import { Order } from '../state.models';

const enum UserTripsActionsTypes {
  USER_TRIPS_ADD_TRIP = '[USER TRIPS] Add Trip',
  USER_TRIPS_ADD_TRIP_SUCCESS = '[USER TRIPS] Add Trip Success',
  USER_TRIPS_ADD_TRIP_FAILURE = '[USER TRIPS] Add Trip Failure',

  USER_TRIPS_ADD_TRIPS_FROM_CART = '[USER TRIPS] Add Trips From Cart',
  USER_TRIPS_ADD_TRIPS_FROM_CART_SUCCESS = '[USER TRIPS] Add Trips From Cart Success',
  USER_TRIPS_ADD_TRIPS_FROM_CART_FAILURE = '[USER TRIPS] Add Trips From Cart Failure',
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

export const addOrdersFromCart = createAction(
  UserTripsActionsTypes.USER_TRIPS_ADD_TRIPS_FROM_CART,
  props<{ productsIds: number[] }>(),
);

export const addOrdersFromCartSuccess = createAction(
  UserTripsActionsTypes.USER_TRIPS_ADD_TRIPS_FROM_CART_SUCCESS,
  props<{ orders: Order[] }>(),
);

export const addOrdersFromCartFailure = createAction(
  UserTripsActionsTypes.USER_TRIPS_ADD_TRIPS_FROM_CART_FAILURE,
);
