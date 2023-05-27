import { FlightPrices } from './flight.models';

export interface PricesDetails {
  adultsPrice: FlightPrices,
  adultsFare: FlightPrices,
  adultsTax: FlightPrices,
  childPrice: FlightPrices,
  childFare: FlightPrices,
  childTax: FlightPrices,
  infantPrice: FlightPrices,
  infantFare: FlightPrices,
  infantTax: FlightPrices,
}
