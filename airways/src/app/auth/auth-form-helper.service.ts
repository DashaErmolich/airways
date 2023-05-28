import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { formValidationErrorsMessages } from '../../assets/form-validation-errors-messages';
import { CustomFormValidatorErrorsEnum } from '../core/constants/custom-form-validator-errors.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthFormHelperService {
  errorsMessages = formValidationErrorsMessages.authForm;

  customErrors = CustomFormValidatorErrorsEnum;

  isPasswordErrors(formControl: AbstractControl): boolean {
    return formControl.hasError('minlength')
    || formControl.hasError(this.customErrors.HasLettersUpperAndLowerCase)
    || formControl.hasError(this.customErrors.HasNumber)
    || formControl.hasError(this.customErrors.HasSpecialChar);
  }

  getPasswordErrorsTooltipMessage(formControl: AbstractControl): string {
    const toolTipMessage = [];

    if (formControl.hasError('minlength')) {
      toolTipMessage.push(this.errorsMessages.password.strong.length);
    }
    if (formControl.hasError(this.customErrors.HasLettersUpperAndLowerCase)) {
      toolTipMessage.push(this.errorsMessages.password.strong.hasUpperCaseAndLowerCaseLetters);
    }
    if (formControl.hasError(this.customErrors.HasNumber)) {
      toolTipMessage.push(this.errorsMessages.password.strong.hasNumber);
    }
    if (formControl.hasError(this.customErrors.HasSpecialChar)) {
      toolTipMessage.push(this.errorsMessages.password.strong.hasSpecialChar);
    }
    return toolTipMessage.join('\n');
  }
}
