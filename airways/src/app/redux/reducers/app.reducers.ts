import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { SearchParams } from 'src/app/flight/models/flight.models';
import { searchParamsNode, searchParamsReducer } from './search-params/search-params.reducer';

export interface State {
  [searchParamsNode]: SearchParams,
}

export const reducers: ActionReducerMap<State> = {
  [searchParamsNode]: searchParamsReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
