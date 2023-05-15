import { Component, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFlightSearchData, selectPassengersQty } from 'src/app/redux/selectors/flights.selectors';
import { AppState, TripSearchState } from 'src/app/redux/state.models';
import { MatIconService } from 'src/app/shared/services/icon.service';

@Component({
  selector: 'app-search-summary',
  templateUrl: './search-summary.component.html',
  styleUrls: ['./search-summary.scss'],
})
export class FlightsSearchSummaryComponent {
  @Output() toggleSearchFormVisibilityEvent = new EventEmitter<boolean>();

  searchData$: Observable<TripSearchState>;

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
