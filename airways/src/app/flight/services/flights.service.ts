import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable, forkJoin,
} from 'rxjs';
import { FlightSearchState } from 'src/app/redux/state.models';
import { AirportAPIResponse, AvailableFlight, SearchFlightsAPIRequest } from '../models/flight.models';

// eslint-disable-next-line import/no-extraneous-dependencies

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private BASE_URL = 'https://api.air-ways.online';

  private BASE_URL_FAKE = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) { }

  public searchFlights(
    searchFlightsData: FlightSearchState,
  ): Observable<AvailableFlight[]> {
    const body: SearchFlightsAPIRequest = {
      fromKey: searchFlightsData.from?.IATA,
      toKey: searchFlightsData.to?.IATA,
      forwardDate: searchFlightsData.isRoundTrip
        ? searchFlightsData.rangeTripDates?.start
        : searchFlightsData.startTripDate,
      backDate: searchFlightsData.isRoundTrip
        ? searchFlightsData.rangeTripDates?.end
        : null,
    };
    return this.http.post<AvailableFlight[]>(`${this.BASE_URL}/search/flight`, body);
  }

  public searchAirport(q: string): Observable<AirportAPIResponse> {
    const options = { params: new HttpParams().set('q', q) };
    return this.http.get<AirportAPIResponse>(`${this.BASE_URL}/search/airport`, options);
  }

  public searchMultipleFlights(
    searchFlightsData: FlightSearchState,
    arr: string[],
  ): Observable<AvailableFlight[][]> {
    const arr$: Observable<AvailableFlight[]>[] = [];
    arr.forEach((item) => {
      arr$.push(this.searchFlights({ ...searchFlightsData, startTripDate: item, rangeTripDates: { start: item, end: '' } }));
    });

    return forkJoin(arr$);
  }

  resetFoundFlights() {
    return this.http.post(`${this.BASE_URL_FAKE}/merge`, {
      flights: [],
    });
  }

  saveFoundFlights(data: AvailableFlight[][]) {
    // return this.resetFoundFlights().pipe(
    //   concatMap(() => this.http.post<AvailableFlight[][]>(`${this.BASE_URL_FAKE}/flights`, data)),
    // );

    // return forkJoin([
    //   this.resetFoundFlights(),
    //   this.http.post<AvailableFlight[][]>(`${this.BASE_URL_FAKE}/flights`, data),
    // ]);
    return this.http.post<AvailableFlight[][]>(`${this.BASE_URL_FAKE}/flights`, data);
  }

  getChosenFlight(date: string): Observable<AvailableFlight> {
    return this.http.get<AvailableFlight>(`${this.BASE_URL_FAKE}/flights`, {
      params: {
        takeoffDate: date,
      },
    });
  }
}
