/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';
import { FlightPrices } from '../models/flight.models';

@Pipe({
  name: 'currencyValue',
})
export class CurrencyValuePipe implements PipeTransform {
  transform(value: FlightPrices, currency: string): number {
    return value[currency.toLowerCase() as keyof FlightPrices];
  }
}
