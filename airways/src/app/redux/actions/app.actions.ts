import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

const enum AppActionsTypes {
  AUTH_LOGIN = '[Auth] Login',
  AUTH_SIGN_UP = '[Auth] Sign Up',
  AUTH_LOGOUT = '[Auth] Logout',
  SETTINGS_DATE = '[Settings] Change Date Format',
  SETTINGS_CURRENCY = '[Settings] Change Currency',
}

export const signUp = createAction(
  AppActionsTypes.AUTH_SIGN_UP,
  props<{ user: User }>(),
);

export const login = createAction(
  AppActionsTypes.AUTH_LOGIN,
  props<{ user: User }>(),
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
