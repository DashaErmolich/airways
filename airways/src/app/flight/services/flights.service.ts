import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirportNew, FlightNew, SearchFlightsNew } from '../models/flight.models';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private BASE_URL = 'https://api.air-ways.online';

  constructor(
    private http: HttpClient,
  ) { }

  public searchFlights(searchFlightsData: SearchFlightsNew): Observable<FlightNew[]> {
    return this.http.post<FlightNew[]>(`${this.BASE_URL}/search/flight`, searchFlightsData);
  }

  public searchAirport(q: string): Observable<AirportNew> {
    const options = { params: new HttpParams().set('q', q) };
    return this.http.get<AirportNew>(`${this.BASE_URL}/search/airport`, options);
  }
}
