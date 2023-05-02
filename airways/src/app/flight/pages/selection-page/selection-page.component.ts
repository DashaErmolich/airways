/* eslint-disable max-len */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFlights } from 'src/app/redux/selectors/new-flights.selectors';
import { AppState, FlightsState } from 'src/app/redux/state.models';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit {
  isSearchFormVisible = false;

  data$!: Observable<FlightsState>;

  data!: FlightsState;

  constructor(
    private store$: Store<AppState>,
    private location: Location,
  ) {
    this.data$ = this.store$.pipe(select(selectFlights));
  }

  ngOnInit(): void {
    this.store$.pipe(select(selectFlights)).subscribe((res) => {
      this.data = res;
    });
  }

  toggleSearchFormVisibility(): void {
    this.isSearchFormVisible = !this.isSearchFormVisible;
  }

  getPassengersQty() {
    return this.data.passengers
      ? this.data.passengers.adult + this.data.passengers.child + this.data.passengers.infant
      : '';
  }

  goBack(): void {
    this.location.back();
  }
}
