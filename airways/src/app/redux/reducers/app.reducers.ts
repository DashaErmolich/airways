import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../state.models';
import * as AuthActions from '../actions/app.actions';

export const initialState: AuthState = {
  isAuth: false,
  error: null,
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
);
