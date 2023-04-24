export interface Airport {
  city: string,
  IATA: string,
  name: string,
  country: string,
}
export interface CountPassengers {
  adult: number;
  child: number;
  infant: number;
}

export interface SearchParams {
  isRoundTrip: boolean,
  directions: Directions,
  range: {
    start: string,
    end: string,
  },
  date: string,
  passengers: CountPassengers,
}

export interface Directions {
  departureFrom: Airport,
  destinationTo: Airport,
}
