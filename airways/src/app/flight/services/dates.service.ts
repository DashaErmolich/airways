/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';

import moment from 'moment';

import { FlightsTypesEnum } from 'src/app/flight/constants/flights-response-indexes.enum';
import { SLIDER_CONFIG } from '../constants/slider.constants';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  getDatesArr(activeDate: string) {
    const result = [];
    const middle = Math.floor(SLIDER_CONFIG.default.totalSlidesQty / 2);

    for (let i = -middle; i <= middle; i += 1) {
      if (i < 0) {
        result.push(new Date(moment(activeDate).subtract(Math.abs(i), 'days').toJSON()).toDateString());
      }
      if (i === 0) {
        result.push(new Date(moment(activeDate).toJSON()).toDateString());
      }
      if (i > 0) {
        result.push(new Date(moment(activeDate).add(i, 'days').toJSON()).toDateString());
      }
    }

    return result;
  }

  getNextCalendarDate(date: string): string {
    return new Date(moment(date).add(1, 'days').toJSON()).toDateString();
  }

  getPrevCalendarDate(date: string): string {
    return new Date(moment(date).subtract(1, 'days').toJSON()).toDateString();
  }

  private isValidFlightDate(dateOne: string, dateTwo?: string) {
    let diff: number;
    if (dateTwo === undefined) {
      diff = new Date(dateOne).getTime() - new Date().getTime();
    } else {
      diff = new Date(dateOne).getTime() - new Date(dateTwo).getTime();
    }
    return diff > 0;
  }

  isValidDate(date: string, flightTypeIndex: number, rangeStart: string | undefined, rangeEnd: string | undefined) {
    let isValid = false;

    if (date) {
      switch (flightTypeIndex) {
        case FlightsTypesEnum.RoundTripForwardFlight:
          isValid = this.isValidFlightDate(date) && this.isValidFlightDate(rangeEnd!, date);
          break;
        case FlightsTypesEnum.RoundTripReturnFlight:
          isValid = this.isValidFlightDate(date) && this.isValidFlightDate(date, rangeStart!);
          break;
        default:
          isValid = this.isValidFlightDate(date);
      }
    }
    return isValid;
  }
}
