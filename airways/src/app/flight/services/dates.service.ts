/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';

import moment from 'moment';

import { FlightsTypesEnum } from 'src/app/flight/constants/flights-response-indexes.enum';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  getDatesArr(activeDate: string) {
    const result = [];

    for (let i = -3; i <= 3; i += 1) {
      if (i < 0) {
        result.push(moment(activeDate).subtract(Math.abs(i), 'days').toJSON());
      }
      if (i === 0) {
        result.push(moment(activeDate).toJSON());
      }
      if (i > 0) {
        result.push(moment(activeDate).add(i, 'days').toJSON());
      }
    }

    return result;
  }

  getNextCalendarDate(date: string): string {
    return this.formatTimezone(moment(date).add(1, 'days').toJSON());
  }

  getPrevCalendarDate(date: string): string {
    return this.formatTimezone(moment(date).subtract(1, 'days').toJSON());
  }

  formatTimezone(date: Date | string): string {
    if (typeof date === 'object') {
      const offset = Math.abs(new Date(date).getTimezoneOffset() / 60);
      return new Date(new Date(date).setHours(offset, 0, 0, 0)).toJSON();
    } else {
      return new Date((new Date(date)).toJSON().substring(0, 10)).toJSON();
    }
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
