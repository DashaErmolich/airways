import { createReducer, on } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/shared/constants/local-storage-keys.enum';
import { FlightSearchState } from '../state.models';
import * as FlightsActions from '../actions/flights.actions';

function getData() {
  const data = localStorage.getItem(LocalStorageKeysEnum.Flights);

  return data ? (JSON.parse(data) as FlightSearchState) : null;
}

export const flightsReducersNode = 'flights';

export const initialState: FlightSearchState = {
  isRoundTrip: getData()?.isRoundTrip,
  isOneWayTrip: getData()?.isOneWayTrip,
  from: getData()?.from,
  to: getData()?.to,
  startTripDate: getData()?.startTripDate,
  rangeTripDates: getData()?.rangeTripDates,
  passengers: getData()?.passengers,
};

export const flightsReducers = createReducer(
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
    FlightsActions.setDate,
    (state, action) => ({
      ...state,
      startTripDate: action.startTripDate,
      rangeTripDates: null,
    }),
  ),
  on(
    FlightsActions.setRange,
    (state, action) => ({
      ...state,
      rangeTripDates: action.range,
      startTripDate: null,
    }),
  ),
  on(
    FlightsActions.setFrom,
    (state, action) => ({
      ...state,
      from: action.from,
    }),
  ),
  on(
    FlightsActions.setTo,
    (state, action) => ({
      ...state,
      from: action.to,
    }),
  ),
);
