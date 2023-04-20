import { createReducer, on } from '@ngrx/store';
import { DateFormatEnum } from 'src/app/core/constants/date-format.enum';
import { CurrenciesEnum } from 'src/app/core/constants/currency.enum';
import { AuthState } from '../state.models';
import * as AuthActions from '../actions/app.actions';

export const initialState: AuthState = {
  isAuth: false,
  error: null,
  dateFormat: DateFormatEnum.MM_DD_YYYY,
  currency: CurrenciesEnum.EUR,
};

export const reducers = createReducer(
  initialState,
  on(
    AuthActions.login,
    (state) => ({
      ...state,
      isAuth: true,
    }),
  ),
  on(
    AuthActions.logout,
    (state) => ({
      ...state,
      isAuth: false,
    }),
  ),
  on(
    AuthActions.setDateFormat,
    (state, action) => ({
      ...state,
      dateFormat: action.dateFormat,
    }),
  ),
  on(
    AuthActions.setCurrency,
    (state, action) => ({
      ...state,
      currency: action.currency,
    }),
  ),
);
