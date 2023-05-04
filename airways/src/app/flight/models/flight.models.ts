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

export interface SearchFormState {
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

export interface SearchFlightsAPIRequest {
  fromKey: string | undefined;
  toKey: string | undefined;
  forwardDate: string | null | undefined;
  backDate: string | null | undefined;
}

export interface AirportAPIResponse {
  key:string;
  country: string;
  city: string;
  name:string;
}

export interface PriceAPIResponse {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}

export interface AvailableFlight {
  form: AirportAPIResponse;
  to: AirportAPIResponse;
  takeoffDate: string;
  landingDate: string;
  timeMins: string;
  avaible: number
  price: PriceAPIResponse;
  flightNumber: string;
  prices: {
    '0': PriceAPIResponse,
    '1': PriceAPIResponse,
    '2': PriceAPIResponse,
    '-2': PriceAPIResponse,
    '-1': PriceAPIResponse,
  }
}
