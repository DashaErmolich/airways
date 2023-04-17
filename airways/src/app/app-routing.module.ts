import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'flight',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthPageComponent,
  },
  {
    path: 'flight',
    loadChildren: () => import('./flight/flight.module').then((m) => m.FlightModule),
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
