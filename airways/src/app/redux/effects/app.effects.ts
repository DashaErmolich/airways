import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, mergeMap, tap, withLatestFrom,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActiveUser } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageKeysEnum } from 'src/app/shared/constants/local-storage-keys.enum';
import { FlightsService } from 'src/app/flight/services/flights.service';
import { Store } from '@ngrx/store';
import { UtilsService } from 'src/app/core/services/utils.service';
import * as AuthActions from '../actions/auth.actions';
import * as FlightsActions from '../actions/flights.actions';
import * as BookingActions from '../actions/booking.actions';
import { AppState } from '../state.models';
import { selectFlightSearchData, selectPassengers } from '../selectors/flights.selectors';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ user }) => this.authService.signUp(user).pipe(
        map((res: ActiveUser) => AuthActions.signUpSuccess({ activeUser: res })),
        catchError(
          async (errorResponse) => AuthActions.signUpFailure({ error: errorResponse.error }),
        ),
      )),
    ),
  );

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ user }) => this.authService.login(user).pipe(
        map((res: ActiveUser) => AuthActions.loginSuccess({ activeUser: res })),
        catchError(
          async (errorResponse) => AuthActions.loginFailure({ error: errorResponse.error }),
        ),
      )),
    ),
  );

  authSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.signUpSuccess),
      tap(({ activeUser }) => {
        localStorage.setItem(LocalStorageKeysEnum.AccessToken, activeUser.accessToken);
        localStorage.setItem(LocalStorageKeysEnum.User, JSON.stringify(activeUser.user));
        this.dialog.closeAll();
      }),
    ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.authService.logout()),
    ),
    { dispatch: false },
  );

  searchFormSubmit$ = createEffect(
    () => this.actions$.pipe(
      ofType(FlightsActions.searchFormSubmit),
      tap(({ flightsSearchData }) => localStorage.setItem(LocalStorageKeysEnum.SearchParams, JSON.stringify(flightsSearchData))),
      map(() => FlightsActions.searchFlights()),
    ),
    // { dispatch: false },
  );

  searchFlights$ = createEffect(() => this.actions$.pipe(
    ofType(FlightsActions.searchFlights),
    withLatestFrom(this.store$.select(selectFlightSearchData)),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mergeMap(([_, searchData]) => this.flightsService.searchMultipleFlights(searchData, this.utilsService.getDatesArr(searchData.startTripDate || '')).pipe(
      map((res) => FlightsActions.getFlightsDataSuccess({ flights: res })),
      catchError(async (error) => FlightsActions.getFlightsDataFailure({ error: error.message })),
    )),
  ));

  setFlights$ = createEffect(
    () => this.actions$.pipe(
      ofType(BookingActions.setFlights),
      withLatestFrom(this.store$.select(selectPassengers)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([_, passengers]) => BookingActions.setPassengers({ passengers })),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private dialog: MatDialog,
    private flightsService: FlightsService,
    private store$: Store<AppState>,
    private utilsService: UtilsService,
  ) { }
}
