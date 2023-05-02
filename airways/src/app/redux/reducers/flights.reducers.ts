import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { FoundFlights, SearchParams } from 'src/app/flight/models/flight.models';
import { searchParamsNode, searchParamsReducer } from './search-params/search-params.reducer';
import { foundFlightsNode, foundFlightsReducer } from './found-flights/found-flights.reducer';
import { flightsReducers, flightsReducersNode } from './new-flights.reducers';
import { FlightsState } from '../state.models';

export interface State {
  [searchParamsNode]: SearchParams,
  [foundFlightsNode]: FoundFlights,
  [flightsReducersNode]: FlightsState,
}

export const reducers: ActionReducerMap<State> = {
  [searchParamsNode]: searchParamsReducer,
  [foundFlightsNode]: foundFlightsReducer,
  [flightsReducersNode]: flightsReducers,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
