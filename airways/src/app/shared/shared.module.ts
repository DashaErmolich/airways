import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { MatBadgeModule } from '@angular/material/badge';

import { ReactiveFormsModule } from '@angular/forms';
import { FlightsSearchSummaryComponent } from './components/search-summary/search-summary.component';

import { CurrencyValuePipe } from './pipes/currency-value.pipe';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';

@NgModule({
  declarations: [
    FlightsSearchSummaryComponent,
    CurrencyValuePipe,
    GoBackButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    FlightsSearchSummaryComponent,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    HttpClientModule,
    LayoutModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MomentDateModule,
    MatMomentDateModule,
    MatBadgeModule,
    CurrencyValuePipe,
    GoBackButtonComponent,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true,
        closeOnNavigation: true,
      },
    },
  ],
})
export class SharedModule { }
