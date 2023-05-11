/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import moment from 'moment';

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
    return this.formatTimezone(moment(date).add(1, 'days').toDate());
  }

  getPrevCalendarDate(date: string): string {
    return this.formatTimezone(moment(date).subtract(1, 'days').toDate());
  }

  formatTimezone(date: Date): string {
    const offset = Math.abs(date.getTimezoneOffset() / 60);
    return new Date((date).setHours(offset, 0, 0, 0)).toJSON();
  }

  isValidDate(date: string) {
    const diff = new Date(date).getTime() - new Date().getTime();
    return diff > 0;
  }
}
