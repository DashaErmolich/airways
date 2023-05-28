import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import * as BookingActions from '../actions/booking.actions';
import { AppState } from '../state.models';

@Injectable()
export class BookingEffects {
  setPassengers$ = createEffect(
    () => this.actions$.pipe(
      ofType(BookingActions.setPassengers),
      tap(({
        adult, child, infant, contactDetails,
      }) => {
        localStorage.setItem(LocalStorageKeysEnum.BookingDetails, JSON.stringify({
          adult, child, infant, contactDetails,
        }));
      }),
    ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) { }
}
