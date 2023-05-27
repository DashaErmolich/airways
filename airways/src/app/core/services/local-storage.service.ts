/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { Flight } from 'src/app/flight/models/flight.models';
import { BookingContactDetails, PassengerBooking } from 'src/app/booking/models/passengers-bookings.model';
import { BookingDetails } from 'src/app/redux/state.models';
import { LocalStorageKeysEnum } from '../constants/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  resetFlightsSelection() {
    localStorage.removeItem(LocalStorageKeysEnum.ForwardFlight);
    localStorage.removeItem(LocalStorageKeysEnum.ReturnFlight);
  }

  setForwardFlight(flight: Flight) {
    localStorage.setItem(LocalStorageKeysEnum.ForwardFlight, JSON.stringify(flight));
  }

  setReturnFlight(flight: Flight) {
    localStorage.setItem(LocalStorageKeysEnum.ReturnFlight, JSON.stringify(flight));
  }

  setBookingDetails(adult: PassengerBooking[], child: PassengerBooking[], infant: PassengerBooking[], contactDetails: BookingContactDetails) {
    localStorage.setItem(LocalStorageKeysEnum.BookingDetails, JSON.stringify({
      adult, child, infant, contactDetails,
    }));
  }

  getBookingDetails(): BookingDetails | null {
    const data = localStorage.getItem(LocalStorageKeysEnum.BookingDetails);
    return data ? JSON.parse(data) : null;
  }
}
