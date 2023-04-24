import { SearchParams } from '../../../flight/models/flight.models';
import { SearchParamsActionsTypes } from '../../actions/app.actions';

export const searchParamsNode = 'searchParams';

const initialState: SearchParams = {
  isRoundTrip: false,
  directions: {
    departureFrom: {
      city: '',
      IATA: '',
      name: '',
      country: '',
    },
    destinationTo: {
      city: '',
      IATA: '',
      name: '',
      country: '',
    },
  },
  range: {
    start: '',
    end: '',
  },
  date: '',
  passengers: {
    adult: 1,
    child: 0,
    infant: 0,
  },
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const searchParamsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SearchParamsActionsTypes.chooseAllParams:
      return {
        ...state,
        isRoundTrip: action.preload.isRoundTrip,
        directions: {
          departureFrom: {
            city: action.preload.directions.departureFrom.city,
            IATA: action.preload.directions.departureFrom.IATA,
            name: action.preload.directions.departureFrom.name,
            country: action.preload.directions.departureFrom.country,
          },
          destinationTo: {
            city: action.preload.directions.destinationTo.city,
            IATA: action.preload.directions.destinationTo.IATA,
            name: action.preload.directions.destinationTo.name,
            country: action.preload.directions.destinationTo.country,
          },
        },
        range: {
          start: action.preload.range.start,
          end: action.preload.range.end,
        },
        date: action.preload.date,
        passengers: {
          adult: action.preload.passengers.adult,
          child: action.preload.passengers.child,
          infant: action.preload.passengers.infant,
        },
      };

    default:
      return state;
  }
};
