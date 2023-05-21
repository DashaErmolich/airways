import { createAction, props } from '@ngrx/store';
import { Airport, DatesRange, Passengers } from 'src/app/flight/models/flight.models';
import { TripSearchState } from '../state.models';

const enum FlightsActionsTypes {
  SEARCH_SUBMIT_FORM = '[Search] Form Submit',
  SEARCH_SET_TRIP_TYPE = '[Search] Set Trip Type',
  SEARCH_SET_FROM_AIRPORT = '[Search] Set From',
  SEARCH_SET_TO_AIRPORT = '[Search] Set To',
  SEARCH_SET_START_TRIP_DATE = '[Search] Set Date',
  SEARCH_SET_RANGE_TRIP_DATES = '[Search] Set Dates Range',
  SEARCH_SET_PASSENGERS = '[Search] Set Passengers',
}

export const searchFormSubmit = createAction(
  FlightsActionsTypes.SEARCH_SUBMIT_FORM,
  props<{ flightsSearchData: TripSearchState }>(),
);

export const setTripType = createAction(
  FlightsActionsTypes.SEARCH_SET_TRIP_TYPE,
  props<({ isOneWayTrip: boolean, isRoundTrip: boolean })>(),
);

export const setFromAirport = createAction(
  FlightsActionsTypes.SEARCH_SET_FROM_AIRPORT,
  props<{ from: Airport }>(),
);

export const setToAirport = createAction(
  FlightsActionsTypes.SEARCH_SET_TO_AIRPORT,
  props<{ to: Airport }>(),
);

export const setRangeTripDates = createAction(
  FlightsActionsTypes.SEARCH_SET_RANGE_TRIP_DATES,
  props<{ range: DatesRange }>(),
);

export const setStartTripDate = createAction(
  FlightsActionsTypes.SEARCH_SET_START_TRIP_DATE,
  props<{ startTripDate: string }>(),
);

export const setPassengers = createAction(
  FlightsActionsTypes.SEARCH_SET_PASSENGERS,
  props<{ passengers: Passengers }>(),
);
