import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidatorErrorsEnum } from 'src/app/core/constants/custom-form-validator-errors.enum';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { formValidationErrorsMessages } from 'src/assets/form-validation-errors-messages';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import { Observable } from 'rxjs';
import { selectError } from 'src/app/redux/selectors/auth.selectors';
import { MatIconService } from 'src/app/core/services/icon.service';
import countryInfo from '../../../../assets/country-codes.json';
import { CountryInfo } from '../../models/country-code.model';
import * as AuthActions from '../../../redux/actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { AuthFormHelperService } from '../../auth-form-helper.service';

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
    private formValidatorService: FormValidatorService,
    private store$: Store<AppState>,
    private authService: AuthService,
    private matIconService: MatIconService,
    private formHelper: AuthFormHelperService,
  ) {
    this.error$ = this.store$.pipe(select(selectError));
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

  fillFormWithGoogle(): void {
    this.authService.getDefaultUsers().subscribe((res) => {
      this.signUpForm.get('email')!.setValue(res[0].email);
      this.signUpForm.get('firstName')!.setValue(res[0].firstName);
      this.signUpForm.get('lastName')!.setValue(res[0].lastName);
      this.signUpForm.get('citizenship')!.setValue(res[0].citizenship);
      this.signUpForm.get('countryCode')!.setValue(res[0].countryCode);
      this.signUpForm.get('dateOfBirth')!.setValue(res[0].dateOfBirth);
      this.signUpForm.get('gender')!.setValue(res[0].gender);
      this.signUpForm.get('phoneNumber')!.setValue(res[0].phoneNumber);
      this.signUpForm.get('password')!.setValue('Qwert123!');
    });
  }

  fillFormWithFacebook(): void {
    this.authService.getDefaultUsers().subscribe((res) => {
      this.signUpForm.get('email')!.setValue(res[1].email);
      this.signUpForm.get('firstName')!.setValue(res[1].firstName);
      this.signUpForm.get('lastName')!.setValue(res[1].lastName);
      this.signUpForm.get('citizenship')!.setValue(res[1].citizenship);
      this.signUpForm.get('countryCode')!.setValue(res[1].countryCode);
      this.signUpForm.get('dateOfBirth')!.setValue(res[1].dateOfBirth);
      this.signUpForm.get('gender')!.setValue(res[1].gender);
      this.signUpForm.get('phoneNumber')!.setValue(res[1].phoneNumber);
      this.signUpForm.get('password')!.setValue('Qwert123!');
    });
  }

  isPasswordErrors(): boolean {
    return this.formHelper.isPasswordErrors(this.signUpForm.controls['password']);
  }

  getTooltipMessage(): string {
    return this.formHelper.getPasswordErrorsTooltipMessage(this.signUpForm.controls['password']);
  }
}
