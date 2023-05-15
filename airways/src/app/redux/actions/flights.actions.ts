import { createAction, props } from '@ngrx/store';
import {
  Airport, DatesRange, Flight, Passengers,
} from 'src/app/flight/models/flight.models';
import { TripSearchState } from '../state.models';

const enum FlightsActionsTypes {
  FLIGHTS_SEARCH_SET_PARAMS = '[Flights Search] Set Params',
  FLIGHTS_SEARCH_SET_PARAMS_SUCCESS = '[Flights Search] Set Params Success',
  FLIGHTS_SEARCH_SET_PARAMS_FAILURE = '[Flights Search] Set Params Failure',

  FLIGHTS_GET_DATA = '[Flights] Get Data',
  FLIGHTS_GET_DATA_RETURN_SUCCESS = '[Flights] Get Return Data Success',
  FLIGHTS_GET_DATA_FORWARD_SUCCESS = '[Flights] Get Forward Data Success',
  FLIGHTS_GET_DATA_FAILURE = '[Flights] Get Data Failure',

  FLIGHTS_SET_RETURN_FLIGHT = '[Flights] Set Return Flight',
  FLIGHTS_SET_FORWARD_FLIGHT = '[Flights] Set Forward Flight',

  FLIGHTS_SET_FLIGHT = '[Flights] Set Flight',

  FLIGHTS_SEARCH_SET_PASSENGERS = '[Flights Search] Set Passengers',
  FLIGHTS_SEARCH_SET_FROM = '[Flights Search] Set From',
  FLIGHTS_SEARCH_SET_TO = '[Flights Search] Set To',
  FLIGHTS_SEARCH_SET_DATE = '[Flights Search] Set Date',
  FLIGHTS_SEARCH_SET_RANGE = '[Flights Search] Set Range',
}

export const searchFormSubmit = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_SET_PARAMS,
  props<{ flightsSearchData: TripSearchState }>(),
);

export const searchFormSubmitSuccess = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_SET_PARAMS_SUCCESS,
  props<{ availableFlights: Flight[] }>(),
);

export const searchFormSubmitFailure = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_SET_PARAMS_FAILURE,
  props<{ error: string }>(),
);

export const searchFlights = createAction(
  FlightsActionsTypes.FLIGHTS_GET_DATA,
  props<{ isReturn: boolean }>(),
);

export const getReturnFlightsDataSuccess = createAction(
  FlightsActionsTypes.FLIGHTS_GET_DATA_RETURN_SUCCESS,
  props<{ returnFlights: Flight[][] }>(),
);

export const getForwardFlightsDataSuccess = createAction(
  FlightsActionsTypes.FLIGHTS_GET_DATA_FORWARD_SUCCESS,
  props<{ forwardFlights: Flight[][] }>(),
);

export const getFlightsDataFailure = createAction(
  FlightsActionsTypes.FLIGHTS_GET_DATA_FAILURE,
  props<{ error: string }>(),
);

export const setPassengers = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_SET_PASSENGERS,
  props<{ passengers: Passengers }>(),
);

export const setFromAirport = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_SET_FROM,
  props<{ from: Airport }>(),
);

export const setToAirport = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_SET_TO,
  props<{ to: Airport }>(),
);

export const setDatesRange = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_SET_RANGE,
  props<{ range: DatesRange }>(),
);

export const setDepartureDate = createAction(
  FlightsActionsTypes.FLIGHTS_SEARCH_SET_DATE,
  props<{ startTripDate: string }>(),
);

export const setSelectedFlight = createAction(
  FlightsActionsTypes.FLIGHTS_SET_FLIGHT,
  props<{ flights: Flight[][] }>(),
);

export const setForwardFlight = createAction(
  FlightsActionsTypes.FLIGHTS_SET_FORWARD_FLIGHT,
  props<({ forwardFlight: Flight })>(),
);

export const setReturnFlight = createAction(
  FlightsActionsTypes.FLIGHTS_SET_RETURN_FLIGHT,
  props<({ returnFlight: Flight })>(),
);
