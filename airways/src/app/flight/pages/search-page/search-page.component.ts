import { Component, OnInit } from '@angular/core';
import { StepsEnum } from 'src/app/core/constants/steps.enum';
import { AppState } from 'src/app/redux/state.models';
import { Store } from '@ngrx/store';
import * as BookingActions from '../../../redux/actions/booking.actions';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})

export class SearchPageComponent implements OnInit {
  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(BookingActions.setStep({ step: StepsEnum.First }));
  }
}
