import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import {
  catchError, map, withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBookingState } from '../selectors/booking.selectors';
import * as UserTripsActions from '../actions/user-trips.actions';
import { selectTripSearchState } from '../selectors/trip-search.selectors';
import { selectFlightsState } from '../selectors/flights.selectors';
import { AppState } from '../state.models';

@Injectable()
export class UserTripsEffects {
  addOrderToUserTrips$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserTripsActions.addOrderUserTrips),
      withLatestFrom(this.store$.select(selectTripSearchState)),
      withLatestFrom(this.store$.select(selectFlightsState)),
      withLatestFrom(this.store$.select(selectBookingState)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([[[_, tripSearchState], flightsState], bookingState]) => UserTripsActions.addOrderUserTripsSuccess({
        order: {
          flightsSearch: tripSearchState,
          flights: flightsState,
          booking: bookingState,
        },
      })),
      catchError(async () => UserTripsActions.addOrderUserTripsFailure()),
    ),
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) { }
}
