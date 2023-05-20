import { Component, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormGroup, Validators,
} from '@angular/forms';

import { CountryInfo } from 'src/app/auth/models/country-code.model';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { formValidationErrorsMessages } from 'src/assets/form-validation-errors-messages';
import { CustomFormValidatorErrorsEnum } from 'src/app/core/constants/custom-form-validator-errors.enum';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import { StepsEnum } from 'src/app/core/constants/steps.enum';
import { passengerResponse } from '../../../shared/mocked/passengers-response';
import countryInfo from '../../../../assets/country-codes.json';
import * as BookingActions from '../../../redux/actions/booking.actions';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent implements OnInit {
  passengerForm!: FormGroup;

  COUNTRY_INFO: CountryInfo[] = countryInfo;

  errorMessages = formValidationErrorsMessages;

  customErrors = CustomFormValidatorErrorsEnum;

  constructor(
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private store$: Store<AppState>,
  ) {
    this.matIconRegistry.addSvgIcon(
      'pass-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/passengers/passengers-icon.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'pass-details',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/passengers/passengers-details.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'pass-assistance',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/passengers/passengers-assistance.svg'),
    );
  }

  ngOnInit(): void {
    this.passengerForm = this.fb.group({
      adult: this.fb.array([]),
      child: this.fb.array([]),
      infant: this.fb.array([]),
      contactDetails: this.fb.group({
        countryCode: ['', Validators.required],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('[0-9]+'),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
          ],
        ],
      }),
    });
    this.setupForm();

    this.store$.dispatch(BookingActions.setStep({ step: StepsEnum.Third }));
  }

  get adult() {
    return this.passengerForm.controls['adult'] as FormArray;
  }

  get child() {
    return this.passengerForm.controls['child'] as FormArray;
  }

  get infant() {
    return this.passengerForm.controls['infant'] as FormArray;
  }

  get contactDetails() {
    return this.passengerForm.controls['contactDetails'] as FormGroup;
  }

  private setupForm() {
    for (let i = 0; i < passengerResponse.adults; i += 1) {
      const item = this.createPassenger();
      this.adult.push(item);
    }
    for (let i = 0; i < passengerResponse.child; i += 1) {
      const item = this.createPassenger();
      this.child.push(item);
    }
    for (let i = 0; i < passengerResponse.infant; i += 1) {
      const item = this.createPassenger();
      this.infant.push(item);
    }
  }

  private createPassenger() {
    return this.fb.group({
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
      gender: ['Male', Validators.required],
      dateOfBirth: [
        '',
        [
          Validators.required,
          this.formValidatorService.dateValidator(),
        ],
      ],
      isNeedAssistance: [false, Validators.required],
    });
  }

  onSubmit() {
    // eslint-disable-next-line no-console
    console.log(this.passengerForm.value);
  }

  goBack() {
    this.router.navigate(['/flights/selection']);
  }
}
