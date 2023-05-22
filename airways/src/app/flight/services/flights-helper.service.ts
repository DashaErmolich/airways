/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { FlightsTypesEnum } from '../constants/flights-response-indexes.enum';

@Injectable({
  providedIn: 'root',
})
export class FlightsHelperService {
  isReturnFlight(flightTypeIndex: number): boolean {
    return flightTypeIndex === FlightsTypesEnum.RoundTripReturnFlight;
  }
}
