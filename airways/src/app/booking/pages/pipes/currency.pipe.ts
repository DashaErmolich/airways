import { Pipe, PipeTransform } from '@angular/core';
import { FlightPrices } from 'src/app/flight/models/flight.models';

@Pipe({
  name: 'bookingCurrValue',
})
export class BookingCurrencyValue implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: FlightPrices, currency: string): number {
    return value[currency.toLowerCase() as keyof FlightPrices];
  }
}
