import { createAction, props } from '@ngrx/store';
import { Order } from '../state.models';

const enum ShoppingCartActionsTypes {
  SHOPPING_CART_ADD_ORDER = '[Shopping Cart] Add Order',
  SHOPPING_CART_ADD_ORDER_SUCCESS = '[Shopping Cart] Add Order Success',
  SHOPPING_CART_ADD_ORDER_FAILURE = '[Shopping Cart] Add Order Failure',
  SHOPPING_BUY_PRODUCTS = '[Shopping Cart] Buy Products',
  SHOPPING_BUY_PRODUCTS_SUCCESS = '[Shopping Cart] Buy Products Success',
  SHOPPING_BUY_PRODUCTS_FAILURE = '[Shopping Cart] Buy Products Failure',
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

export const buyProductsFromCart = createAction(
  ShoppingCartActionsTypes.SHOPPING_BUY_PRODUCTS,
  props<{ productsIds: number[] }>(),
);

export const buyProductsFromCartSuccess = createAction(
  ShoppingCartActionsTypes.SHOPPING_BUY_PRODUCTS_SUCCESS,
  props<{ productsIds: number[] }>(),
);

export const buyProductsFromCartFailure = createAction(
  ShoppingCartActionsTypes.SHOPPING_BUY_PRODUCTS_FAILURE,
);
