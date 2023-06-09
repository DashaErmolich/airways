import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import {
  catchError, map, switchMap, tap, withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { selectBookingState } from '../selectors/booking.selectors';
import * as ShoppingCartActions from '../actions/shopping-cart.actions';
import * as UserTripsActions from '../actions/user-trips.actions';
import { selectTripSearchState } from '../selectors/trip-search.selectors';
import { selectFlightsState } from '../selectors/flights.selectors';
import { AppState } from '../state.models';
import { selectCartOrders } from '../selectors/shopping-cart.selectors';

@Injectable()
export class ShoppingCartEffects {
  addOrderToCart$ = createEffect(
    () => this.actions$.pipe(
      ofType(ShoppingCartActions.addOrderToCart),
      withLatestFrom(this.store$.select(selectTripSearchState)),
      withLatestFrom(this.store$.select(selectFlightsState)),
      withLatestFrom(this.store$.select(selectBookingState)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([[[_, tripSearchState], flightsState], bookingState]) => {
        const orders: string | null = localStorage.getItem(LocalStorageKeysEnum.CartOrders);
        let newOrders = orders !== null ? JSON.parse(orders) : [];
        newOrders = [...newOrders, { tripSearchState, flightsState, bookingState }];
        localStorage.setItem(LocalStorageKeysEnum.CartOrders, JSON.stringify(newOrders));

        return ShoppingCartActions.addOrderToCartSuccess({
          order: {
            tripSearchState,
            flightsState,
            bookingState,
          },
        });
      }),
      catchError(async () => ShoppingCartActions.addOrderToCartFailure()),
    ),
  );

  buyProducts$ = createEffect(
    () => this.actions$.pipe(
      ofType(ShoppingCartActions.buyProductsFromCart),
      switchMap(({ productsIds }) => [
        UserTripsActions.addOrdersFromCart({ productsIds }),
        ShoppingCartActions.buyProductsFromCartSuccess({ productsIds }),
      ]),
      catchError(async () => ShoppingCartActions.buyProductsFromCartFailure()),
    ),
  );

  buyProductsFromCartSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(ShoppingCartActions.buyProductsFromCartSuccess),
      withLatestFrom(this.store$.select(selectCartOrders)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tap(([_, cartOrders]) => {
        localStorage.setItem(LocalStorageKeysEnum.CartOrders, JSON.stringify(cartOrders));
      }),
    ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) { }
}
