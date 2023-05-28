import { createReducer, on } from '@ngrx/store';
import { LocalStorageKeysEnum } from 'src/app/core/constants/local-storage-keys.enum';
import { Order, UserTripsState } from '../state.models';
import * as UserTripsActions from '../actions/user-trips.actions';

export const userTripsReducersNode = 'user-trips';

function getOrders(): Order[] {
  const orders = localStorage.getItem(LocalStorageKeysEnum.UserTrips);
  return orders ? JSON.parse(orders) : null;
}

const initialState: UserTripsState = {
  orders: getOrders() ? getOrders() : [],
};

export const userTripsReducers = createReducer(
  initialState,
  on(
    UserTripsActions.addOrderUserTripsSuccess,
    (state, action) => ({
      ...state,
      orders: [...state.orders, action.order],
    }),
  ),
  on(
    UserTripsActions.addOrdersFromCartSuccess,
    (state, action) => ({
      ...state,
      orders: [...state.orders, ...action.orders],
    }),
  ),
);
