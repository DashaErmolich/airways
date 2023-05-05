import { createReducer, on } from '@ngrx/store';
import { AvailableFlightsState } from '../state.models';
import * as FlightsActions from '../actions/flights.actions';

export const availableFlightsReducersNode = 'available-flights';

export const initialState: AvailableFlightsState = {
  isLoading: false,
  availableFlights: [],
  error: null,
  activeFlights: [],
  slides: [],
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
  on(
    FlightsActions.setActiveFlights,
    (state, action) => ({
      ...state,
      activeFlights: action.activeFlights,
    }),
  ),
  on(
    FlightsActions.setSlides,
    (state, action) => ({
      ...state,
      slides: action.slides,
    }),
  ),
);
