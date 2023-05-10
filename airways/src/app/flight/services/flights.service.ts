import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FlightSearchState } from 'src/app/redux/state.models';
import { Airport, Flight, FlightSearchData } from '../models/flight.models';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private BASE_URL = 'https://api.air-ways.online';

  // private BASE_URL = 'http://localhost:3001';

  constructor(
    private http: HttpClient,
  ) { }

  public searchFlights(
    searchFlightsData: FlightSearchState,
  ): Observable<Flight[]> {
    const body: FlightSearchData = {
      fromKey: searchFlightsData.from?.key,
      toKey: searchFlightsData.to?.key,
      forwardDate: searchFlightsData.isRoundTrip
        ? searchFlightsData.rangeTripDates?.start
        : searchFlightsData.startTripDate,
      backDate: searchFlightsData.isRoundTrip
        ? searchFlightsData.rangeTripDates?.end
        : null,
    };
    return this.http.post<Flight[]>(`${this.BASE_URL}/search/flight`, body);
  }

  public searchAirport(q: string): Observable<Airport> {
    const options = { params: new HttpParams().set('q', q) };
    return this.http.get<Airport>(`${this.BASE_URL}/search/airport`, options);
  }

  public searchMultipleFlights(
    searchFlightsData: FlightSearchState,
    flights: string[],
  ): Observable<Flight[][]> {
    const flights$: Observable<Flight[]>[] = [];
    flights.forEach((item) => {
      flights$.push(this.searchFlights({ ...searchFlightsData, startTripDate: item, rangeTripDates: { start: item, end: '' } }));
    });
    return forkJoin(flights$);
  }
}
