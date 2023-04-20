import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCurrency, selectIsAuth } from 'src/app/redux/selectors/app.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import { MatSelectChange } from '@angular/material/select';
import * as AuthActions from '../../../redux/actions/app.actions';
import { CurrenciesEnum } from '../../constants/currency.enum';
import { DateFormatEnum } from '../../constants/date-format.enum';
import { selectDateFormat } from '../../../redux/selectors/app.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public dateFormats = Object.values(DateFormatEnum);

  public currencies = Object.values(CurrenciesEnum);

  public isAuth$: Observable<boolean>;

  public dateFormat$: Observable<string>;

  public currency$: Observable<string>;

  constructor(
    private store$: Store<AppState>,
  ) {
    this.isAuth$ = this.store$.pipe(select(selectIsAuth));
    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));
    this.currency$ = this.store$.pipe(select(selectCurrency));
  }

  login() {
    this.store$.dispatch(AuthActions.login());
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
}
