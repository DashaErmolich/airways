import { createAction, props } from '@ngrx/store';
import { Order } from '../state.models';

const enum ShoppingCartActionsTypes {
  SHOPPING_CART_ADD_ORDER = '[Shopping Cart] Add Order',
  SHOPPING_CART_ADD_ORDER_SUCCESS = '[Shopping Cart] Add Order Success',
  SHOPPING_CART_ADD_ORDER_FAILURE = '[Shopping Cart] Add Order Failure',
}

export const addOrderToCart = createAction(
  ShoppingCartActionsTypes.SHOPPING_CART_ADD_ORDER,
);

export const addOrderToCartSuccess = createAction(
  ShoppingCartActionsTypes.SHOPPING_CART_ADD_ORDER_SUCCESS,
  props<{ order: Order }>(),
);

export const addOrderToCartFailure = createAction(
  ShoppingCartActionsTypes.SHOPPING_CART_ADD_ORDER_FAILURE,
);
