import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SelectionPageComponent,
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
  ],
})
export class FlightModule { }
