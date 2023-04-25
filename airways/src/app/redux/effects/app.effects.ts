import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, mergeMap, tap,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActiveUser } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageKeys } from 'src/app/shared/constants/local-storage-keys.enum';
import * as AuthActions from '../actions/app.actions';

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

  loginSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ activeUser }) => {
        localStorage.setItem(LocalStorageKeys.AccessToken, activeUser.accessToken);
        this.dialog.closeAll();
      }),
    ),
    { dispatch: false },
  );

  signUpSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      tap(({ activeUser }) => {
        localStorage.setItem(LocalStorageKeys.AccessToken, activeUser.accessToken);
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }
}
