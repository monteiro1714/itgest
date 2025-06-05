import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastResponse } from '../interfaces/weatherInterface';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:3000/api/weather';

  constructor(private http: HttpClient) { }

  getForecast(city: string): Observable<ForecastResponse> {
    return this.http.get<ForecastResponse>(`${this.apiUrl}?city=${city}`);
  }
}
