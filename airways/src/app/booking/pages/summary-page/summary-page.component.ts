/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingStepsEnum } from 'src/app/core/constants/booking-steps.constants';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import * as BookingActions from 'src/app/redux/actions/booking.actions';
import * as ShoppingCartActions from 'src/app/redux/actions/shopping-cart.actions';
import * as UserTripsActions from 'src/app/redux/actions/user-trips.actions';
import {
  Observable, Subject, combineLatest, take, takeUntil,
} from 'rxjs';
import { PassengerBooking } from 'src/app/booking/models/passengers-bookings.model';
import { Flight, FlightPrices } from 'src/app/flight/models/flight.models';
import { selectAdult, selectChild } from 'src/app/redux/selectors/booking.selectors';
import { selectForwardFlight, selectReturnFlight } from 'src/app/redux/selectors/flights.selectors';
import { selectCurrency } from 'src/app/redux/selectors/settings.selectors';
import { CurrencyValuePipe } from 'src/app/shared/pipes/currency-value.pipe';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { selectInfant } from '../../../redux/selectors/booking.selectors';
import { BOOKING_PRICE_CONFIG } from '../../constants/price.constant';
import { BookingFinishedComponent } from '../../components/booking-finished/booking-finished.component';

export type PassengerCategory = 'adult' | 'child' | 'infant';

export interface PriceCategory {
  fare: number;
  taxes: number;
  baggage: number;
}

export interface PriceByPassengerCategory {
  adult: PriceCategory;
  child: PriceCategory;
  infant: PriceCategory;
}

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
  providers: [CurrencyValuePipe],
})
export class SummaryPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  private adult$!: Observable<PassengerBooking[]>;

  adult!: PassengerBooking[];

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

  totalPriceByCat: PriceByPassengerCategory = {
    adult: { baggage: 0, fare: 0, taxes: 0 },
    child: { baggage: 0, fare: 0, taxes: 0 },
    infant: { baggage: 0, fare: 0, taxes: 0 },
  };

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

    this.adult$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: PassengerBooking[]) => {
        this.adult = res;
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

    combineLatest([this.adult$, this.child$, this.infant$]).pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: [PassengerBooking[], PassengerBooking[], PassengerBooking[]]) => {
      this.passengers = res.flat();
      this.setPriceForCategories();
    });

    combineLatest([this.forwardFlight$, this.returnFlight$]).pipe(
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

  private getPrice(prices: FlightPrices) {
    return this.currencyValuePipe.transform(prices, this.currency);
  }

  buyNow() {
    const finishOrderDialog = this.dialog.open(BookingFinishedComponent);

    finishOrderDialog.afterClosed().pipe(
      take(1),
    ).subscribe(() => {
      this.store$.dispatch(UserTripsActions.addOrderUserTrips());
      this.router.navigateByUrl('/');
    });
  }

  addToCart() {
    this.store$.dispatch(ShoppingCartActions.addOrderToCart());
    this.router.navigate(['booking', 'cart']);
  }

  getPriceWithCoefficient(coefficient: number = BOOKING_PRICE_CONFIG.ADULT): number {
    const price = this.forwardFlight !== null && this.returnFlight !== null
      ? this.getPrice(this.forwardFlight!.price)
          + this.getPrice(this.returnFlight!.price)
      : this.getPrice(this.forwardFlight!.price);
    return price * coefficient;
  }

  setPriceForCategories(): void {
    if (this.passengers.length) {
      const totalPrice = this.getPriceWithCoefficient(BOOKING_PRICE_CONFIG.TOTAL);
      const basicPrice = (totalPrice) / (this.adult.length * BOOKING_PRICE_CONFIG.ADULT
        + this.child.length * BOOKING_PRICE_CONFIG.CHILD + this.infant.length * BOOKING_PRICE_CONFIG.INFANT);

      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const key in this.totalPriceByCat) {
        const element = this.totalPriceByCat[key as keyof PriceByPassengerCategory];
        element.fare = basicPrice * this[key as keyof PriceByPassengerCategory].length * BOOKING_PRICE_CONFIG[key.toUpperCase() as keyof typeof BOOKING_PRICE_CONFIG] * (BOOKING_PRICE_CONFIG.TOTAL - BOOKING_PRICE_CONFIG.TAXES);
        element.taxes = basicPrice * this[key as keyof PriceByPassengerCategory].length * BOOKING_PRICE_CONFIG[key.toUpperCase() as keyof typeof BOOKING_PRICE_CONFIG] - element.fare;
        element.baggage = totalPrice * BOOKING_PRICE_CONFIG.BAGGAGE * this[key as keyof PriceByPassengerCategory].reduce(
          (sum, passenger) => sum + passenger.checkedBag,
          0,
        );
      }
    }
  }
}
