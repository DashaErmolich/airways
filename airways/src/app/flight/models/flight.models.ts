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
  directions: {
    departureFrom: Airport,
    destinationTo: Airport,
  },
  range: {
    start: string,
    end: string,
  },
  date: string,
  passengers: CountPassengers,
}
