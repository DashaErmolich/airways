import { createReducer, on } from '@ngrx/store';
import { UserTripsState } from '../state.models';
import * as UserTripsActions from '../actions/user-trips.actions';

export const userTripsReducersNode = 'user-trips';

const initialState: UserTripsState = {
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
  on(
    UserTripsActions.addOrdersFromCartSuccess,
    (state, action) => ({
      ...state,
      orders: [...state.orders, ...action.orders],
    }),
  ),
);
