import { minCountPassengers } from 'src/app/flight/constants/constants';
import { SearchParams } from '../../../flight/models/flight.models';
import { SearchParamsActionsTypes } from '../../actions/app.actions';

export const searchParamsNode = 'searchParams';

// const initialState: SearchParams = {
//   isRoundTrip: false,
//   directions: {
//     departureFrom: {
//       city: 'Moscow', IATA: 'SVO', name: 'Sheremetyevo', country: 'Russia',
//     },
//     destinationTo: {
//       city: 'Istanbul', IATA: 'IST', name: 'Ataturk', country: 'Turkey',
//     },
//   },
//   range: null,
//   date: 'Sat Apr 29 2023',
//   passengers: { adult: 1, child: 1, infant: 1 },
// };

const initialState: SearchParams = {
  isRoundTrip: false,
  directions: null,
  range: null,
  date: null,
  passengers: minCountPassengers,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const searchParamsReducer = (state = initialState, action: any) => {
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
            IATA: action.preload.departureFrom.IATA,
            name: action.preload.departureFrom.name,
            country: action.preload.departureFrom.country,
          },
          destinationTo: {
            city: action.preload.destinationTo.city,
            IATA: action.preload.destinationTo.IATA,
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
