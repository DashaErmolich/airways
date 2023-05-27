/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { PassengerCategory } from 'src/app/booking/pages/summary-page/summary-page.component';
import { CustomFormValidatorErrorsEnum } from '../constants/custom-form-validator-errors.enum';
import { validateBirthDateByCategory } from '../helpers/birth-date-helper';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  upperCaseRegex = /[A-Z]+/;

  lowerCaseRegex = /[a-z]+/;

  numbersRegex = /[0-9]+/;

  specialCharRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;

  urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/;

  letterCaseValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }
      const hasUpperCase = this.upperCaseRegex.test(value);

      const hasLowerCase = this.lowerCaseRegex.test(value);

      const passwordValid = hasUpperCase && hasLowerCase;

      return !passwordValid
        ? {
          [CustomFormValidatorErrorsEnum.HasLettersUpperAndLowerCase]: { value: control.value },
        }
        : null;
    };
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      const hasNumber = this.numbersRegex.test(value);

      return !hasNumber
        ? {
          [CustomFormValidatorErrorsEnum.HasNumber]: { value: control.value },
        }
        : null;
    };
  }

  specialCharValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      const hasSpecialChar = this.specialCharRegex.test(value);

      return !hasSpecialChar
        ? {
          [CustomFormValidatorErrorsEnum.HasSpecialChar]: { value: control.value },
        }
        : null;
    };
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      const enteredDate = new Date(value);
      const nowDate = new Date();
      const publicationDateValid = enteredDate <= nowDate;

      return !publicationDateValid
        ? {
          [CustomFormValidatorErrorsEnum.ValidDate]: { value: control.value },
        } : null;
    };
  }

  urlValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      const validUrl = this.urlRegex.test(value);

      return !validUrl
        ? {
          [CustomFormValidatorErrorsEnum.ValidUrl]: { value: control.value },
        }
        : null;
    };
  }

  correctAirport(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      return typeof value !== 'object'
        ? {
          [CustomFormValidatorErrorsEnum.ValidAirport]: { value: control.value },
        }
        : null;
    };
  }

  isBirthDayInGroupRange(passengerCategory: PassengerCategory): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      const ageIntervalByCategory: number[] = validateBirthDateByCategory(passengerCategory);

      let dateValid = true;

      if (ageIntervalByCategory.length === 1) {
        const minValue = new Date(
          new Date().setFullYear(
            new Date().getFullYear() - ageIntervalByCategory[0],
          ),
        );
        dateValid = value.isBefore(minValue);
      } else if (ageIntervalByCategory.length === 2) {
        const minValue = new Date(
          new Date().setFullYear(
            new Date().getFullYear() - ageIntervalByCategory[0],
          ),
        );
        const maxValue = new Date(
          new Date().setFullYear(
            new Date().getFullYear() - ageIntervalByCategory[1],
          ),
        );
        dateValid = value.isBetween(maxValue, minValue);
      } else dateValid = true;

      let errorKey: CustomFormValidatorErrorsEnum;

      switch (passengerCategory) {
        case 'child':
          errorKey = CustomFormValidatorErrorsEnum.ChildAge;
          break;
        case 'infant':
          errorKey = CustomFormValidatorErrorsEnum.InfantAge;
          break;
        default:
          errorKey = CustomFormValidatorErrorsEnum.AdultAge;
      }

      return !dateValid
        ? {
          [errorKey]: {
            value: control.value,
          },
        }
        : null;
    };
  }
}
