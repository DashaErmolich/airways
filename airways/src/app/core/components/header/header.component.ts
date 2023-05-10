import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCurrency, selectIsAuth, selectUsername } from 'src/app/redux/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from 'src/app/auth/components/auth-dialog/auth-dialog.component';
import * as AuthActions from '../../../redux/actions/auth.actions';
import { CurrencyEnum } from '../../constants/currency.enum';
import { DateFormatEnum } from '../../constants/date-format.enum';
import { selectDateFormat } from '../../../redux/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public dateFormats = Object.values(DateFormatEnum);

  public currencies = Object.values(CurrencyEnum);

  public isAuth$: Observable<boolean>;

  public dateFormat$: Observable<string>;

  public currency$: Observable<string>;

  public username$: Observable<string>;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
  ) {
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));
    this.currency$ = this.store$.pipe(select(selectCurrency));
    this.username$ = this.store$.pipe(select(selectUsername));
  }

  logout() {
    this.store$.dispatch(AuthActions.logout());
  }

  onCurrencyChange(selectChange: MatSelectChange) {
    this.store$.dispatch(AuthActions.setCurrency({ currency: selectChange.value }));
  }

  onDateFormatChange(selectChange: MatSelectChange) {
    this.store$.dispatch(AuthActions.setDateFormat({ dateFormat: selectChange.value }));
  }

  openDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }
}
