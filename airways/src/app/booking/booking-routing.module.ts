import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { BookingGuard } from '../core/guards/booking.guard';
import { BookingSummaryGuard } from '../core/guards/booking-summary.guard';

const routes: Routes = [
  {
    path: '',
    component: BookingPageComponent,
    canActivate: [
      BookingGuard,
    ],
  },
  {
    path: 'summary',
    component: SummaryPageComponent,
    canActivate: [
      BookingSummaryGuard,
    ],
  },
  {
    path: 'cart',
    component: ShoppingCartPageComponent,
  },
  {
    path: 'user',
    component: UserAccountPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule { }
