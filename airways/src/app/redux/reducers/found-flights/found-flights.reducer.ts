import { FoundFlights } from 'src/app/flight/models/flight.models';
import { FoundFlightsActionsTypes } from '../../actions/app.actions';

export const foundFlightsNode = 'foundFlights';

const initialState: FoundFlights = {
  day: null,
  flightsWithDates: null,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const foundFlightsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FoundFlightsActionsTypes.foundFlights:
      return {
        ...state,
        flightsWithDates: action.preload,
      };

    case FoundFlightsActionsTypes.chooseFlightsByDay:
      return {
        ...state,
        day: action.preload,
      };

    default:
      return state;
  }
};
