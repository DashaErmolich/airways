import {
  Component, Inject, OnDestroy, OnInit,
} from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { CustomFormValidatorErrorsEnum } from 'src/app/core/constants/custom-form-validator-errors.enum';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { formValidationErrorsMessages } from 'src/assets/form-validation-errors-messages';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectError } from 'src/app/redux/selectors/auth.selectors';
import { MatIconService } from 'src/app/core/services/icon.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { UserDateFormat } from 'src/app/core/helpers/user-date-format';
import * as _moment from 'moment';
// eslint-disable-next-line import/no-named-default
import { default as _rollupMoment } from 'moment';
import { selectDateFormat } from 'src/app/redux/selectors/settings.selectors';
import { DateFormatEnum } from 'src/app/core/constants/date-format.enum';
import countryInfo from '../../../../assets/country-codes.json';
import { CountryInfo } from '../../models/country-code.model';
import * as AuthActions from '../../../redux/actions/auth.actions';
import { AuthFormHelperService } from '../../auth-form-helper.service';
import { User } from '../../models/user.model';
import { DefaultFacebookUserEnum, DefaultGoogleUserEnum } from '../../constants/default-users.enum';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-sign-up-tab',
  templateUrl: './sign-up-tab.component.html',
  styleUrls: ['./sign-up-tab.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useClass: UserDateFormat },
  ],
})
export class SignUpTabComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  signUpForm!: FormGroup;

  errorsMessages = formValidationErrorsMessages.authForm;

  customErrors = CustomFormValidatorErrorsEnum;

  COUNTRY_INFO: CountryInfo[] = countryInfo;

  isPasswordHidden = true;

  error$!: Observable<string | null>;

  dateFormat$!: Observable<string>;

  constructor(
    @Inject(MAT_DATE_FORMATS) private config: UserDateFormat,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private store$: Store<AppState>,
    private matIconService: MatIconService,
    private formHelper: AuthFormHelperService,
  ) { }

  ngOnInit() {
    this.error$ = this.store$.pipe(select(selectError));

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

    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));

    this.dateFormat$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      this.updateDateFormatConfig(res);
      this.updateDateFormControl();
    });
  }

  ngOnDestroy(): void {
    this.signUpForm.reset();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private fillFormWithDefaultData<T>(defaultUser: { [k: string]: T }): void {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const prop in defaultUser) {
      const formControl = this.signUpForm.get(prop);
      if (formControl) {
        formControl.setValue(defaultUser[prop as keyof User]);
      }
    }
  }

  onSubmit(): void {
    this.store$.dispatch(AuthActions.signUp({ user: this.signUpForm.value }));
  }

  fillFormWithGoogle(): void {
    const defaultUser = Object.fromEntries(Object.entries(DefaultGoogleUserEnum));
    this.fillFormWithDefaultData<DefaultGoogleUserEnum>(defaultUser);
  }

  fillFormWithFacebook(): void {
    const defaultUser = Object.fromEntries(Object.entries(DefaultFacebookUserEnum));
    this.fillFormWithDefaultData<DefaultFacebookUserEnum>(defaultUser);
  }

  isPasswordErrors(): boolean {
    return this.formHelper.isPasswordErrors(this.signUpForm.controls['password']);
  }

  getTooltipMessage(): string {
    return this.formHelper.getPasswordErrorsTooltipMessage(this.signUpForm.controls['password']);
  }

  updateDateFormatConfig(newDateFormat: string) {
    this.config.dateFormat = newDateFormat as DateFormatEnum;
  }

  updateDateFormControl() {
    const { dateOfBirth } = this.signUpForm.value;
    this.signUpForm.removeControl('dateOfBirth');
    this.signUpForm.addControl('dateOfBirth', new FormControl(new Date(dateOfBirth), [Validators.required,
      this.formValidatorService.dateValidator()]));
  }
}
