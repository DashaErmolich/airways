import { createReducer, on } from '@ngrx/store';
import { FlightsState } from '../state.models';
import * as FlightsActions from '../actions/flights.actions';

export const flightsReducersNode = 'available-flights';

export const initialState: FlightsState = {
  isLoading: false,
  error: null,
  flights: [],
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
    FlightsActions.getFlightsDataSuccess,
    (state, action) => ({
      ...state,
      isLoading: false,
      flights: action.flights,
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
);
