/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  getDatesArr(activeDate: string) {
    const result = [];

    for (let i = -3; i <= 3; i += 1) {
      if (i < 0) {
        result.push(moment(activeDate).subtract(Math.abs(i), 'days').toLocaleString());
      }

      if (i === 0) {
        result.push(moment(activeDate).toLocaleString());
      }

      if (i > 0) {
        result.push(moment(activeDate).add(i, 'days').toLocaleString());
      }
    }

    return result;
  }
}
