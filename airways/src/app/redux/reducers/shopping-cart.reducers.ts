import { Orders } from 'src/app/redux/state.models';
import { createReducer, on } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import * as ShoppingCartActions from 'src/app/redux/actions/shopping-cart.actions';
import { Order } from '../state.models';

export const shoppingCartReducersNode = 'shopping-cart';

function getOrders(): Order[] {
  const orders = localStorage.getItem(LocalStorageKeysEnum.CartOrders);
  return orders ? JSON.parse(orders) : null;
}

export const initialState: Orders = {
  orders: getOrders() ? getOrders() : [],
};

export const shoppingCartReducers = createReducer(
  initialState,
  on(
    ShoppingCartActions.addOrderToCartSuccess,
    (state, action) => ({
      ...state,
      orders: [...state.orders, action.order],
    }),
  ),
  on(
    ShoppingCartActions.buyProductsFromCartSuccess,
    (state, action) => ({
      ...state,
      orders: state.orders.filter((_, index) => !action.productsIds.some((id) => index === id)),
    }),
  ),
);
