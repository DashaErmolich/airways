import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import {
  AuthState, BookingState, FlightsState, Order, SettingsState, TripSearchState, UserTripsState,
} from '../state.models';
import { authReducers, authReducersNode } from './auth.reducers';
import { bookingReducers, bookingReducersNode } from './booking.reducers';
import { flightsReducers, flightsReducersNode } from './flights.reducers';
import { settingsReducers, settingsReducersNode } from './settings.reducers';
import { shoppingCartReducers, shoppingCartReducersNode } from './shopping-cart.reducers';
import { flightsSearchReducers, tripSearchReducersNode } from './trip-search.reducers';
import { userTripsReducers, userTripsReducersNode } from './user-trips.reducers';

export interface State {
  [authReducersNode]: AuthState,
  [settingsReducersNode]: SettingsState,
  [tripSearchReducersNode]: TripSearchState,
  [flightsReducersNode]: FlightsState,
  [bookingReducersNode]: BookingState,
  // [shoppingCartReducersNode]: Order[],
  [userTripsReducersNode]: UserTripsState,
}

export const reducers: ActionReducerMap<State> = {
  [authReducersNode]: authReducers,
  [settingsReducersNode]: settingsReducers,
  [tripSearchReducersNode]: flightsSearchReducers,
  [flightsReducersNode]: flightsReducers,
  [bookingReducersNode]: bookingReducers,
  // [shoppingCartReducersNode]: shoppingCartReducers,
  [userTripsReducersNode]: userTripsReducers,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
