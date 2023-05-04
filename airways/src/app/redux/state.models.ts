import {
  Passengers, DatesRange, Airport, AvailableFlight,
} from '../flight/models/flight.models';
import { User } from '../shared/models/user.model';

export interface AuthState {
  isAuth: boolean;
  error: string | null;
  dateFormat: string;
  currency: string;
  token: string | null;
  user: User | null;
}

export interface FlightSearchState {
  isRoundTrip: boolean | undefined;
  isOneWayTrip: boolean | undefined;
  from: Airport | null | undefined;
  to: Airport | null | undefined;
  startTripDate: string | null | undefined;
  rangeTripDates: DatesRange | null | undefined;
  passengers: Passengers | null | undefined;
}

export interface AvailableFlightsState {
  isLoading: boolean;
  availableFlights: AvailableFlight[];
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  flightsSearch: FlightSearchState;
  availableFlights: AvailableFlightsState;
}
