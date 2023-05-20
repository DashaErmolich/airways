import { Component, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFlightSearchData, selectPassengersQty } from 'src/app/redux/selectors/flights.selectors';
import { AppState, FlightSearchState } from 'src/app/redux/state.models';
import { MatIconService } from 'src/app/shared/services/icon.service';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
})
export class FlightInfoComponent {
  @Output() toggleSearchFormVisibilityEvent = new EventEmitter<boolean>();

  searchData$: Observable<FlightSearchState>;

  passengersQty$: Observable<number>;

  isSearchFormVisible = false;

  constructor(
    private store$: Store<AppState>,
    private matIconService: MatIconService,
  ) {
    this.searchData$ = this.store$.pipe(select(selectFlightSearchData));
    this.passengersQty$ = this.store$.pipe(select(selectPassengersQty));
  }

  toggleSearchFormVisibility(): void {
    this.isSearchFormVisible = !this.isSearchFormVisible;
    this.toggleSearchFormVisibilityEvent.emit(this.isSearchFormVisible);
  }
}
