import { createSelector } from '@ngrx/store';
import { AppState } from '../state.models';

const selectFeature = (state: AppState) => state.shoppingCart;

export const selectCartOrdersQty = createSelector(
  selectFeature,
  (state) => state.length,
);

export const selectCartOrders = createSelector(
  selectFeature,
  (state) => state,
);
