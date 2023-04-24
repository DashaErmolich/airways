import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomFormValidatorErrorsEnum } from 'src/app/core/constants/custom-form-validator-errors.enum';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { formValidationErrorsMessages } from 'src/assets/form-validation-errors-messages';

@Component({
  selector: 'app-login-tab',
  templateUrl: './login-tab.component.html',
  styleUrls: ['./login-tab.component.scss'],
})
export class LoginTabComponent implements OnInit {
  loginForm!: FormGroup;

  errorsMessages = formValidationErrorsMessages.authForm;

  customErrors = CustomFormValidatorErrorsEnum;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginTabComponent>,
    private formValidatorService: FormValidatorService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
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
    });
  }

  close() {
    this.dialogRef.close(this.loginForm.value);
  }
}
