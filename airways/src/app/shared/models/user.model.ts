export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  countryCode: string;
  phoneNumber: number;
  citizenship: string;
}
