import { Passengers } from '../models/flight.models';

export const PASSENGERS_DEFAULT: Passengers = {
  adult: 1,
  child: 0,
  infant: 0,
};

export const PASSENGERS_MAX: Passengers = {
  adult: 5,
  child: 5,
  infant: 5,
};
