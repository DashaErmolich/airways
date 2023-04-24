import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllSearchParams } from 'src/app/redux/selectors/app.selectors';
import { SearchParams } from '../../models/flight.models';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit {
  searchParams!: SearchParams;

  constructor(public store$: Store) {}

  ngOnInit(): void {
    this.store$.pipe(select(selectAllSearchParams))
      .subscribe((res) => { this.searchParams = res; });
  }
}
