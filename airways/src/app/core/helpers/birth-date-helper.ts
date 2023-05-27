import { PassengerCategory } from 'src/app/booking/pages/summary-page/summary-page.component';

const AGE_INTERVAL = {
  adult: [14],
  child: [2, 14],
  infant: [0, 2],
};
export function getFormIntervalDescription(
  passengerCategory: PassengerCategory,
): string {
  let description = '';
  switch (passengerCategory) {
    case 'adult':
      description = `${AGE_INTERVAL.adult[0]}+ years`;
      break;
    case 'child':
      description = `${AGE_INTERVAL.child[0]}-${AGE_INTERVAL.child[1]} years`;
      break;
    case 'infant':
      description = `${AGE_INTERVAL.infant[0]}-${AGE_INTERVAL.infant[1]} years`;
      break;
    default:
      break;
  }
  return description;
}

export function validateBirthDateByCategory(passengerCategory: PassengerCategory) : number[] {
  return AGE_INTERVAL[passengerCategory];
}
