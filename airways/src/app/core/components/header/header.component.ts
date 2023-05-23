import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectIsAuth, selectUsername } from 'src/app/redux/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from 'src/app/auth/components/auth-dialog/auth-dialog.component';
import * as SettingsActions from 'src/app/redux/actions/settings.actions';
import * as AuthActions from 'src/app/redux/actions/auth.actions';
import { selectDateFormat, selectCurrency } from 'src/app/redux/selectors/settings.selectors';
import { CurrencyEnum } from 'src/app/core/constants/currency.enum';
import { DateFormatEnum } from 'src/app/core/constants/date-format.enum';
import { LayoutService } from 'src/app/core/services/layout.service';
import { selectStep } from 'src/app/redux/selectors/booking.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public dateFormats = Object.values(DateFormatEnum);

  public currencies = Object.values(CurrencyEnum);

  public isAuth$!: Observable<boolean>;

  public dateFormat$!: Observable<string>;

  public currency$!: Observable<string>;

  public username$!: Observable<string>;

  public step$!: Observable<number>;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    public layout: LayoutService,
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));
    this.currency$ = this.store$.pipe(select(selectCurrency));
    this.username$ = this.store$.pipe(select(selectUsername));
    this.step$ = this.store$.pipe(select(selectStep));
  }

  logout() {
    this.store$.dispatch(AuthActions.logout());
  }

  onCurrencyChange(selectChange: MatSelectChange) {
    this.store$.dispatch(SettingsActions.setCurrency({ currency: selectChange.value }));
  }

  onDateFormatChange(selectChange: MatSelectChange) {
    this.store$.dispatch(SettingsActions.setDateFormat({ dateFormat: selectChange.value }));
  }

  openDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }
}
