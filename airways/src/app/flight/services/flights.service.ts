import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightSearchState } from 'src/app/redux/state.models';
import { AirportAPIResponse, AvailableFlight, SearchFlightsAPIRequest } from '../models/flight.models';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private BASE_URL = 'https://api.air-ways.online';

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
}
