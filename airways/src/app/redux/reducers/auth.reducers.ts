import { createReducer, on } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { AuthState } from '../state.models';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../../auth/models/user.model';

export const authReducersNode = 'auth';

function getUser(): User | null {
  const user = localStorage.getItem(LocalStorageKeysEnum.User);
  return user ? JSON.parse(user) : null;
}

export const initialState: AuthState = {
  isAuth: !!localStorage.getItem(LocalStorageKeysEnum.AccessToken),
  error: null,
  token: localStorage.getItem(LocalStorageKeysEnum.AccessToken),
  user: getUser(),
};

export const authReducers = createReducer(
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
    AuthActions.clearError,
    (state) => ({
      ...state,
      error: null,
    }),
  ),
);
