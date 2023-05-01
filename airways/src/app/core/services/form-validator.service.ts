/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CustomFormValidatorErrorsEnum } from '../constants/custom-form-validator-errors.enum';

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
}
