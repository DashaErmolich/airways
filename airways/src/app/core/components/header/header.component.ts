import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectIsAuth } from 'src/app/redux/selectors/app.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import * as AuthActions from '../../../redux/actions/app.actions';
import { CurrenciesEnum } from '../../constants/currency.enum';
import { DateFormatEnum } from '../../constants/date-format.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public dateViews = Object.values(DateFormatEnum);

  public currencies = Object.values(CurrenciesEnum);

  public selectedDateView = DateFormatEnum.DD_MM_YYYY;

  public selectedCurrency = CurrenciesEnum.EUR;

  isAuth$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.isAuth$ = this.store.pipe(select(selectIsAuth));
  }

  login() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
