/* eslint-disable default-case */
import {
  ChangeDetectionStrategy,
  Component, Inject, OnDestroy, OnInit,
} from '@angular/core';
import {
  FormArray, FormBuilder, FormGroup, Validators,
} from '@angular/forms';

import { CountryInfo } from 'src/app/auth/models/country-code.model';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { formValidationErrorsMessages } from 'src/assets/form-validation-errors-messages';
import { CustomFormValidatorErrorsEnum } from 'src/app/core/constants/custom-form-validator-errors.enum';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import { BookingStepsEnum } from 'src/app/core/constants/booking-steps.constants';
import countryInfo from 'src/assets/country-codes.json';
import * as BookingActions from 'src/app/redux/actions/booking.actions';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { UserDateFormat } from 'src/app/core/helpers/user-date-format';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectDateFormat } from 'src/app/redux/selectors/settings.selectors';
import { DateFormatEnum } from 'src/app/core/constants/date-format.enum';
import { Passengers } from 'src/app/flight/models/flight.models';
import { selectPassengers } from 'src/app/redux/selectors/trip-search.selectors';
import { Location } from '@angular/common';
import { MatIconService } from '../../../core/services/icon.service';
import { PassengerBooking } from '../../models/passengers-bookings.model';

const MAX_CHECKED_BAG = 5;

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useClass: UserDateFormat },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  passengerForm!: FormGroup;

  COUNTRY_INFO: CountryInfo[] = countryInfo;

  errorMessages = formValidationErrorsMessages;

  customErrors = CustomFormValidatorErrorsEnum;

  dateFormat$!: Observable<string>;

  dateFormat!: string;

  passengers!: Passengers;

  constructor(
    @Inject(MAT_DATE_FORMATS) private config: UserDateFormat,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private router: Router,
    private store$: Store<AppState>,
    private matIconService: MatIconService,
    private location: Location,
  ) { }

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

    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));

    this.dateFormat$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res) => {
      this.dateFormat = res;
      this.updateDateFormatConfig(res);
      this.updatePassengerForm(this.adult);
      this.updatePassengerForm(this.child);
      this.updatePassengerForm(this.infant);
    });

    this.store$.pipe(
      select(selectPassengers),
      takeUntil(this.destroy$),
    ).subscribe((res: Passengers) => {
      this.passengers = res;
    });

    this.setupForm();
    this.store$.dispatch(BookingActions.setStep({ step: BookingStepsEnum.Third }));
  }

  ngOnDestroy(): void {
    this.passengerForm.reset();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
    for (let i = 0; i < this.passengers.adult; i += 1) {
      const item = this.createPassenger();
      this.adult.push(item);
    }
    for (let i = 0; i < this.passengers.child; i += 1) {
      const item = this.createPassenger();
      this.child.push(item);
    }
    for (let i = 0; i < this.passengers.infant; i += 1) {
      const item = this.createPassenger();
      this.infant.push(item);
    }
  }

  private createPassenger(val?: PassengerBooking) {
    return this.fb.group({
      firstName: [
        val?.firstName || '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      lastName: [
        val?.lastName || '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      gender: [val?.gender || 'male', Validators.required],
      dateOfBirth: [
        (val?.dateOfBirth) || '',
        [
          Validators.required,
          this.formValidatorService.dateValidator(),
        ],
      ],
      cabinBag: [{
        value: 1,
        disabled: true,
      },
      ],
      checkedBag: [
        val?.checkedBag || 0,
      ],
    });
  }

  onSubmit() {
    if (this.passengerForm.valid) {
      this.store$.dispatch(BookingActions.setPassengers({
        adult: this.passengerForm.value.adult,
        child: this.passengerForm.value.child,
        infant: this.passengerForm.value.infant,
        contactDetails: this.passengerForm.value.contactDetails,
      }));
      this.router.navigate(['booking', 'summary']);
    }
  }

  goBack() {
    this.location.back();
  }

  updateDateFormatConfig(newDateFormat: string) {
    this.config.dateFormat = newDateFormat as DateFormatEnum;
  }

  updatePassengerForm(formArray: FormArray) {
    const { length } = formArray.controls;
    const { value } = formArray;

    for (let i = 0; i <= length - 1; i += 1) {
      formArray.setControl(i, this.createPassenger(value[i] as PassengerBooking), { emitEvent: false });
    }
  }

  increaseCheckedBaggage(passengerType: string, index: number) {
    let { value } = passengerType === 'adult'
      ? (this.adult.at(index) as FormGroup).get('checkedBag')!
      : (this.child.at(index) as FormGroup).get('checkedBag')!;

    switch (passengerType) {
      case 'adult':
        (this.adult.at(index) as FormGroup).get('checkedBag')?.setValue(value += 1, { emitEvent: false });
        break;
      case 'child':
        (this.child.at(index) as FormGroup).get('checkedBag')?.setValue(value += 1, { emitEvent: false });
        break;
    }
  }

  decreaseCheckedBaggage(passengerType: string, index: number) {
    let { value } = passengerType === 'adult'
      ? (this.adult.at(index) as FormGroup).get('checkedBag')!
      : (this.child.at(index) as FormGroup).get('checkedBag')!;

    switch (passengerType) {
      case 'adult':
        (this.adult.at(index) as FormGroup).get('checkedBag')?.setValue(value -= 1, { emitEvent: false });
        break;
      case 'child':
        (this.child.at(index) as FormGroup).get('checkedBag')?.setValue(value -= 1, { emitEvent: false });
        break;
    }
  }

  getCheckedBaggage(passengerType: string, index: number): number {
    switch (passengerType) {
      case 'adult':
        return (this.adult.at(index) as FormGroup).get('checkedBag')!.value;
      case 'child':
        return (this.child.at(index) as FormGroup).get('checkedBag')!.value;
      default:
        return 0;
    }
  }

  isCheckedBaggage(passengerType: string, index: number) {
    return this.getCheckedBaggage(passengerType, index) > 0;
  }

  isMaxCheckedBaggageReached(passengerType: string, index: number) {
    return this.getCheckedBaggage(passengerType, index) >= MAX_CHECKED_BAG;
  }
}
