import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Orders } from '../state.models';
import { shoppingCartReducersNode } from '../reducers/shopping-cart.reducers';

const selectFeature = createFeatureSelector<Orders>(shoppingCartReducersNode);

export const selectCartOrdersQty = createSelector(
  selectFeature,
  (state) => state.orders.length,
);

export const selectCartOrders = createSelector(
  selectFeature,
  (state) => state.orders,
);
