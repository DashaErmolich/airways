import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomFormValidatorErrorsEnum } from 'src/app/core/constants/custom-form-validator-errors.enum';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { formValidationErrorsMessages } from 'src/assets/form-validation-errors-messages';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import { Observable } from 'rxjs';
import { selectError } from 'src/app/redux/selectors/auth.selectors';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import countryInfo from '../../../../assets/country-codes.json';
import { CountryInfo } from '../../models/country-code.model';
import * as AuthActions from '../../../redux/actions/auth.actions';

@Component({
  selector: 'app-sign-up-tab',
  templateUrl: './sign-up-tab.component.html',
  styleUrls: ['./sign-up-tab.component.scss'],
})
export class SignUpTabComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup;

  errorsMessages = formValidationErrorsMessages.authForm;

  customErrors = CustomFormValidatorErrorsEnum;

  COUNTRY_INFO: CountryInfo[] = countryInfo;

  isPasswordHidden = true;

  error$!: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignUpTabComponent>,
    private formValidatorService: FormValidatorService,
    private store$: Store<AppState>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.error$ = this.store$.pipe(select(selectError));
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'),
    );
  }

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
          Validators.pattern('[0-9]+'),
        ],
      ],
      citizenship: [
        '',
        [
          Validators.required,
        ],
      ],
      agreement: [
        '',
        [
          Validators.requiredTrue,
        ],
      ],
    });
  }

  ngOnDestroy(): void {
    this.signUpForm.reset();
  }

  onSubmit(): void {
    this.store$.dispatch(AuthActions.signUp({ user: this.signUpForm.value }));
  }
}
