import { createReducer, on } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { Order } from '../state.models';
import * as ShoppingCartActions from '../actions/shopping-cart.actions';

export const shoppingCartReducersNode = 'shopping-cart';

function getOrders(): Order[] {
  const orders = localStorage.getItem(LocalStorageKeysEnum.CartOrders);
  return orders ? JSON.parse(orders) : null;
}

export const initialState = getOrders() ? getOrders() : [];

export const shoppingCartReducers = createReducer(
  initialState,
  on(
    ShoppingCartActions.addOrderToCartSuccess,
    (state, action) => ({
      ...state,
      orders: [...state, action.order],
    }),
  ),
);
