import { createAction, props } from '@ngrx/store';

const enum AppActionsTypes {
  AUTH_LOGIN = '[Auth] Login',
  AUTH_LOGOUT = '[Auth] Logout',
  SETTINGS_DATE = '[Settings] Change Date Format',
  SETTINGS_CURRENCY = '[Settings] Change Currency',
}

export const login = createAction(
  AppActionsTypes.AUTH_LOGIN,
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
