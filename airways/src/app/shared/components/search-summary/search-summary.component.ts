import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { selectTripSearchState, selectPassengersQty } from 'src/app/redux/selectors/trip-search.selectors';
import { AppState, TripSearchState } from 'src/app/redux/state.models';

import { MatIconService } from 'src/app/core/services/icon.service';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-search-summary',
  templateUrl: './search-summary.component.html',
  styleUrls: ['./search-summary.component.scss'],
})
export class FlightsSearchSummaryComponent implements OnInit {
  @Output() toggleSearchFormVisibilityEvent = new EventEmitter<boolean>();

  @Input() isSearchFormVisible?:boolean;

  searchData$!: Observable<TripSearchState>;

  passengersQty$!: Observable<number>;

  constructor(
    private store$: Store<AppState>,
    private matIconService: MatIconService,
    public layout: LayoutService,
  ) { }

  ngOnInit(): void {
    this.searchData$ = this.store$.pipe(select(selectTripSearchState));
    this.passengersQty$ = this.store$.pipe(select(selectPassengersQty));
  }

  toggleSearchFormVisibility(): void {
    this.toggleSearchFormVisibilityEvent.emit(!this.isSearchFormVisible);
  }
}
