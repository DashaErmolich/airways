/* eslint-disable no-unsafe-optional-chaining */
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/redux/state.models';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { selectForwardFlight, selectReturnFlight } from 'src/app/redux/selectors/flights.selectors';
import { Flight, FlightPrices } from 'src/app/flight/models/flight.models';
import { selectPassengersInfo } from 'src/app/redux/selectors/booking.selectors';
import { BookingPassenger, BookingPassengersInfo } from 'src/app/flight/models/passengers.models';
import { Observable } from 'rxjs';
import { selectCurrency } from 'src/app/redux/selectors/settings.selectors';
import { selectIsOneWayTrip } from 'src/app/redux/selectors/trip-search.selectors';
import {
  CHILD_FEE, FARE_CHARGE, INFANT_FEE, TAX_CHARGE,
} from 'src/app/shared/constants/price-taxs-and-discounts';
import { PricesDetails } from 'src/app/flight/models/price.models';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  adults!: number;

  child!: number;

  infants!:number;

  forwardFlight!:Flight | null;

  returnFlight!: Flight | null;

  isOneWay!: boolean;

  passengers!: BookingPassengersInfo | null;

  passengersArray!: BookingPassenger[];

  currency$!: Observable<string>;

  initialPrice!: FlightPrices;

  totalPrice!: FlightPrices;

  pricesDetails!: PricesDetails;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private store$: Store<AppState>,
  ) {
    this.matIconRegistry.addSvgIcon(
      'summary-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/summary-logo.svg'),
    );
  }

  ngOnInit(): void {
    this.store$.pipe(select(selectForwardFlight)).subscribe((flight) => {
      this.forwardFlight = flight;
    });
    this.store$.pipe(select(selectReturnFlight)).subscribe((flight) => {
      this.returnFlight = flight;
    });
    this.store$.pipe(select(selectPassengersInfo)).subscribe((passengers) => {
      this.passengers = passengers;
    });
    this.store$.pipe(select(selectIsOneWayTrip)).subscribe((isOneWay) => {
      this.isOneWay = isOneWay;
    });
    this.currency$ = this.store$.pipe(select(selectCurrency));

    this.passengersArray = this.passengers?.adult.concat(this.passengers.child, this.passengers.infant) as BookingPassenger[];

    this.adults = this.passengers?.adult.length!;
    this.child = this.passengers?.child.length!;
    this.infants = this.passengers?.infant.length!;

    this.pricesDetails = {
      adultsPrice: {eur: 0, usd: 0, rub: 0, pln: 0},
      adultsFare: {eur: 0, usd: 0, rub: 0, pln: 0},
      adultsTax: {eur: 0, usd: 0, rub: 0, pln: 0},
      childPrice: {eur: 0, usd: 0, rub: 0, pln: 0},
      childFare: {eur: 0, usd: 0, rub: 0, pln: 0},
      childTax: {eur: 0, usd: 0, rub: 0, pln: 0},
      infantPrice: {eur: 0, usd: 0, rub: 0, pln: 0},
      infantFare: {eur: 0, usd: 0, rub: 0, pln: 0},
      infantTax: {eur: 0, usd: 0, rub: 0, pln: 0},
    };
    this.getPrices();
  }

  private getPrices() {
    this.initialPrice = this.isOneWay
      ? this.forwardFlight?.price!
      : {
        eur: this.forwardFlight?.price.eur! + this.returnFlight?.price.eur!,
        usd: this.forwardFlight?.price.usd! + this.returnFlight?.price.usd!,
        rub: this.forwardFlight?.price.rub! + this.returnFlight?.price.rub!,
        pln: this.forwardFlight?.price.pln! + this.returnFlight?.price.pln!,
      };
    this.pricesDetails.adultsPrice = {
      eur: this.initialPrice.eur * this.adults,
      usd: this.initialPrice.usd * this.adults,
      rub: this.initialPrice.rub * this.adults,
      pln: this.initialPrice.pln * this.adults,
    };
    this.pricesDetails.adultsFare = {
      eur: this.pricesDetails.adultsPrice.eur * FARE_CHARGE,
      usd: this.pricesDetails.adultsPrice.usd * FARE_CHARGE,
      rub: this.pricesDetails.adultsPrice.rub * FARE_CHARGE,
      pln: this.pricesDetails.adultsPrice.pln * FARE_CHARGE,
    };
    this.pricesDetails.adultsTax = {
      eur: this.pricesDetails.adultsPrice.eur * TAX_CHARGE,
      usd: this.pricesDetails.adultsPrice.usd * TAX_CHARGE,
      rub: this.pricesDetails.adultsPrice.rub * TAX_CHARGE,
      pln: this.pricesDetails.adultsPrice.pln * TAX_CHARGE,
    };

    this.pricesDetails.childPrice = {
      eur: this.initialPrice.eur * this.child * CHILD_FEE,
      usd: this.initialPrice.usd * this.child * CHILD_FEE,
      rub: this.initialPrice.rub * this.child * CHILD_FEE,
      pln: this.initialPrice.pln * this.child * CHILD_FEE,
    };
    this.pricesDetails.childFare = {
      eur: this.pricesDetails.childPrice.eur * FARE_CHARGE,
      usd: this.pricesDetails.childPrice.usd * FARE_CHARGE,
      rub: this.pricesDetails.childPrice.rub * FARE_CHARGE,
      pln: this.pricesDetails.childPrice.pln * FARE_CHARGE,
    };
    this.pricesDetails.childTax = {
      eur: this.pricesDetails.childPrice.eur * TAX_CHARGE,
      usd: this.pricesDetails.childPrice.usd * TAX_CHARGE,
      rub: this.pricesDetails.childPrice.rub * TAX_CHARGE,
      pln: this.pricesDetails.childPrice.pln * TAX_CHARGE,
    };

    this.pricesDetails.infantPrice = {
      eur: this.initialPrice.eur * this.infants * INFANT_FEE,
      usd: this.initialPrice.usd * this.infants * INFANT_FEE,
      rub: this.initialPrice.rub * this.infants * INFANT_FEE,
      pln: this.initialPrice.pln * this.infants * INFANT_FEE,
    };
    this.pricesDetails.infantFare = {
      eur: this.pricesDetails.infantPrice.eur * FARE_CHARGE,
      usd: this.pricesDetails.infantPrice.usd * FARE_CHARGE,
      rub: this.pricesDetails.infantPrice.rub * FARE_CHARGE,
      pln: this.pricesDetails.infantPrice.pln * FARE_CHARGE,
    };
    this.pricesDetails.infantTax = {
      eur: this.pricesDetails.infantPrice.eur * TAX_CHARGE,
      usd: this.pricesDetails.infantPrice.usd * TAX_CHARGE,
      rub: this.pricesDetails.infantPrice.rub * TAX_CHARGE,
      pln: this.pricesDetails.infantPrice.pln * TAX_CHARGE,
    };

    this.totalPrice = {
      eur: this.pricesDetails.adultsPrice.eur + this.pricesDetails.childPrice.eur + this.pricesDetails.infantPrice.eur,
      usd: this.pricesDetails.adultsPrice.usd + this.pricesDetails.childPrice.usd + this.pricesDetails.infantPrice.usd,
      rub: this.pricesDetails.adultsPrice.rub + this.pricesDetails.childPrice.rub + this.pricesDetails.infantPrice.rub,
      pln: this.pricesDetails.adultsPrice.pln + this.pricesDetails.childPrice.pln + this.pricesDetails.infantPrice.pln,
    };
  }
}
