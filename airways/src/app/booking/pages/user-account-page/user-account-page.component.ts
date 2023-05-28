import { SelectionModel } from '@angular/cdk/collections';
import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  Observable, Subject, takeUntil,
} from 'rxjs';
import { Flight, FlightPrices, Passengers } from 'src/app/flight/models/flight.models';
import { selectCurrency } from 'src/app/redux/selectors/settings.selectors';
import { AppState, FlightsState, Order } from 'src/app/redux/state.models';
import { CurrencyValuePipe } from 'src/app/shared/pipes/currency-value.pipe';
import { selectUserTrips } from 'src/app/redux/selectors/user-trips.selectors';
import { PassengerBooking } from '../../models/passengers-bookings.model';
import { BOOKING_PRICE_CONFIG } from '../../constants/price.constant';

interface UserOrder {
  no: FlightsState;
  flight: FlightsState;
  trip: string;
  date: FlightsState;
  passengers: Passengers;
  price: number;
  id: number;
}

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
  providers: [CurrencyValuePipe],
})
export class UserAccountPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  private data: Order[] = [];

  orders: UserOrder[] = [];

  currency$!: Observable<string>;

  displayedColumns: string[] = ['no', 'flight', 'trip', 'date', 'passengers', 'price'];

  dataSource!: MatTableDataSource<UserOrder>;

  selection = new SelectionModel<UserOrder>(true, []);

  currency!: string;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private router: Router,
    private currencyValuePipe: CurrencyValuePipe,
  ) { }

  ngOnInit(): void {
    this.currency$ = this.store$.pipe(select(selectCurrency));

    this.currency$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: string) => {
      this.currency = res;
      this.orders = this.data.map((item, index) => ({
        no: item.flightsState,
        flight: item.flightsState,
        trip: item.tripSearchState.isOneWayTrip ? 'One way' : 'Round trip',
        date: item.flightsState,
        passengers: item.tripSearchState.passengers,
        price: this.getOrderPrice(item),
        id: index,
      }));

      this.dataSource = new MatTableDataSource<UserOrder>(this.orders);
    });

    this.store$.pipe(
      takeUntil(this.destroy$),
      select(selectUserTrips),
    ).subscribe((res: Order[]) => {
      this.data = res;
      this.orders = res.map((item, index) => ({
        no: item.flightsState,
        flight: item.flightsState,
        trip: item.tripSearchState.isOneWayTrip ? 'One way' : 'Round trip',
        date: item.flightsState,
        passengers: item.tripSearchState.passengers,
        price: this.getOrderPrice(item),
        id: index,
      }));

      this.dataSource = new MatTableDataSource<UserOrder>(this.orders);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  private getOrderPrice(order: Order) {
    const baggageQty = [...order.bookingState.adult, ...order.bookingState.child, ...order.bookingState.infant]
      .reduce((sum, item: PassengerBooking) => sum + item.checkedBag, 0);
    const price = [order.flightsState.forwardFlight, order.flightsState.returnFlight]
      .reduce((sum, item: Flight | null) => (item !== null ? sum + this.getPrice(item.price) : sum), 0);

    return price + price * baggageQty * BOOKING_PRICE_CONFIG.BAGGAGE;
  }

  private getPrice(prices: FlightPrices) {
    return this.currencyValuePipe.transform(prices, this.currency);
  }
}
