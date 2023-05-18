export interface Airport {
  city: string,
  key: string,
  name: string,
  country: string,
}
export interface Passengers {
  adult: number;
  child: number;
  infant: number;
}

export interface Directions {
  departureFrom: Airport,
  destinationTo: Airport,
}

export interface DatesRange {
  start: string,
  end: string,
}

export interface FlightSearchData {
  fromKey: string;
  toKey: string;
  forwardDate: string;
  backDate: string;
}

export interface FlightPrices {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}

export interface Flight {
  form: Airport;
  to: Airport;
  takeoffDate: string;
  landingDate: string;
  timeMins: string;
  seats: FlightSeats;
  price: FlightPrices;
  otherFlights: {
    '1': Flight;
    '2': Flight;
    '3': Flight;
    '4': Flight;
    '5': Flight;
    '-5': Flight;
    '-4': Flight;
    '-3': Flight;
    '-2': Flight;
    '-1': Flight;
  }
  flightNumber: string;
}

export interface FlightSeats {
  avaible: number;
  total: number;
}
