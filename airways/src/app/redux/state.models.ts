import {
  Passengers, DatesRange, Airport, Flight,
} from '../flight/models/flight.models';
import { User } from '../auth/models/user.model';
import { BookingContactDetails, PassengerBooking } from '../booking/models/passengers-bookings.model';

export interface AuthState {
  isAuth: boolean;
  error: string | null;
  token: string | null;
  user: User | null;
}

export interface SettingsState {
  dateFormat: string;
  currency: string;
}

export interface TripSearchState {
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
  forwardFlights: Flight[],
  returnFlights: Flight[],
  forwardFlight: Flight | null,
  returnFlight: Flight | null,
}

export interface BookingState {
  step: number;
  adult: PassengerBooking[];
  child: PassengerBooking[];
  infant: PassengerBooking[];
  contactDetails: BookingContactDetails;
}

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  flightsSearch: TripSearchState;
  flights: FlightsState;
  booking: BookingState;
}
