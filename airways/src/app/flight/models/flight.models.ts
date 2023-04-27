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
  range: Range | null,
  date: string | null,
  passengers: Passengers,
}

export interface Directions {
  departureFrom: Airport,
  destinationTo: Airport,
}

export interface Range {
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
  day: string;
  flights: Flight[] | undefined;
}
