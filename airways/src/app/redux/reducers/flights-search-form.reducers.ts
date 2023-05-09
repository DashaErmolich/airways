import { PASSENGERS_DEFAULT } from 'src/app/flight/constants/constants';
import { SearchFormState } from '../../flight/models/flight.models';
import { SearchParamsActionsTypes } from '../actions/flights-search-form.actions';

export const searchParamsNode = 'flights-search-form';

const initialState: SearchFormState = {
  isRoundTrip: false,
  directions: null,
  range: null,
  date: null,
  passengers: PASSENGERS_DEFAULT,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const flightsSearchFormReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case SearchParamsActionsTypes.chooseIsRoundTrip:
      return {
        ...state,
        isRoundTrip: action.preload,
      };

    case SearchParamsActionsTypes.chooseDirections:
      return {
        ...state,
        directions: {
          departureFrom: {
            city: action.preload.departureFrom.city,
            key: action.preload.departureFrom.key,
            name: action.preload.departureFrom.name,
            country: action.preload.departureFrom.country,
          },
          destinationTo: {
            city: action.preload.destinationTo.city,
            key: action.preload.destinationTo.key,
            name: action.preload.destinationTo.name,
            country: action.preload.destinationTo.country,
          },
        },
      };

    case SearchParamsActionsTypes.chooseRange:
      return {
        ...state,
        range: {
          start: action.preload.start,
          end: action.preload.end,
        },
      };

    case SearchParamsActionsTypes.chooseDate:
      return {
        ...state,
        date: action.preload,
      };

    case SearchParamsActionsTypes.choosePassengers:
      return {
        ...state,
        passengers: {
          adult: action.preload.adult,
          child: action.preload.child,
          infant: action.preload.infant,
        },
      };

    default:
      return state;
  }
};
