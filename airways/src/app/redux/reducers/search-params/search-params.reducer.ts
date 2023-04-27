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
//   range: { start: '2023-04-24T22:00:00.000Z', end: '2023-04-28T22:00:00.000Z' },
//   date: '2023-04-29T22:00:00.000Z',
//   passengers: { adult: 1, child: 1, infant: 1 },
// };

// const initialState: SearchParams = {
//   isRoundTrip: false,
//   directions: {
//     departureFrom: {
//       city: '',
//       IATA: '',
//       name: '',
//       country: '',
//     },
//     destinationTo: {
//       city: '',
//       IATA: '',
//       name: '',
//       country: '',
//     },
//   },
//   range: {
//     start: '',
//     end: '',
//   },
//   date: '',
//   passengers: {
//     adult: 1,
//     child: 0,
//     infant: 0,
//   },
// };

const initialState: SearchParams = {
  isRoundTrip: false,
  directions: null,
  range: null,
  date: null,
  passengers: {
    adult: 1,
    child: 0,
    infant: 0,
  },
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const searchParamsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // case SearchParamsActionsTypes.chooseAllParams:
    //   return {
    //     ...state,
    //     isRoundTrip: action.preload.isRoundTrip,
    //     directions: {
    //       departureFrom: {
    //         city: action.preload.directions.departureFrom.city,
    //         IATA: action.preload.directions.departureFrom.IATA,
    //         name: action.preload.directions.departureFrom.name,
    //         country: action.preload.directions.departureFrom.country,
    //       },
    //       destinationTo: {
    //         city: action.preload.directions.destinationTo.city,
    //         IATA: action.preload.directions.destinationTo.IATA,
    //         name: action.preload.directions.destinationTo.name,
    //         country: action.preload.directions.destinationTo.country,
    //       },
    //     },
    //     range: {
    //       start: action.preload.range.start,
    //       end: action.preload.range.end,
    //     },
    //     date: action.preload.date,
    //     passengers: {
    //       adult: action.preload.passengers.adult,
    //       child: action.preload.passengers.child,
    //       infant: action.preload.passengers.infant,
    //     },
    //   };

    case SearchParamsActionsTypes.chooseIsRoundTrip:
      return {
        ...state,
        isRoundTrip: action.preload,
        // date: action.preload ? null : state.date,
        // range: !action.preload ? null : state.range,
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
        // date: null,
        range: {
          start: action.preload.start,
          end: action.preload.end,
        },
      };

    case SearchParamsActionsTypes.chooseDate:
      return {
        ...state,
        date: action.preload,
        // range: null,
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
