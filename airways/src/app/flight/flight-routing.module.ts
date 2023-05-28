import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';
import { FlightsSelectionGuard } from '../core/guards/flights-selection.guard';

const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
  {
    path: 'selection',
    component: SelectionPageComponent,
    canActivate: [
      FlightsSelectionGuard,
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class FlightRoutingModule { }
