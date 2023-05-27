import { createReducer, on } from '@ngrx/store';
import { OrdersState } from '../state.models';
import * as UserTripsActions from '../actions/user-trips.actions';

export const userTripsReducersNode = 'user-trips';

const initialState: OrdersState = {
  orders: [],
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
);
