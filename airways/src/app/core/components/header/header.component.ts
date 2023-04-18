import { Component } from '@angular/core';
import { DateFormatEnum } from '../../constants/date-format.enum';
import { CurrenciesEnum } from '../../constants/currency.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public dateViews = Object.values(DateFormatEnum);

  public currencies = Object.values(CurrenciesEnum);

  public selectedDateView = DateFormatEnum.DD_MM_YYYY;

  public selectedCurrency = CurrenciesEnum.EUR;
}
