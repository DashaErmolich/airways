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
import { AppState } from '../state.models';
import { selectFlightSearchData } from '../selectors/flights.selectors';

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

  // getFlightsData$ = createEffect(() => this.actions$.pipe(
  //   ofType(FlightsActions.getFlightsData),
  //   mergeMap(({ flightsSearchData: flightsState }) => this.flightsService.searchFlights(flightsState).pipe(
  //     map((res) => FlightsActions.getFlightsDataSuccess({ flights: res })),
  //     catchError(async (error) => FlightsActions.getFlightsDataFailure({ error: error.message })),
  //   )),
  // ));

  searchFlights$ = createEffect(() => this.actions$.pipe(
    ofType(FlightsActions.searchFlights),
    withLatestFrom(this.store$.select(selectFlightSearchData)),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mergeMap(([_, searchData]) => this.flightsService.searchMultipleFlights(searchData, this.utilsService.getDatesArr(searchData.startTripDate || '')).pipe(
      map((res) => FlightsActions.getFlightsDataSuccess({ flights: res })),
      catchError(async (error) => FlightsActions.getFlightsDataFailure({ error: error.message })),
    )),
  ));

  // this.store$.pipe(select(selectFlightSearchData)).subscribe((searchState) => {
  //   this.flightsSearchData = searchState;
  //   this.datesArr = this.getDatesArr(this.flightsSearchData.startTripDate!);
  //   this.flightsService.searchMultipleFlights(this.flightsSearchData, this.datesArr).subscribe((allFlights) => {
  //     this.allSlides = [];
  //     allFlights.forEach((item, i) => {
  //       this.allSlides = [...this.allSlides, {
  //         flightDate: this.datesArr[i],
  //         data: item[0],
  //       }];
  //     });
  //     this.store$.dispatch(FlightsActions.setSelectedFlight({ flights: [this.allSlides[3].data] }));
  //     this.stateService.setSlides(this.allSlides);
  //   });
  // });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private dialog: MatDialog,
    private flightsService: FlightsService,
    private store$: Store<AppState>,
    private utilsService: UtilsService,
  ) { }
}
