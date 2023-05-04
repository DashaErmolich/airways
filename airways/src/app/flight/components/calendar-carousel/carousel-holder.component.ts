/* eslint-disable no-plusplus */
/* eslint-disable no-debugger */
import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppState, FlightsState } from 'src/app/redux/state.models';
import { Store, select } from '@ngrx/store';
import { selectFlights } from 'src/app/redux/selectors/new-flights.selectors';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
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
    loop: false,
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

  datesArr!: (string | null | undefined)[];

  constructor(
    private flightsService: FlightsService,
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store$.pipe(select(selectFlights)).subscribe((res) => {
      this.flightData = res;

      this.datesArr = this.getDatesArr(this.flightData.startTripDate);
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
        console.log(ress);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getDate() {
    return new Date();
  }

  // eslint-disable-next-line class-methods-use-this
  getDatesArr(chosenDate: string | null | undefined) {
    const result: string[] = [];
    if (typeof chosenDate === 'string') {
      // let date = moment(chosenDate).subtract(2, 'days').toISOString();
      const date = moment(chosenDate);
      const today = moment();

      let startDate = today.toISOString();

      if (date.diff(today) <= 2) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        startDate = moment(chosenDate).subtract(2, 'days').toISOString();
      }

      for (let i = 0; i < 1000; i++) {
        if (i === 0) {
          result.push(startDate);
        } else {
          startDate = moment(startDate).add(1, 'days').toISOString();
          result.push(startDate);
        }
      }
    }
    return result;
  }
}
