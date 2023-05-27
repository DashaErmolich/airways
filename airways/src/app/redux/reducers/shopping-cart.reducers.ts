import { createReducer, on } from '@ngrx/store';
import { OrdersState } from '../state.models';
import * as ShoppingCartActions from '../actions/shopping-cart.actions';

export const shoppingCartReducersNode = 'shopping-cart';

const initialState: OrdersState = {
  orders: [],
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
);
