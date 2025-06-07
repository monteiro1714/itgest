import { Component } from '@angular/core';
import { WeatherService } from '../../services/weatherService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ForecastResponse } from '../../interfaces/weatherInterface';


@Component({
  selector: 'app-weather-display-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './weather-display-component.html',
  styleUrl: './weather-display-component.css'
})
export class WeatherDisplayComponent implements OnInit {
   weatherData: (ForecastResponse & { conditionClass?: string }) | null = null;
  selectedCity: string = '';
  cityList: string[] = [];

  selectedDayIndex: number = 0; // índice do dia selecionado

  constructor(
    private weatherService: WeatherService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const city = params['city'] || 'Lisboa';
      this.selectedCity = city;

      this.fetchWeather(city);
    });
  }

  getWeather(): void {
    if(this.selectedCity.trim()) {
      this.router.navigate([], {
        queryParams: { city: this.selectedCity }
      });
      this.fetchWeather(this.selectedCity);
    }
  }

  private fetchWeather(city: string): void {
    this.weatherService.getForecast(city).subscribe({
      next: (data: ForecastResponse) => {
        // Quando chegar novos dados, resetar seleção para o primeiro dia
        this.selectedDayIndex = 0;

        // Atualiza classe conforme o primeiro dia
        const firstDayDescription = data.forecast.length > 0 ? data.forecast[0].description : '';
        const conditionClass = this.getConditionClass(firstDayDescription);

        this.weatherData = { ...data, conditionClass };
      },
      error: (error: any) => {
        console.error('Error fetching weather data:', error);
        this.weatherData = null;
      }
    });
  }

  selectDay(index: number): void {
    this.selectedDayIndex = index;

    if (this.weatherData && this.weatherData.forecast[index]) {
      const dayDesc = this.weatherData.forecast[index].description;
      this.weatherData.conditionClass = this.getConditionClass(dayDesc);
    }
  }

  private getConditionClass(description: string): string {
    description = description.toLowerCase();
    if (description.includes('sol') || description.includes('claro')) {
      return 'sunny';
    } else if (description.includes('chuva') || description.includes('rain')) {
      return 'rainy';
    } else if (description.includes('nublado') || description.includes('cloud')) {
      return 'cloudy';
    }
    return 'sunny';
  }
}