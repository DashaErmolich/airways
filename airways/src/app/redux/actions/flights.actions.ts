import { createAction, props } from '@ngrx/store';
import {
  Airport, DatesRange, AvailableFlight, Passengers,
} from 'src/app/flight/models/flight.models';
import { Slide } from 'src/app/flight/components/calendar-carousel/calendar-carousel.component';
import { FlightSearchState } from '../state.models';

const enum FlightsActionsTypes {
  FLIGHTS_SET_STATE = '[Flights] Set State',
  FLIGHTS_SET_STATE_SUCCESS = '[Flights] Set State Success',
  FLIGHTS_SET_STATE_FAILURE = '[Flights] Set State Failure',

  FLIGHTS_GET_AVAILABLE = '[Flights] Get Available',
  FLIGHTS_GET_AVAILABLE_SUCCESS = '[Flights] Get Available Success',
  FLIGHTS_GET_AVAILABLE_FAILURE = '[Flights] Get Available Failure',

  FLIGHTS_SET_ACTIVE_FLIGHT = '[Flights] Set Active Flight',
  FLIGHTS_SET_SLIDES = '[Flights] Set Slides',

  FLIGHTS_SET_PASSENGERS = '[Flights] Set Passengers',
  FLIGHTS_SET_FROM = '[Flights] Set From',
  FLIGHTS_SET_TO = '[Flights] Set To',
  FLIGHTS_SET_DATE = '[Flights] Set Date',
  FLIGHTS_SET_RANGE = '[Flights] Set Range',
}

export const searchFormSubmit = createAction(
  FlightsActionsTypes.FLIGHTS_SET_STATE,
  props<{ flightsSearchData: FlightSearchState }>(),
);

export const searchFormSubmitSuccess = createAction(
  FlightsActionsTypes.FLIGHTS_SET_STATE_SUCCESS,
  props<{ availableFlights: AvailableFlight[] }>(),
);

export const searchFormSubmitFailure = createAction(
  FlightsActionsTypes.FLIGHTS_SET_STATE_FAILURE,
  props<{ error: string }>(),
);

export const getAvailableFlights = createAction(
  FlightsActionsTypes.FLIGHTS_GET_AVAILABLE,
  props<{ flightsSearchData: FlightSearchState }>(),
);

export const getAvailableFlightsSuccess = createAction(
  FlightsActionsTypes.FLIGHTS_GET_AVAILABLE_SUCCESS,
  props<{ availableFlights: AvailableFlight[] }>(),
);

export const getAvailableFlightsFailure = createAction(
  FlightsActionsTypes.FLIGHTS_GET_AVAILABLE_FAILURE,
  props<{ error: string }>(),
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

export const setActiveFlights = createAction(
  FlightsActionsTypes.FLIGHTS_SET_ACTIVE_FLIGHT,
  props<{ activeFlights: AvailableFlight[] }>(),
);

export const setSlides = createAction(
  FlightsActionsTypes.FLIGHTS_SET_SLIDES,
  props<{ slides: Slide[] }>(),
);
