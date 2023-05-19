import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';

import { Airport, Flight, FlightSearchData } from 'src/app/flight/models/flight.models';
import { DatesService } from 'src/app/flight/services/dates.service';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  // private BASE_URL = 'https://api.air-ways.online';
  private BASE_URL = 'http://localhost:3001';

  constructor(
    private http: HttpClient,
    private datesService: DatesService,
  ) { }

  public searchFlight(
    searchFlightsData: FlightSearchData,
  ): Observable<Flight[]> {
    return this.http.post<Flight[]>(`${this.BASE_URL}/search/flight`, searchFlightsData);
  }

  public searchAirport(q: string): Observable<Airport> {
    const options = { params: new HttpParams().set('q', q) };
    return this.http.get<Airport>(`${this.BASE_URL}/search/airport`, options);
  }

  public searchMultipleFlights(
    flightSearchData: FlightSearchData,
    date: string,
  ): Observable<Flight[][]> {
    const flights$: Observable<Flight[]>[] = [];
    const dates: string[] = this.datesService.getDatesArr(date);

    dates.forEach((item) => {
      flights$.push(
        this.searchFlight({ ...flightSearchData, forwardDate: item }),
      );
    });
    return forkJoin(flights$);
  }
}
