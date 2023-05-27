import { createReducer, on } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { Flight } from 'src/app/flight/models/flight.models';
import { FlightsState } from '../state.models';
import * as FlightsActions from '../actions/flights.actions';

export const flightsReducersNode = 'flights';

function getForwardFlight(key: LocalStorageKeysEnum): Flight | null {
  const flight = localStorage.getItem(key);
  return flight ? JSON.parse(flight) : null;
}

export const initialState: FlightsState = {
  isLoading: false,
  error: null,
  forwardFlights: [],
  returnFlights: [],
  forwardFlight: getForwardFlight(LocalStorageKeysEnum.ForwardFlight),
  returnFlight: getForwardFlight(LocalStorageKeysEnum.ReturnFlight),
};

export const flightsReducers = createReducer(
  initialState,
  on(
    FlightsActions.searchAllFlights,
    (state) => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    FlightsActions.searchReturnFlightsSuccess,
    (state, action) => ({
      ...state,
      isLoading: false,
      returnFlights: action.returnFlights,
    }),
  ),
  on(
    FlightsActions.searchForwardFlightsSuccess,
    (state, action) => ({
      ...state,
      isLoading: false,
      forwardFlights: action.forwardFlights,
    }),
  ),
  on(
    FlightsActions.searchAllFlightsFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
  on(
    FlightsActions.setForwardFlight,
    (state, action) => ({
      ...state,
      forwardFlight: action.forwardFlight,
    }),
  ),
  on(
    FlightsActions.setReturnFlight,
    (state, action) => ({
      ...state,
      returnFlight: action.returnFlight,
    }),
  ),
);
