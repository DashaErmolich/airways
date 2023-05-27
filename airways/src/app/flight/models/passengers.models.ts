import { GenderType, PassengerType } from 'src/app/shared/enums/passenger-details';

export interface PassengersDetails {
  [PassengerType.Adult]: PassengerData[],
  [PassengerType.Child]: PassengerData[],
  [PassengerType.Infant]: PassengerData[],
  contactDetails: ContactDetails,
}

export interface PassengerData {
  firstName: string,
  lastName: string,
  gender: GenderType,
  dateOfBirth: string,
  isNeedAssistance: boolean,
}

export interface ContactDetails {
  countryCode: string,
  email: string,
  phoneNumber: string
}
