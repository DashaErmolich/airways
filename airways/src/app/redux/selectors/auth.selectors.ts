import { createSelector } from '@ngrx/store';
import { AppState } from '../state.models';

const selectFeature = (state: AppState) => state.auth;

export const selectIsAuth = createSelector(
  selectFeature,
  (state) => state.isAuth,
);

export const selectError = createSelector(
  selectFeature,
  (state) => state.error,
);

export const selectUsername = createSelector(
  selectFeature,
  (state) => `${state.user?.firstName} ${state.user?.lastName}`,
);
