import {
  Directions, Passengers,
} from 'src/app/flight/models/flight.models';

export enum SearchParamsActionsTypes {
  chooseIsRoundTrip = '[SEARCH PARAMS] chooseIsRoundTrip',
  chooseDirections = '[SEARCH PARAMS] chooseDirections',
  chooseRange = '[SEARCH PARAMS] chooseRange',
  chooseDate = '[SEARCH PARAMS] chooseDate',
  choosePassengers = '[SEARCH PARAMS] choosePassengers',
}

export enum FoundFlightsActionsTypes {
  foundFlights = '[FOUND FLIGHTS] foundFlights',
  chooseFlightsByDay = '[FOUND FLIGHTS] chooseFlightsByDay',
}

export function chooseIsRoundTripAction(isRoundTrip: boolean) {
  return { type: SearchParamsActionsTypes.chooseIsRoundTrip, preload: isRoundTrip };
}

export function chooseDirectionsAction(directions: Directions) {
  return { type: SearchParamsActionsTypes.chooseDirections, preload: directions };
}

export function chooseRangeAction(range: Range) {
  return { type: SearchParamsActionsTypes.chooseRange, preload: range };
}

export function chooseDateAction(date: string) {
  return { type: SearchParamsActionsTypes.chooseDate, preload: date };
}

export function choosePassengersAction(passengers: Passengers) {
  return { type: SearchParamsActionsTypes.choosePassengers, preload: passengers };
}

export function chooseFlightsByDayAction(day: string) {
  return { type: FoundFlightsActionsTypes.chooseFlightsByDay, preload: day };
}
