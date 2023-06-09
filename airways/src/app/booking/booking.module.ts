import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { SharedModule } from '../shared/shared.module';
import { PassengersFormComponent } from './components/passengers-form/passengers-form.component';
import { BookingFinishedComponent } from './components/booking-finished/booking-finished.component';
import { TotalPricePipe } from './pipes/total-price.pipe';

@NgModule({
  declarations: [
    BookingPageComponent,
    SummaryPageComponent,
    ShoppingCartPageComponent,
    UserAccountPageComponent,
    PassengersFormComponent,
    BookingFinishedComponent,
    TotalPricePipe,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
  ],
})
export class BookingModule { }
