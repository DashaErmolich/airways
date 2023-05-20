import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { FlightRoutingModule } from './flight-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FlightSelectionComponent } from './components/flight-selection/flight-selection.component';
import { FlightAvailableSeatsDirective } from './directives/flight-available-seats.directive';
import { FlightsSearchSummaryComponent } from './components/search-summary/search-summary.component';
import { CurrencyValuePipe } from './pipes/currency-value.pipe';
import { FlightTimePipe } from './pipes/flight-time.pipe';
import { CalendarSliderComponent } from './components/calendar-slider/calendar-slider.component';
import { FlightDescriptionComponent } from './components/flight-description/flight-description.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SelectionPageComponent,
    SearchFormComponent,
    FlightSelectionComponent,
    FlightAvailableSeatsDirective,
    FlightsSearchSummaryComponent,
    CurrencyValuePipe,
    FlightTimePipe,
    CalendarSliderComponent,
    FlightDescriptionComponent,
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MomentDateModule,
  ],
})
export class FlightModule { }
