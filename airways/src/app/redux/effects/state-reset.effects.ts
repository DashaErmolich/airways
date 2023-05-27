import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import { map, tap } from 'rxjs';

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
      tap(() => localStorage.removeItem(LocalStorageKeysEnum.SearchParams)),
      tap(() => localStorage.removeItem(LocalStorageKeysEnum.BookingDetails)),
      tap(() => localStorage.removeItem(LocalStorageKeysEnum.ReturnFlight)),
      tap(() => localStorage.removeItem(LocalStorageKeysEnum.ForwardFlight)),
      map(() => BookingActions.reset()),
      map(() => FlightActions.reset()),
      map(() => TripSearchActions.reset()),
    ),
  );

  constructor(
    private actions$: Actions,
  ) { }
}
