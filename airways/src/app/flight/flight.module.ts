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
import { FlightRoutingModule } from './flight-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { DateListComponent } from './components/date-list/date-list.component';
import { DirectionComponent } from './components/direction/direction.component';
import { ActiveFlightsComponent } from './components/active-flights/active-flights.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SelectionPageComponent,
    SearchFormComponent,
    DateListComponent,
    DirectionComponent,
    ActiveFlightsComponent,
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
  ],
})
export class FlightModule { }
