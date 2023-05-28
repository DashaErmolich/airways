import { createAction, props } from '@ngrx/store';
import { Flight } from 'src/app/flight/models/flight.models';

const enum FlightsActionsTypes {
  FLIGHTS_SEARCH_ALL = '[Flights] Search All Flights',
  FLIGHTS_SEARCH_RETURN_SUCCESS = '[Flights] Search Return Success',
  FLIGHTS_SEARCH_FORWARD_SUCCESS = '[Flights] Search Forward Success',
  FLIGHTS_SEARCH_ALL_FAILURE = '[Flights] Search All Failure',
  FLIGHT_SET_RETURN = '[Flight] Set Return',
  FLIGHT_SET_FORWARD = '[Flight] Set Forward',
  FLIGHTS_RESET = '[Flights] Reset',
}

export const searchAllFlights = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_ALL,
  props<{ isReturn: boolean }>(),
);

export const searchReturnFlightsSuccess = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_RETURN_SUCCESS,
  props<{ returnFlights: Flight[] }>(),
);

export const searchForwardFlightsSuccess = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_FORWARD_SUCCESS,
  props<{ forwardFlights: Flight[] }>(),
);

export const searchAllFlightsFailure = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_ALL_FAILURE,
  props<{ error: string }>(),
);

export const setReturnFlight = createAction(
  FlightsActionsTypes.FLIGHT_SET_RETURN,
  props<({ returnFlight: Flight | null })>(),
);

export const setForwardFlight = createAction(
  FlightsActionsTypes.FLIGHT_SET_FORWARD,
  props<({ forwardFlight: Flight })>(),
);

export const reset = createAction(
  FlightsActionsTypes.FLIGHTS_RESET,
);
