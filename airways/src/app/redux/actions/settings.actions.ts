import { createAction, props } from '@ngrx/store';

const enum SettingsActionsTypes {
  SETTINGS_DATE = '[Settings] Change Date Format',
  SETTINGS_CURRENCY = '[Settings] Change Currency',
}

export const setDateFormat = createAction(
  SettingsActionsTypes.SETTINGS_DATE,
  props<{ dateFormat: string }>(),
);

export const setCurrency = createAction(
  SettingsActionsTypes.SETTINGS_CURRENCY,
  props<{ currency: string }>(),
);
