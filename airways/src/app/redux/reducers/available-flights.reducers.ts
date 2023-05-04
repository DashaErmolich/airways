import { createReducer, on } from '@ngrx/store';
import { AvailableFlightsState } from '../state.models';
import * as FlightsActions from '../actions/flights.actions';

// function getData() {
//   const data = localStorage.getItem(LocalStorageKeysEnum.Flights);

//   return data ? (JSON.parse(data) as FlightSearchState) : null;
// }

export const availableFlightsReducersNode = 'available-flights';

export const initialState: AvailableFlightsState = {
  isLoading: false,
  availableFlights: [],
  error: null,
};

export const availableFlightsReducers = createReducer(
  initialState,
  on(
    FlightsActions.getAvailableFlights,
    (state) => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    FlightsActions.getAvailableFlightsSuccess,
    (state, action) => ({
      ...state,
      isLoading: false,
      availableFlights: action.availableFlights,
    }),
  ),
  on(
    FlightsActions.getAvailableFlightsFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
);
