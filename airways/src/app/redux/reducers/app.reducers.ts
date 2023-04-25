import { createReducer, on } from '@ngrx/store';
import { DateFormatEnum } from 'src/app/core/constants/date-format.enum';
import { CurrenciesEnum } from 'src/app/core/constants/currency.enum';
import { LocalStorageKeysEnum } from 'src/app/shared/constants/local-storage-keys.enum';
import { AuthState } from '../state.models';
import * as AuthActions from '../actions/app.actions';
import { User } from '../../shared/models/user.model';

function getUser(): User | null {
  const user = localStorage.getItem(LocalStorageKeysEnum.User);
  return user ? JSON.parse(user) : null;
}

export const initialState: AuthState = {
  isAuth: !!localStorage.getItem(LocalStorageKeysEnum.AccessToken),
  error: null,
  dateFormat: DateFormatEnum.MM_DD_YYYY,
  currency: CurrenciesEnum.EUR,
  token: localStorage.getItem(LocalStorageKeysEnum.AccessToken),
  user: getUser(),
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
      user: action.activeUser.user,
    }),
  ),
  on(
    AuthActions.signUpFailure,
    (state, action) => ({
      ...state,
      isAuth: false,
      error: action.error,
      token: null,
      user: null,
    }),
  ),
  on(
    AuthActions.loginSuccess,
    (state, action) => ({
      ...state,
      isAuth: true,
      error: null,
      token: action.activeUser.accessToken,
      user: action.activeUser.user,
    }),
  ),
  on(
    AuthActions.loginFailure,
    (state, action) => ({
      ...state,
      isAuth: false,
      error: action.error,
      token: null,
      user: null,
    }),
  ),
  on(
    AuthActions.logout,
    (state) => ({
      ...state,
      isAuth: false,
      error: null,
      token: null,
      user: null,
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
  on(
    AuthActions.clearError,
    (state) => ({
      ...state,
      error: null,
    }),
  ),
);
