import { DateFormatEnum } from '../constants/date-format.enum';

export class UserDateFormat {
  dateFormat = DateFormatEnum.DD_MM_YYYY;

  get display() {
    return { dateInput: this.dateFormat };
  }

  get parse() {
    return { dateInput: this.dateFormat };
  }
}
