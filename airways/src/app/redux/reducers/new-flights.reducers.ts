import { createReducer, on } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/shared/constants/local-storage-keys.enum';
import { FlightsState } from '../state.models';
import * as FlightsActions from '../actions/new-flights.actions';

function getData() {
  const data = localStorage.getItem(LocalStorageKeysEnum.Flights);

  return data ? (JSON.parse(data) as FlightsState) : null;
}

export const flightsReducersNode = 'new-flights';

export const initialState: FlightsState = {
  isRoundTrip: getData()?.isOneWayTrip,
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
      from: action.flightsState.from,
      to: action.flightsState.to,
      startTripDate: action.flightsState.startTripDate,
      rangeTripDates: action.flightsState.rangeTripDates,
      passengers: action.flightsState.passengers,
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
    }),
  ),
  on(
    FlightsActions.setRange,
    (state, action) => ({
      ...state,
      rangeTripDates: action.range,
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
