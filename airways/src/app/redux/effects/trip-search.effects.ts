import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { Store } from '@ngrx/store';
import * as TripSearchActions from '../actions/trip-search.actions';
import { AppState } from '../state.models';
import { selectTripSearchState } from '../selectors/trip-search.selectors';

@Injectable()
export class TripSearchEffects {
  searchFormSubmit$ = createEffect(
    () => this.actions$.pipe(
      ofType(TripSearchActions.searchFormSubmit),
      tap(({ flightsSearchData }) => localStorage.setItem(LocalStorageKeysEnum.SearchParams, JSON.stringify(flightsSearchData))),
    ),
    { dispatch: false },
  );

  setTripDate$ = createEffect(
    () => this.actions$.pipe(
      ofType(TripSearchActions.setStartTripDate),
      withLatestFrom(this.store$.select(selectTripSearchState)),
      tap(([{ startTripDate }, searchData]) => localStorage.setItem(LocalStorageKeysEnum.SearchParams, JSON.stringify({ ...searchData, startTripDate }))),
    ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) { }
}
