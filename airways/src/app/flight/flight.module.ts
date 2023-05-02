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
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlightRoutingModule } from './flight-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ActiveFlightsComponent } from './components/active-flights/active-flights.component';
import { FlightSelectionComponent } from './components/flight-selection/flight-selection.component';
import { CarouselHolderComponent } from './components/calendar-carousel/carousel-holder.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SelectionPageComponent,
    SearchFormComponent,
    ActiveFlightsComponent,
    FlightSelectionComponent,
    CarouselHolderComponent,
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
    CarouselModule,
    // StoreModule.forFeature('new-flights', flightsReducers),
    // EffectsModule.forFeature([AuthEffects]),
  ],
})
export class FlightModule { }
