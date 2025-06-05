import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastResponse } from '../interfaces/weatherInterface';
import { environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.apiUrl + '/weather';

  constructor(private http: HttpClient) { }

  getForecast(city: string): Observable<ForecastResponse> {
    return this.http.get<ForecastResponse>(`${this.apiUrl}/${city}`);
  }
}
