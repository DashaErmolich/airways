import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { FoundFlights, SearchParams } from 'src/app/flight/models/flight.models';
import { searchParamsNode, searchParamsReducer } from './search-params/search-params.reducer';
import { foundFlightsNode, foundFlightsReducer } from './found-flights/found-flights.reducer';

export interface State {
  [searchParamsNode]: SearchParams,
  [foundFlightsNode]: FoundFlights,
}

export const reducers: ActionReducerMap<State> = {
  [searchParamsNode]: searchParamsReducer,
  [foundFlightsNode]: foundFlightsReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
