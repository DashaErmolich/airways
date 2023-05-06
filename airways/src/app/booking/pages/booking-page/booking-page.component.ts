import { Component, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';

import { passengerResponse } from '../../../shared/mocked/passengers-response';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent implements OnInit {
  passengerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.passengerForm = this.fb.group({
      adult: this.fb.array([]),
      child: this.createChildGroup(),
      infant: this.createInfantGroup(),
      contactDetails: this.fb.group({
        countryCode: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        email: ['', Validators.required],
      }),
    });
    this.createAdultGroup();
    // this.passengerForm = new FormGroup({
    //   adult: new FormArray([]),
    //   child: this.createChildGroup(),
    //   infant: this.createInfantGroup(),
    //   contactDetails: new FormGroup({
    //     countryCode: new FormControl('', Validators.required),
    //     mobileNumber: new FormControl('', Validators.required),
    //     email: new FormControl('', Validators.required),
    //   }),
    // });
  }

  get adult() {
    return this.passengerForm.controls['adult'] as FormArray;
  }

  private createAdultGroup() {
    const adultArray = this.passengerForm.get('adult') as FormArray;
    for (let i = 0; i < passengerResponse.adults; i + 1) {
      adultArray.push(this.createPassenger());
    }
  }

  private createChildGroup() {
    const childArray: any = new FormArray([]);
    for (let i = 0; i < passengerResponse.child; i + 1) {
      childArray.push(this.createPassenger());
    }
    return childArray;
  }

  private createInfantGroup() {
    const infantArray: any = new FormArray([]);
    for (let i = 0; i < passengerResponse.infant; i + 1) {
      infantArray.push(this.createPassenger());
    }
    return infantArray;
  }

  // private createPassenger() {
  //   return this.fb.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     sex: ['', Validators.required],
  //     dateOfBirth: ['', Validators.required],
  //     isNeedAssistance: [false, Validators.required],
  //   });
  // }
  // eslint-disable-next-line class-methods-use-this
  private createPassenger() {
    return new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      isNeedAssistance: new FormControl('', Validators.required),
    });
  }
}
