import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';

@NgModule({
  declarations: [
    BookingPageComponent,
    SummaryPageComponent,
    ShoppingCartPageComponent,
    UserAccountPageComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
  ],
})
export class BookingModule { }
