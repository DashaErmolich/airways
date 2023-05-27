/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { Pipe, PipeTransform } from '@angular/core';
import {
  PassengerCategory,
  PriceByPassengerCategory,
  PriceCategory,
} from '../pages/summary-page/summary-page.component';

type PriceCategoryProperties =
  | 'fare'
  | 'taxes'
  | 'baggage'
  | 'total-category'
  | 'total';

@Pipe({
  name: 'totalPrice',
})
export class TotalPricePipe implements PipeTransform {
  transform(
    value: PriceByPassengerCategory,
    passengerCategory: PassengerCategory,
    priceCategory: PriceCategoryProperties,
  ): number {
    let price = 0;
    if (priceCategory === 'total') {
      for (const key in value) {
        const passenger = value[key as keyof typeof value];
        for (const catKey in passenger) {
          price += passenger[catKey as keyof PriceCategory];
        }
      }
    } else if (priceCategory === 'total-category') {
      const passenger = value[passengerCategory];
      for (const catKey in passenger) {
        price += passenger[catKey as keyof PriceCategory];
      }
    } else price = value[passengerCategory][priceCategory];

    return price;
  }
}
