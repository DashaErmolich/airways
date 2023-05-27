export interface PassengerBooking {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  isNeedAssistance?: boolean;
  cabinBag: number;
  checkedBag: number;
}

export interface BookingContactDetails {
  countryCode: string | null;
  phoneNumber: number | null;
  email: string | null;
}
