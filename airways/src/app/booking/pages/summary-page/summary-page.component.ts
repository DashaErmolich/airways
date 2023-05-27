/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingStepsEnum } from 'src/app/core/constants/booking-steps.constants';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import * as BookingActions from 'src/app/redux/actions/booking.actions';
import {
  Observable, Subject, combineLatest, take, takeUntil,
} from 'rxjs';
import { PassengerBooking } from 'src/app/booking/models/passengers-bookings.model';
import { Flight, FlightPrices } from 'src/app/flight/models/flight.models';
import { selectAdult, selectChild } from 'src/app/redux/selectors/booking.selectors';
import { selectForwardFlight, selectReturnFlight } from 'src/app/redux/selectors/flights.selectors';
import { selectCurrency } from 'src/app/redux/selectors/settings.selectors';
import { CurrencyValuePipe } from 'src/app/shared/pipes/currency-value.pipe';
import { selectInfant } from '../../../redux/selectors/booking.selectors';
import { BOOKING_PRICE_CONFIG } from '../../constants/price.constant';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookingFinishedComponent } from '../../componants/booking-finished/booking-finished.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
  providers: [CurrencyValuePipe],
})
export class SummaryPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  private adult$!: Observable<PassengerBooking[]>;

  child$!: Observable<PassengerBooking[]>;

  infant$!: Observable<PassengerBooking[]>;

  private forwardFlight$!: Observable<Flight | null>;

  private returnFlight$!: Observable<Flight | null>;

  child!: PassengerBooking[];

  infant!: PassengerBooking[];

  currency$!: Observable<string>;

  currency!: string;

  forwardFlight!: Flight | null;

  returnFlight!: Flight | null;

  passengers!: PassengerBooking[];

  flights!: (Flight | null)[];

  constructor(
    private store$: Store<AppState>,
    private currencyValuePipe: CurrencyValuePipe,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(BookingActions.setStep({ step: BookingStepsEnum.Fourth }));

    this.currency$ = this.store$.pipe(select(selectCurrency));
    this.adult$ = this.store$.pipe(select(selectAdult));
    this.child$ = this.store$.pipe(select(selectChild));
    this.infant$ = this.store$.pipe(select(selectInfant));
    this.forwardFlight$ = this.store$.pipe(select(selectForwardFlight));
    this.returnFlight$ = this.store$.pipe(select(selectReturnFlight));

    this.currency$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: string) => {
      this.currency = res;
    });

    this.forwardFlight$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: Flight | null) => {
      this.forwardFlight = res;
    });

    this.returnFlight$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: Flight | null) => {
      this.returnFlight = res;
    });

    this.child$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: PassengerBooking[]) => {
      this.child = res;
    });

    this.infant$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: PassengerBooking[]) => {
      this.infant = res;
    });

    combineLatest(this.adult$, this.child$, this.infant$).pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: [PassengerBooking[], PassengerBooking[], PassengerBooking[]]) => {
      this.passengers = res.flat();
    });

    combineLatest(this.forwardFlight$, this.returnFlight$).pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: [Flight | null, Flight | null]) => {
      this.flights = res.flat();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  isDirectFlight(flight: Flight) {
    return !!flight.connectedFlights.length;
  }

  getTotalPice(): number {
    switch (true) {
      case this.forwardFlight !== null && this.returnFlight !== null:
        return this.getPrice(this.forwardFlight!.price) + this.getPrice(this.returnFlight!.price);
      default:
        return this.getPrice(this.forwardFlight!.price);
    }
  }

  private getPrice(prices: FlightPrices) {
    return this.currencyValuePipe.transform(prices, this.currency);
  }

  getAdultFare() {
    switch (true) {
      case !!this.child.length && !!this.infant.length:
        return (this.getTotalPice() * BOOKING_PRICE_CONFIG.ADULT.WITH_CHILD_AND_INFANT) * (1 - BOOKING_PRICE_CONFIG.TAXES);
      case !!this.child.length && !(this.infant.length):
        return (this.getTotalPice() * BOOKING_PRICE_CONFIG.ADULT.WITH_CHILD) * (1 - BOOKING_PRICE_CONFIG.TAXES);
      case !(this.child.length) && !!this.infant.length:
        return (this.getTotalPice() * BOOKING_PRICE_CONFIG.ADULT.WITH_INFANT) * (1 - BOOKING_PRICE_CONFIG.TAXES);
      default:
        return (this.getTotalPice() * BOOKING_PRICE_CONFIG.ADULT.DEFAULT) * (1 - BOOKING_PRICE_CONFIG.TAXES);
    }
  }

  getChildFare() {
    return (this.getTotalPice() * BOOKING_PRICE_CONFIG.CHILD) * BOOKING_PRICE_CONFIG.TAXES;
  }

  getInfantFare() {
    return (this.getTotalPice() * BOOKING_PRICE_CONFIG.INFANT) * BOOKING_PRICE_CONFIG.TAXES;
  }

  getTax() {
    return (this.getTotalPice() * BOOKING_PRICE_CONFIG.TAXES) / this.passengers.length;
  }

  getInfantTotal() {
    return this.getInfantFare() + this.getTax();
  }

  getAdultTotal() {
    return this.getAdultFare() + this.getTax();
  }

  getChildTotal() {
    return this.getChildFare() + this.getTax();
  }

  buyNow() {
    const finishOrderDialog = this.dialog.open(BookingFinishedComponent);

    finishOrderDialog.afterClosed().pipe(
      take(1),
    ).subscribe(() => this.router.navigateByUrl('/'));

    
  }

  addToCart() {
    console.log(2)
  }
}
