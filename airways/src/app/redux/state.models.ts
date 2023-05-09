import {
  Passengers, DatesRange, Airport, Flight,
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
  isRoundTrip: boolean;
  isOneWayTrip: boolean;
  from: Airport | null;
  to: Airport | null;
  startTripDate: string | null;
  rangeTripDates: DatesRange | null;
  passengers: Passengers;
}

export interface FlightsState {
  isLoading: boolean;
  error: string | null;
  flights: Flight[][],
}

export interface BookingState {
  passengers: Passengers | null;
  flights: Flight[];
}

export interface AppState {
  auth: AuthState;
  flightsSearch: FlightSearchState;
  flights: FlightsState;
  booking: BookingState;
}
