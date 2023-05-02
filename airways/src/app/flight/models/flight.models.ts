export interface Airport {
  city: string,
  IATA: string,
  name: string,
  country: string,
}
export interface Passengers {
  adult: number;
  child: number;
  infant: number;
}

export interface SearchParams {
  isRoundTrip: boolean,
  directions: Directions | null,
  range: DatesRange | null,
  date: string | null,
  passengers: Passengers,
}

export interface Directions {
  departureFrom: Airport,
  destinationTo: Airport,
}

export interface DatesRange {
  start: string,
  end: string,
}

export interface Flight {
  departureFrom: Airport,
  departureDate: string,
  destinationTo: Airport,
  destinationDate: string,
  duration: string,
  flightNumber: string,
  countPlaces: number,
  countAvailablePlaces: number,
  price: number,
}

export interface FoundFlightsWithDate {
  day: string | null,
  flights: Flight[] | undefined,
}

export interface FoundFlights {
  day: string | null;
  flightsWithDates: FoundFlightsWithDate[] | null,
}

export interface SearchFlightsNew {
  fromKey: string | undefined;
  toKey: string | undefined;
  forwardDate: string | null | undefined;
  backDate: string | null;
}

export interface AirportNew {
  key:string;
  country: string;
  city: string;
  name:string;
}

export interface PriceNew {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}

export interface FlightNew {
  form: AirportNew;
  to: AirportNew;
  takeoffDate: string;
  landingDate: string;
  timeMins: string;
  avaible: number
  price: PriceNew;
  flightNumber: string;
}
