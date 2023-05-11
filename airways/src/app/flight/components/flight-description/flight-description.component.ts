import {
  Component, Input,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDateFormat, selectCurrency } from 'src/app/redux/selectors/auth.selectors';
import { AppState } from 'src/app/redux/state.models';
import { MatIconService } from 'src/app/shared/services/icon.service';
import { Flight } from '../../models/flight.models';
import { CalendarSliderService } from '../../services/calendar-slider.service';
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-flight-description',
  templateUrl: './flight-description.component.html',
  styleUrls: ['./flight-description.component.scss'],
})
export class FlightDescriptionComponent {
  @Input() responseIndex!: number;

  @Input() flight!: Flight;

  dateFormat$: Observable<string>;

  currency$: Observable<string>;

  constructor(
    private store$: Store<AppState>,
    private sliderService: CalendarSliderService,
    private matIconService: MatIconService,
    private datesService: DatesService,
  ) {
    this.dateFormat$ = this.store$.pipe(select(selectDateFormat));
    this.currency$ = this.store$.pipe(select(selectCurrency));
  }

  isValidDate(date: string) {
    return this.datesService.isValidDate(date);
  }
}
