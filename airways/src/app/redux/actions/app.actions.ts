import {
  Directions, Passengers, Range,
} from 'src/app/flight/models/flight.models';

export enum SearchParamsActionsTypes {
  // chooseAllParams = '[SEARCH PARAMS] chooseAllParams',
  chooseIsRoundTrip = '[SEARCH PARAMS] chooseIsRoundTrip',
  chooseDirections = '[SEARCH PARAMS] chooseDirections',
  // toggleDirections = '[SEARCH PARAMS] toggleDirections',
  chooseRange = '[SEARCH PARAMS] chooseRange',
  chooseDate = '[SEARCH PARAMS] chooseDate',
  choosePassengers = '[SEARCH PARAMS] choosePassengers',

}

// export function chooseAllParamsAction(searchParams: SearchParams) {
//   return { type: SearchParamsActionsTypes.chooseAllParams, preload: searchParams };
// }

export function chooseIsRoundTripAction(isRoundTrip: boolean) {
  return { type: SearchParamsActionsTypes.chooseIsRoundTrip, preload: isRoundTrip };
}

export function chooseDirectionsAction(directions: Directions) {
  return { type: SearchParamsActionsTypes.chooseDirections, preload: directions };
}

// export function toggleDirectionsAction(directions: Directions) {
//   return { type: SearchParamsActionsTypes.chooseDirections, preload: directions };
// }

export function chooseRangeAction(range: Range) {
  return { type: SearchParamsActionsTypes.chooseRange, preload: range };
}

export function chooseDateAction(date: string) {
  return { type: SearchParamsActionsTypes.chooseDate, preload: date };
}

export function choosePassengersAction(passengers: Passengers) {
  return { type: SearchParamsActionsTypes.choosePassengers, preload: passengers };
}

// export function chooseDirectionFromAction(directions: Directions) {
// eslint-disable-next-line max-len
//   return { type: SearchParamsActionsTypes.chooseDirectionFrom, preload: directions.departureFrom };
// }

// export function chooseDirectionToAction(directions: Directions) {
//   return { type: SearchParamsActionsTypes.chooseDirectionTo, preload: directions.destinationTo };
// }
