import { createReducer, on } from '@ngrx/store';
import { DateFormatEnum } from 'src/app/core/constants/date-format.enum';
import { CurrencyEnum } from 'src/app/core/constants/currency.enum';
import { SettingsState } from '../state.models';
import * as SettingsActions from '../actions/settings.actions';

export const settingsReducersNode = 'settings';

export const initialState: SettingsState = {
  dateFormat: DateFormatEnum.MM_DD_YYYY,
  currency: CurrencyEnum.EUR,
};

export const settingsReducers = createReducer(
  initialState,
  on(
    SettingsActions.setDateFormat,
    (state, action) => ({
      ...state,
      dateFormat: action.dateFormat,
    }),
  ),
  on(
    SettingsActions.setCurrency,
    (state, action) => ({
      ...state,
      currency: action.currency,
    }),
  ),
);
