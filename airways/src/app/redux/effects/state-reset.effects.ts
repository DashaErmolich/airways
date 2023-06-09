import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import { switchMap, tap } from 'rxjs';

import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import * as ShoppingCartActions from '../actions/shopping-cart.actions';
import * as UserTripsActions from '../actions/user-trips.actions';

import * as BookingActions from '../actions/booking.actions';
import * as TripSearchActions from '../actions/trip-search.actions';
import * as FlightActions from '../actions/flights.actions';

@Injectable()
export class ResetStateEffects {
  resetState$ = createEffect(
    () => this.actions$.pipe(
      ofType(ShoppingCartActions.addOrderToCartSuccess, UserTripsActions.addOrderUserTripsSuccess),
      switchMap(() => [
        TripSearchActions.reset(),
        FlightActions.reset(),
        BookingActions.reset(),
      ]),
    ),
  );

  resetBookingState$ = createEffect(
    () => this.actions$.pipe(
      ofType(BookingActions.reset),
      tap(() => localStorage.removeItem(LocalStorageKeysEnum.BookingDetails)),
    ),
    { dispatch: false },
  );

  resetFlightsState$ = createEffect(
    () => this.actions$.pipe(
      ofType(FlightActions.reset),
      tap(() => localStorage.removeItem(LocalStorageKeysEnum.ReturnFlight)),
      tap(() => localStorage.removeItem(LocalStorageKeysEnum.ForwardFlight)),
    ),
    { dispatch: false },
  );

  resetTripSearchState$ = createEffect(
    () => this.actions$.pipe(
      ofType(TripSearchActions.reset),
      tap(() => localStorage.removeItem(LocalStorageKeysEnum.SearchParams)),
    ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
  ) { }
}
