import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppState, FlightsState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { selectFlights } from 'src/app/redux/selectors/new-flights.selectors';
import { FlightsService } from '../../services/flights.service';
import { FlightNew } from '../../models/flight.models';

@Component({
  selector: 'app-carousel-holder',
  templateUrl: './carousel-holder.component.html',
  styleUrls: ['./carousel-holder.component.scss'],
})
export class CarouselHolderComponent {
  @Input() data!: FlightNew[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  flightData!: FlightsState;

  dataNew!: FlightNew[];

  constructor(
    private flightsService: FlightsService,
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store$.pipe(select(selectFlights)).subscribe((res) => {
      this.flightData = res;
      this.flightsService.searchFlights({
        fromKey: this.flightData.from?.IATA,
        toKey: this.flightData.to?.IATA,
        forwardDate: this.flightData.rangeTripDates
          ? this.flightData.rangeTripDates.start
          : this.flightData.startTripDate,
        backDate: this.flightData.rangeTripDates
          ? this.flightData.rangeTripDates.end
          : null,
      }).subscribe((ress) => {
        this.dataNew = ress;
      });
    });
  }
}
