import { Component } from '@angular/core';
import { WeatherService } from '../../services/weatherService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { ForecastResponse } from '../../interfaces/weatherInterface';


@Component({
  selector: 'app-weather-display-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './weather-display-component.html',
  styleUrl: './weather-display-component.css'
})
export class WeatherDisplayComponent implements OnInit {
  constructor(private weatherService: WeatherService, private route: ActivatedRoute) { }
  weatherData: ForecastResponse | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const city = params['city'] || 'Lisboa'; // Default to London if no city is provided
      this.weatherService.getForecast(city).subscribe({
        next: (data: ForecastResponse) => {
          this.weatherData = data;
        },
        error: (error) => {
          console.error('Error fetching weather data:', error);
          this.weatherData = null; // Reset weather data on error
        }
      });
    });
  }
}
