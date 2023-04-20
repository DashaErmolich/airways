import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as AuthActions from '../actions/app.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.login),
      tap(() => this.authService.login()),
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
  ) { }
}
