import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectFlightsByDay } from 'src/app/redux/selectors/app.selectors';
import { Subscription } from 'rxjs';
import { FoundFlightsWithDate } from '../../models/flight.models';

@Component({
  selector: 'app-active-flights',
  templateUrl: './active-flights.component.html',
  styleUrls: ['./active-flights.component.scss'],
})
export class ActiveFlightsComponent implements OnInit, OnDestroy {
  activeDay!: string | null;

  flightsByActiveDay!: FoundFlightsWithDate | undefined;

  state$ = new Subscription();

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.state$ = this.store$
      .pipe(select(selectFlightsByDay))
      .subscribe((res) => { this.flightsByActiveDay = res; });
  }

  ngOnDestroy(): void {
    this.state$.unsubscribe();
  }
}
