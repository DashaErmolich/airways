import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { flightsSearchReducers, flightsSearchReducersNode } from './flights.reducers';
import { FlightsState, TripSearchState, BookingState } from '../state.models';
import { flightsReducers, flightsReducersNode } from './available-flights.reducers';
import { bookingReducersNode, bookingReducers } from './booking.reducers';

export interface State {
  [flightsSearchReducersNode]: TripSearchState,
  [flightsReducersNode]: FlightsState,
  [bookingReducersNode]: BookingState,
}

export const reducers: ActionReducerMap<State> = {
  [flightsSearchReducersNode]: flightsSearchReducers,
  [flightsReducersNode]: flightsReducers,
  [bookingReducersNode]: bookingReducers,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
