import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  Directions, FoundFlights, FoundFlightsWithDate, SearchParams,
} from 'src/app/flight/models/flight.models';
import { searchParamsNode } from '../reducers/search-params/search-params.reducer';
import { foundFlightsNode } from '../reducers/found-flights/found-flights.reducer';

export const selectSearchParamsFeature = createFeatureSelector<SearchParams>(searchParamsNode);

export const selectFoundFlightsFeature = createFeatureSelector<FoundFlights>(foundFlightsNode);

export const selectAllSearchParams = createSelector(
  selectSearchParamsFeature,
  (state: SearchParams): SearchParams => state,
);

export const selectDirections = createSelector(
  selectSearchParamsFeature,
  (state: SearchParams): Directions | null => state.directions,
);

export const selectDate = createSelector(
  selectSearchParamsFeature,
  (state: SearchParams): string | null => state.date,
);

export const selectFoundFlights = createSelector(
  selectFoundFlightsFeature,
  (state: FoundFlights): FoundFlights => state,
);

export const selectFoundFlightsWithDate = createSelector(
  selectFoundFlightsFeature,
  (state: FoundFlights): FoundFlightsWithDate[] | null => state.flightsWithDates,
);

export const selectDay = createSelector(
  selectFoundFlightsFeature,
  (state: FoundFlights): string | null => state.day,
);

export const selectFlightsByDay = createSelector(
  selectFoundFlightsFeature,
  // eslint-disable-next-line max-len
  (state: FoundFlights): FoundFlightsWithDate | undefined => state.flightsWithDates?.find((el) => el.day === state.day),
);
