import { createSelector } from '@ngrx/store';
import { AppState } from '../state.models';

export const selectFeature = (state: AppState) => state.auth;

export const selectIsAuth = createSelector(
  selectFeature,
  (state) => state.isAuth,
);
