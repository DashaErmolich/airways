import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { SearchFormState } from 'src/app/flight/models/flight.models';
import { searchParamsNode, flightsSearchFormReducers } from './flights-search-form.reducers';
import { flightsSearchReducers, flightsSearchReducersNode } from './flights.reducers';
import { FlightsState, FlightSearchState, BookingState } from '../state.models';
import { flightsReducers, flightsReducersNode } from './available-flights.reducers';
import { bookingReducersNode, bookingReducers } from './booking.reducers';

export interface State {
  [searchParamsNode]: SearchFormState,
  [flightsSearchReducersNode]: FlightSearchState,
  [flightsReducersNode]: FlightsState,
  [bookingReducersNode]: BookingState,
}

export const reducers: ActionReducerMap<State> = {
  [searchParamsNode]: flightsSearchFormReducers,
  [flightsSearchReducersNode]: flightsSearchReducers,
  [flightsReducersNode]: flightsReducers,
  [bookingReducersNode]: bookingReducers,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
