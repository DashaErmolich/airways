import { createAction } from '@ngrx/store';

const enum AppActionsTypes {
  AUTH_LOGIN = '[Auth] Login',
  AUTH_LOGOUT = '[Auth] Logout',
  SETTINGS_DATE = '[Settings] Set Date Format',
  SETTINGS_CURRENCY = '[Settings] Set Currency',
}

export const login = createAction(
  AppActionsTypes.AUTH_LOGIN,
);

export const logout = createAction(
  AppActionsTypes.AUTH_LOGOUT,
);
