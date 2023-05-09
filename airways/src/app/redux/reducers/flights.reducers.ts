import { createReducer, on } from '@ngrx/store';
import { PASSENGERS_DEFAULT } from 'src/app/flight/constants/constants';
import { LocalStorageKeysEnum } from 'src/app/shared/constants/local-storage-keys.enum';
import { FlightSearchState } from '../state.models';
import * as FlightsActions from '../actions/flights.actions';

export const flightsSearchReducersNode = 'flights';

function getSearchParams(): FlightSearchState | null {
  const searchParams = localStorage.getItem(LocalStorageKeysEnum.SearchParams);
  return searchParams ? JSON.parse(searchParams) : null;
}

export const initialState: FlightSearchState = {
  isRoundTrip: !!getSearchParams()?.isRoundTrip,
  isOneWayTrip: !!getSearchParams()?.isOneWayTrip,
  from: getSearchParams() ? getSearchParams()!.from : null,
  to: getSearchParams() ? getSearchParams()!.to : null,
  startTripDate: getSearchParams() ? getSearchParams()!.startTripDate : null,
  rangeTripDates: getSearchParams() ? getSearchParams()!.rangeTripDates : null,
  passengers: getSearchParams() ? getSearchParams()!.passengers : PASSENGERS_DEFAULT,
};

export const flightsSearchReducers = createReducer(
  initialState,
  on(
    FlightsActions.searchFormSubmit,
    (state, action) => ({
      ...state,
      isRoundTrip: action.flightsSearchData.isRoundTrip,
      isOneWayTrip: action.flightsSearchData.isOneWayTrip,
      from: action.flightsSearchData.from,
      to: action.flightsSearchData.to,
      startTripDate: action.flightsSearchData.startTripDate,
      rangeTripDates: action.flightsSearchData.rangeTripDates,
      passengers: action.flightsSearchData.passengers,
    }),
  ),
  on(
    FlightsActions.setPassengers,
    (state, action) => ({
      ...state,
      passengers: action.passengers,
    }),
  ),
  on(
    FlightsActions.setDepartureDate,
    (state, action) => ({
      ...state,
      startTripDate: action.startTripDate,
      rangeTripDates: null,
    }),
  ),
  on(
    FlightsActions.setDatesRange,
    (state, action) => ({
      ...state,
      rangeTripDates: action.range,
      startTripDate: null,
    }),
  ),
  on(
    FlightsActions.setFromAirport,
    (state, action) => ({
      ...state,
      from: action.from,
    }),
  ),
  on(
    FlightsActions.setToAirport,
    (state, action) => ({
      ...state,
      from: action.to,
    }),
  ),
);
