import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllSearchParams } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
})
export class SelectionPageComponent implements OnInit {
  constructor(public store$: Store) {}

  ngOnInit(): void {
    this.store$.pipe(select(selectAllSearchParams));
  }
}
