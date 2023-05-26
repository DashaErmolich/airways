import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import * as BookingActions from '../actions/booking.actions';
import { AppState } from '../state.models';
import { selectPassengers } from '../selectors/trip-search.selectors';

@Injectable()
export class BookingEffects {
  // setFlights$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(BookingActions.setFlights),
  //     withLatestFrom(this.store$.select(selectPassengers)),
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     map(([_, passengers]) => BookingActions.setPassengers({ passengers })),
  //   ),
  // );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) { }
}
