import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { flightsSearchReducers, tripSearchReducersNode } from './trip-search.reducers';
import {
  FlightsState, TripSearchState, BookingState, AuthState, SettingsState,
} from '../state.models';
import { flightsReducers, flightsReducersNode } from './flights.reducers';
import { bookingReducersNode, bookingReducers } from './booking.reducers';
import { authReducers, authReducersNode } from './auth.reducers';
import { settingsReducers, settingsReducersNode } from './settings.reducers';

export interface State {
  [authReducersNode]: AuthState,
  [settingsReducersNode]: SettingsState,
  [tripSearchReducersNode]: TripSearchState,
  [flightsReducersNode]: FlightsState,
  [bookingReducersNode]: BookingState,
}

export const reducers: ActionReducerMap<State> = {
  [authReducersNode]: authReducers,
  [settingsReducersNode]: settingsReducers,
  [tripSearchReducersNode]: flightsSearchReducers,
  [flightsReducersNode]: flightsReducers,
  [bookingReducersNode]: bookingReducers,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
