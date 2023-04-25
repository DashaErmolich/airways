import { createAction, props } from '@ngrx/store';
import { ActiveUser, User } from 'src/app/shared/models/user.model';

const enum AppActionsTypes {
  AUTH_LOGIN = '[Auth] Login',
  AUTH_LOGIN_SUCCESS = '[Auth] Login Success',
  AUTH_LOGIN_FAILURE = '[Auth] Login Failure',
  AUTH_SIGN_UP = '[Auth] Sign Up',
  AUTH_SIGN_UP_SUCCESS = '[Auth] Sign Up Success',
  AUTH_SIGN_UP_FAILURE = '[Auth] Sign Up Failure',
  AUTH_LOGOUT = '[Auth] Logout',
  SETTINGS_DATE = '[Settings] Change Date Format',
  SETTINGS_CURRENCY = '[Settings] Change Currency',
  AUTH_CLEAR_ERROR = '[Auth] Clear Error',
}

export const signUp = createAction(
  AppActionsTypes.AUTH_SIGN_UP,
  props<{ user: User }>(),
);

export const signUpSuccess = createAction(
  AppActionsTypes.AUTH_SIGN_UP_SUCCESS,
  props<{ activeUser: ActiveUser }>(),
);

export const signUpFailure = createAction(
  AppActionsTypes.AUTH_SIGN_UP_FAILURE,
  props<{ error: string }>(),
);

export const login = createAction(
  AppActionsTypes.AUTH_LOGIN,
  props<{ user: User }>(),
);

export const loginSuccess = createAction(
  AppActionsTypes.AUTH_LOGIN_SUCCESS,
  props<{ activeUser: ActiveUser }>(),
);

export const loginFailure = createAction(
  AppActionsTypes.AUTH_LOGIN_FAILURE,
  props<{ error: string }>(),
);

export const logout = createAction(
  AppActionsTypes.AUTH_LOGOUT,
);

export const setDateFormat = createAction(
  AppActionsTypes.SETTINGS_DATE,
  props<{ dateFormat: string }>(),
);

export const setCurrency = createAction(
  AppActionsTypes.SETTINGS_CURRENCY,
  props<{ currency: string }>(),
);

export const clearError = createAction(
  AppActionsTypes.AUTH_CLEAR_ERROR,
);
