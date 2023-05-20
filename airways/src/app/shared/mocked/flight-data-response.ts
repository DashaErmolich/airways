export const flightData: AvailableFlight = {
  form: {
    key: 'keyFrom',
    country: 'countryFrom',
    city: 'cityFrom',
    name: 'nameFrom',
  },
  to: {
    key: 'keyTo',
    country: 'countryTo',
    city: 'cityTo',
    name: 'nameTo',
  },
  takeoffDate: 'takeOffDate',
  landingDate: 'landingDate',
  timeMins: 'timeMins',
  avaible: 0,
  price: {
    eur: 0,
    usd: 0,
    rub: 0,
    pln: 0,
  },
  flightNumber: 'flightNumber',
  prices: {
    0: {
      eur: 0,
      usd: 0,
      rub: 0,
      pln: 0,
    },
    1: {
      eur: 0,
      usd: 0,
      rub: 0,
      pln: 0,
    },
    2: {
      eur: 0,
      usd: 0,
      rub: 0,
      pln: 0,
    },
    '-2': {
      eur: 0,
      usd: 0,
      rub: 0,
      pln: 0,
    },
    '-1': {
      eur: 0,
      usd: 0,
      rub: 0,
      pln: 0,
    },
  },
};

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
export interface PriceAPIResponse {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}
export interface AirportAPIResponse {
  key:string;
  country: string;
  city: string;
  name:string;
}
