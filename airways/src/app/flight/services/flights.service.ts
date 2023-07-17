/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import {
  Observable, catchError, forkJoin, retry, throwError,
} from 'rxjs';

import { Airport, Flight, FlightSearchData } from 'src/app/flight/models/flight.models';
import { DatesService } from 'src/app/flight/services/dates.service';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private BASE_URL = 'https://airways-backend-ba6c.onrender.com';

  constructor(
    private http: HttpClient,
    private datesService: DatesService,
  ) { }

  public searchFlight(
    searchFlightsData: FlightSearchData,
  ): Observable<Flight[]> {
    return this.http.post<Flight[]>(`${this.BASE_URL}/search/flight`, searchFlightsData).pipe(catchError(this.handleError));
  }

  public searchAirport(q: string): Observable<Airport> {
    const options = { params: new HttpParams().set('q', q) };
    return this.http.get<Airport>(`${this.BASE_URL}/search/airport`, options).pipe(catchError(this.handleError));
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
    return forkJoin(flights$).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened. Please try again later.'));
  }
}
