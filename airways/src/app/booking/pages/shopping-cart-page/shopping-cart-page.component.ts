import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  Observable, Subject, take, takeUntil,
} from 'rxjs';
import { FlightPrices, Passengers } from 'src/app/flight/models/flight.models';
import { selectCurrency } from 'src/app/redux/selectors/settings.selectors';
import { selectCartOrders } from 'src/app/redux/selectors/shopping-cart.selectors';
import { AppState, FlightsState, Order } from 'src/app/redux/state.models';
import * as ShoppingCartActions from 'src/app/redux/actions/shopping-cart.actions';
import { BookingFinishedComponent } from '../../components/booking-finished/booking-finished.component';

interface CartOrder {
  no: FlightsState;
  flight: FlightsState;
  trip: string;
  date: FlightsState;
  passengers: Passengers;
  price: FlightPrices;
  id: number;
}

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  private cartData: Order[] = [];

  orders: CartOrder[] = [];

  currency$!: Observable<string>;

  displayedColumns: string[] = ['select', 'no', 'flight', 'trip', 'date', 'passengers', 'price'];

  dataSource!: MatTableDataSource<CartOrder>;

  selection = new SelectionModel<CartOrder>(true, []);

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currency$ = this.store$.pipe(select(selectCurrency));

    this.store$.pipe(
      takeUntil(this.destroy$),
      select(selectCartOrders),
    ).subscribe((res: Order[]) => {
      this.cartData = res;
      this.orders = res.map((item, index) => ({
        no: item.flightsState,
        flight: item.flightsState,
        trip: item.tripSearchState.isOneWayTrip ? 'One way' : 'Round trip',
        date: item.flightsState,
        passengers: item.tripSearchState.passengers,
        price: item.flightsState.forwardFlight!.price,
        id: index,
      }));

      this.dataSource = new MatTableDataSource<CartOrder>(this.orders);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CartOrder): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  getSelectedItemsIds() {
    return this.selection.selected.map((item) => item.id);
  }

  buyProductsFromCart() {
    const finishOrderDialog = this.dialog.open(BookingFinishedComponent);

    finishOrderDialog.afterClosed().pipe(
      take(1),
    ).subscribe(() => {
      this.store$.dispatch(ShoppingCartActions.buyProductsFromCart({ productsIds: this.getSelectedItemsIds() }));
      this.router.navigateByUrl('/booking/user');
    });
  }
}
