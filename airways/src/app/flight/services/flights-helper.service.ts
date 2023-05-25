/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { FlightsTypesEnum } from '../constants/flights-response-indexes.enum';
import { Flight } from '../models/flight.models';

@Injectable({
  providedIn: 'root',
})
export class FlightsHelperService {
  isReturnFlight(flightTypeIndex: number): boolean {
    return flightTypeIndex === FlightsTypesEnum.RoundTripReturnFlight;
  }

  isFlightAvailable(seatsQty: number, passengersQty: number): boolean {
    return seatsQty < passengersQty;
  }

  isDirectFlight(connectedFlights: Flight[] | null): boolean {
    return connectedFlights === null;
  }
}
