import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import * as AuthActions from '../../../redux/actions/auth.actions';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnDestroy {
  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnDestroy(): void {
    this.clearError();
  }

  clearError() {
    this.store$.dispatch(AuthActions.clearError());
  }
}
