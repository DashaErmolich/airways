import { createAction, props } from '@ngrx/store';
import { Airport, DatesRange, Passengers } from 'src/app/flight/models/flight.models';
import { FlightsState } from '../state.models';

const enum FlightsActionsTypes {
  FLIGHTS_SET_STATE = '[New Flights] Set State',
  FLIGHTS_SET_STATE_SUCCESS = '[New Flights] Set State Success',
  FLIGHTS_SET_STATE_FAILURE = '[New Flights] Set State Failure',

  FLIGHTS_SET_PASSENGERS = '[New Flights] Set Passengers',
  FLIGHTS_SET_FROM = '[New Flights] Set From',
  FLIGHTS_SET_TO = '[New Flights] Set To',
  FLIGHTS_SET_DATE = '[New Flights] Set Date',
  FLIGHTS_SET_RANGE = '[New Flights] Set Range',
}

export const searchFormSubmit = createAction(
  FlightsActionsTypes.FLIGHTS_SET_STATE,
  props<{ flightsState: FlightsState }>(),
);

export const searchFormSubmitSuccess = createAction(
  FlightsActionsTypes.FLIGHTS_SET_STATE_SUCCESS,
  props<{ flightsState: FlightsState }>(),
);

export const setPassengers = createAction(
  FlightsActionsTypes.FLIGHTS_SET_PASSENGERS,
  props<{ passengers: Passengers }>(),
);

export const setFrom = createAction(
  FlightsActionsTypes.FLIGHTS_SET_FROM,
  props<{ from: Airport }>(),
);

export const setTo = createAction(
  FlightsActionsTypes.FLIGHTS_SET_TO,
  props<{ to: Airport }>(),
);

export const setRange = createAction(
  FlightsActionsTypes.FLIGHTS_SET_RANGE,
  props<{ range: DatesRange }>(),
);

export const setDate = createAction(
  FlightsActionsTypes.FLIGHTS_SET_DATE,
  props<{ startTripDate: string }>(),
);
