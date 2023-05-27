import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import {
  catchError, combineLatest, map, merge, mergeMap, of, tap, withLatestFrom,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActiveUser } from 'src/app/auth/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { Store } from '@ngrx/store';
import { selectBookingState } from '../selectors/booking.selectors';
import * as ShoppingCartActions from '../actions/shopping-cart.actions';
import { selectTripSearchState } from '../selectors/trip-search.selectors';
import { selectFlightsState } from '../selectors/flights.selectors';
import { AppState, Order, TripSearchState } from '../state.models';

@Injectable()
export class ShoppingCartEffects {
  // addOrderToCart$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(ShoppingCartActions.addOrderToCart),
  //     combineLatest(
  //       this.store$.select(selectTripSearchState),
  //       this.store$.select(selectFlightsState),
  //       this.store$.select(selectBookingState),
  //     ).pipe(
  //       map(() => ShoppingCartActions.addOrderToCartSuccess()),
  //       catchError(() => ShoppingCartActions.addOrderToCartFailure()),
  //     ),
  //   ),
  // );

  // addOrderToCart$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(ShoppingCartActions.addOrderToCart),
  //     combineLatest([
  //       this.store$.select(selectTripSearchState),
  //       this.store$.select(selectFlightsState),
  //       this.store$.select(selectBookingState),
  //     ]),
  //     map((res) => ShoppingCartActions.addOrderToCartSuccess({ order: res as Order })),
  //     catchError( async() => ShoppingCartActions.addOrderToCartFailure()),
  //     ),
  //   );

  addOrderToCart$ = createEffect(
    () => this.actions$.pipe(
      ofType(ShoppingCartActions.addOrderToCart),
      withLatestFrom(this.store$.select(selectTripSearchState)),
      withLatestFrom(this.store$.select(selectFlightsState)),
      withLatestFrom(this.store$.select(selectBookingState)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([[[_, tripSearchState], flightsState], bookingState]) => ShoppingCartActions.addOrderToCartSuccess({
        order: {
          flightsSearch: tripSearchState,
          flights: flightsState,
          booking: bookingState,
        },
      })),
      catchError(async () => ShoppingCartActions.addOrderToCartFailure()),
    ),
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) { }
}
