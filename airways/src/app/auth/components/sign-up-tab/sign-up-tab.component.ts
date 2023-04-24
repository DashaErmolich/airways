import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomFormValidatorErrorsEnum } from 'src/app/core/constants/custom-form-validator-errors.enum';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { formValidationErrorsMessages } from 'src/assets/form-validation-errors-messages';
import countryCodes from '../../../../assets/country-codes.json';
import { CountryCode } from '../../models/country-code.model';

@Component({
  selector: 'app-sign-up-tab',
  templateUrl: './sign-up-tab.component.html',
  styleUrls: ['./sign-up-tab.component.scss'],
})
export class SignUpTabComponent implements OnInit {
  signUpForm!: FormGroup;

  errorsMessages = formValidationErrorsMessages.authForm;

  customErrors = CustomFormValidatorErrorsEnum;

  COUNTRY_CODES: CountryCode[] = countryCodes;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignUpTabComponent>,
    private formValidatorService: FormValidatorService,
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.formValidatorService.letterCaseValidator(),
          this.formValidatorService.numberValidator(),
          this.formValidatorService.specialCharValidator(),
        ],
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      dateOfBirth: [
        '',
        [
          Validators.required,
          this.formValidatorService.dateValidator(),
        ],
      ],
      gender: [
        '',
        [
          Validators.required,
        ],
      ],
      countryCode: [
        '',
        [
          Validators.required,
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
        ],
      ],
      citizenship: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  close() {
    this.dialogRef.close(this.signUpForm.value);
  }
}
