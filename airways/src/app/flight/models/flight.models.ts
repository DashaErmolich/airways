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
  directions: Directions,
  range: Range,
  date: string,
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
