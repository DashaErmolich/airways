import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, mergeMap, tap,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActiveUser } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageKeysEnum } from 'src/app/shared/constants/local-storage-keys.enum';
import { FlightsService } from 'src/app/flight/services/flights.service';
import * as AuthActions from '../actions/auth.actions';
import * as FlightsActions from '../actions/flights.actions';

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

  setFlightState$ = createEffect(
    () => this.actions$.pipe(
      ofType(FlightsActions.searchFormSubmit),
      tap(({ flightsSearchData: flightsState }) => {
        localStorage.setItem(LocalStorageKeysEnum.Flights, JSON.stringify(flightsState));
      }),
    ),
    { dispatch: false },
  );

  // getAvailableFlights$ = createEffect(() => this.actions$.pipe(
  //   ofType(FlightsActions.getAvailableFlights),
  //   mergeMap(({ flightsSearchData: flightsState }) => this.flightsService.searchFlights(flightsState).pipe(
  //     map((res) => FlightsActions.getAvailableFlightsSuccess({ availableFlights: res })),
  //     catchError(async (error) => FlightsActions.getAvailableFlightsFailure({ error: error.message })),
  //   )),
  // ));

  getAvailableFlights$ = createEffect(() => this.actions$.pipe(
    ofType(FlightsActions.getAvailableFlights),
    mergeMap(({ flightsSearchData: flightsState }) => this.flightsService.searchFlights(flightsState).pipe(
      map((res) => FlightsActions.getAvailableFlightsSuccess({ availableFlights: res })),
      catchError(async (error) => FlightsActions.getAvailableFlightsFailure({ error: error.message })),
    )),
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private dialog: MatDialog,
    private flightsService: FlightsService,
  ) { }
}
