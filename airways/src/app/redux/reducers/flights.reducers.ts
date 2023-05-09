import { createReducer, on } from '@ngrx/store';
import { PASSENGERS_DEFAULT } from 'src/app/flight/constants/constants';
import { AIRPORTS } from 'src/app/flight/constants/data';
import { FlightSearchState } from '../state.models';
import * as FlightsActions from '../actions/flights.actions';

export const flightsSearchReducersNode = 'flights';

export const initialState: FlightSearchState = {
  isRoundTrip: false,
  isOneWayTrip: true,
  from: AIRPORTS[0],
  to: AIRPORTS[1],
  startTripDate: (new Date()).toDateString(),
  rangeTripDates: null,
  passengers: PASSENGERS_DEFAULT,
};

export const flightsSearchReducers = createReducer(
  initialState,
  on(
    FlightsActions.searchFormSubmit,
    (state, action) => ({
      ...state,
      isRoundTrip: action.flightsSearchData.isRoundTrip,
      isOneWayTrip: action.flightsSearchData.isOneWayTrip,
      from: action.flightsSearchData.from,
      to: action.flightsSearchData.to,
      startTripDate: action.flightsSearchData.startTripDate,
      rangeTripDates: action.flightsSearchData.rangeTripDates,
      passengers: action.flightsSearchData.passengers,
    }),
  ),
  on(
    FlightsActions.setPassengers,
    (state, action) => ({
      ...state,
      passengers: action.passengers,
    }),
  ),
  on(
    FlightsActions.setDepartureDate,
    (state, action) => ({
      ...state,
      startTripDate: action.startTripDate,
      rangeTripDates: null,
    }),
  ),
  on(
    FlightsActions.setDatesRange,
    (state, action) => ({
      ...state,
      rangeTripDates: action.range,
      startTripDate: null,
    }),
  ),
  on(
    FlightsActions.setFromAirport,
    (state, action) => ({
      ...state,
      from: action.from,
    }),
  ),
  on(
    FlightsActions.setToAirport,
    (state, action) => ({
      ...state,
      from: action.to,
    }),
  ),
);
