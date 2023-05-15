import { createReducer, on } from '@ngrx/store';
import { FlightsState } from '../state.models';
import * as FlightsActions from '../actions/flights.actions';

export const flightsReducersNode = 'flights-search-results';

export const initialState: FlightsState = {
  isLoading: false,
  error: null,
  forwardFlights: [],
  returnFlights: [],
  forwardFlight: null,
  returnFlight: null,
};

export const flightsReducers = createReducer(
  initialState,
  on(
    FlightsActions.searchFlights,
    (state) => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    FlightsActions.getReturnFlightsDataSuccess,
    (state, action) => ({
      ...state,
      isLoading: false,
      returnFlights: action.returnFlights,
    }),
  ),
  on(
    FlightsActions.getForwardFlightsDataSuccess,
    (state, action) => ({
      ...state,
      isLoading: false,
      forwardFlights: action.forwardFlights,
    }),
  ),
  on(
    FlightsActions.getFlightsDataFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
  on(
    FlightsActions.setSelectedFlight,
    (state, action) => ({
      ...state,
      flights: action.flights,
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
