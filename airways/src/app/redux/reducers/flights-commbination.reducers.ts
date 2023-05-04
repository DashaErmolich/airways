import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { SearchFormState } from 'src/app/flight/models/flight.models';
import { searchParamsNode, flightsSearchFormReducers } from './flights-search-form.reducers';
import { flightsReducers, flightsReducersNode } from './flights.reducers';
import { AvailableFlightsState, FlightSearchState } from '../state.models';
import { availableFlightsReducers, availableFlightsReducersNode } from './available-flights.reducers';

export interface State {
  [searchParamsNode]: SearchFormState,
  [flightsReducersNode]: FlightSearchState,
  [availableFlightsReducersNode]: AvailableFlightsState,
}

export const reducers: ActionReducerMap<State> = {
  [searchParamsNode]: flightsSearchFormReducers,
  [flightsReducersNode]: flightsReducers,
  [availableFlightsReducersNode]: availableFlightsReducers,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
