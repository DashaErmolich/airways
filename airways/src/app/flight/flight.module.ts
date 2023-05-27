import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FlightSelectionComponent } from './components/flight-selection/flight-selection.component';
import { FlightAvailableSeatsDirective } from './directives/flight-available-seats.directive';
import { FlightTimePipe } from './pipes/flight-time.pipe';
import { CalendarSliderComponent } from './components/calendar-slider/calendar-slider.component';
import { FlightDescriptionComponent } from './components/flight-description/flight-description.component';
import { SharedModule } from '../shared/shared.module';
import { ConnectedFlightDescriptionComponent } from './components/connected-flight-description/connected-flight-description.component';
import { ConnectedFlightComponent } from './components/connected-flight/connected-flight.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SelectionPageComponent,
    SearchFormComponent,
    FlightSelectionComponent,
    FlightAvailableSeatsDirective,
    FlightTimePipe,
    CalendarSliderComponent,
    FlightDescriptionComponent,
    ConnectedFlightDescriptionComponent,
    ConnectedFlightComponent,
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    SharedModule,
  ],
})
export class FlightModule { }
