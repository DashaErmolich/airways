import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import {
  catchError, map, mergeMap, withLatestFrom,
} from 'rxjs';
import { FlightsService } from 'src/app/flight/services/flights.service';
import { Store } from '@ngrx/store';
import { SLIDER_CONFIG } from 'src/app/flight/constants/slider.constants';
import * as FlightsActions from '../actions/flights.actions';
import { AppState } from '../state.models';
import { selectTripSearchState } from '../selectors/trip-search.selectors';
import { selectForwardFlights, selectReturnFlights } from '../selectors/flights.selectors';

@Injectable()
export class FlightsEffects {
  searchFlights$ = createEffect(() => this.actions$.pipe(
    ofType(FlightsActions.searchAllFlights),
    withLatestFrom(this.store$.select(selectTripSearchState)),
    mergeMap(([{ isReturn }, searchData]) => this.flightsService.searchMultipleFlights(
      {
        fromKey: !isReturn ? searchData.from!.key : searchData.to!.key,
        toKey: !isReturn ? searchData.to!.key : searchData.from!.key,
        forwardDate: '',
        backDate: '',
      },
      !isReturn ? (searchData.startTripDate || searchData.rangeTripDates!.start) : searchData.rangeTripDates!.end,
    ).pipe(
      map((res) => (!isReturn ? FlightsActions.searchForwardFlightsSuccess({ forwardFlights: res.flat() }) : FlightsActions.searchReturnFlightsSuccess({ returnFlights: res.flat() }))),
      catchError(async (error) => FlightsActions.searchAllFlightsFailure({ error: error.message })),
    )),
  ));

  searchForwardFlightsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(FlightsActions.searchForwardFlightsSuccess),
    withLatestFrom(this.store$.select(selectForwardFlights)),
    map(([{ forwardFlights }]) => FlightsActions.setForwardFlight({ forwardFlight: forwardFlights[SLIDER_CONFIG.centerSlideIndex] })),
  ));

  searchReturnFlightsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(FlightsActions.searchReturnFlightsSuccess),
    withLatestFrom(this.store$.select(selectReturnFlights)),
    map(([{ returnFlights }]) => FlightsActions.setReturnFlight({ returnFlight: returnFlights[SLIDER_CONFIG.centerSlideIndex] })),
  ));

  constructor(
    private actions$: Actions,
    private flightsService: FlightsService,
    private store$: Store<AppState>,
  ) { }
}
