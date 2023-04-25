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
  token: null,
};

export const reducers = createReducer(
  initialState,
  on(
    AuthActions.signUpSuccess,
    (state, action) => ({
      ...state,
      isAuth: true,
      error: null,
      token: action.activeUser.accessToken,
    }),
  ),
  on(
    AuthActions.signUpFailure,
    (state, action) => ({
      ...state,
      isAuth: false,
      error: action.error,
      token: null,
    }),
  ),
  on(
    AuthActions.loginSuccess,
    (state, action) => ({
      ...state,
      isAuth: true,
      error: null,
      token: action.activeUser.accessToken,
    }),
  ),
  on(
    AuthActions.loginFailure,
    (state, action) => ({
      ...state,
      isAuth: false,
      error: action.error,
      token: null,
    }),
  ),
  on(
    AuthActions.logout,
    (state) => ({
      ...state,
      isAuth: false,
      error: null,
      token: null,
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
