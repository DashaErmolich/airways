import { GenderType, PassengerType } from 'src/app/shared/enums/passenger-details';

export interface BookingPassengersInfo {
  [PassengerType.Adult]: BookingPassenger[],
  [PassengerType.Child]: BookingPassenger[],
  [PassengerType.Infant]: BookingPassenger[],
  contactDetails: ContactDetails,
}

export interface BookingPassenger {
  firstName: string,
  lastName: string,
  gender: GenderType,
  dateOfBirth: string,
  isNeedAssistance: boolean,
  extraLuggage: boolean,
  extraLuggageCount: number,
}

export interface ContactDetails {
  countryCode: string,
  email: string,
  phoneNumber: string
}
