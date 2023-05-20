/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'flightTime',
})
export class FlightTimePipe implements PipeTransform {
  transform(value: string): string {
    const time = moment.utc().startOf('day').add(value, 'minutes');
    return `${time.format('hh')}h ${time.format('mm')}m`;
  }
}
