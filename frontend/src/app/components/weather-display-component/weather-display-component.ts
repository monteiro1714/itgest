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

  constructor(
    private weatherService: WeatherService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  weatherData: (ForecastResponse & { conditionClass?: string }) | null = null;
  selectedCity: string = '';
  showSearchBar: boolean = true; 
  errorMessage: string = ''; // Mensagem de erro para exibir se a cidade não for encontrada


  selectedDayIndex: number = 0; // índice do dia selecionado

  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const city = params['city'] || '';
      this.selectedCity = city;
      if (city) {
        this.fetchWeather(city);
        this.showSearchBar = false; 
      } else {
        this.weatherData = null; // Reseta os dados se não houver cidade selecionada
      }
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
    this.errorMessage = ''; // Reseta mensagem de erro
    this.weatherService.getForecast(city).subscribe({
      next: (data: ForecastResponse) => {
        // Verifica se a cidade foi identificada
        if (!data || !data.forecast || data.forecast.length === 0) {
          this.weatherData = null; // Reseta os dados se não houver previsão
          this.errorMessage = 'Cidade/País não encontrado. Por favor, tente novamente.';
          return;
        }
        // Quando chegar novos dados, resetar seleção para o primeiro dia
        this.selectedDayIndex = 0;

        // Atualiza classe conforme o primeiro dia
        const firstDayDescription = data.forecast.length > 0 ? data.forecast[0].description : '';
        const conditionClass = this.getConditionClass(firstDayDescription);
        this.weatherData = { ...data, conditionClass };
        this.errorMessage = ''; // Reseta mensagem de erro
      },
      error: (error: any) => {
        console.error('Error fetching weather data:', error);
        this.weatherData = null;
        this.errorMessage = 'Não foi possível obter dados. Por favor, insira uma cidade válida.';
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
    if (description.includes('sol') || description.includes('claro')) {
      return 'sunny';
    } else if (description.includes('chuva') || description.includes('rain')) {
      return 'rainy';
    } else if (description.includes('nublado') || description.includes('cloud')) {
      return 'cloudy';
    }
    return 'sunny';
  }

 

getBarWidth(temp: number): string {
  const min = -10;
  const max = 45;
  const percent = Math.max(0, Math.min(100, ((temp - min) / (max - min)) * 100));
  return `${percent}%`;
}

getBarColor(temp: number): string {
  if (temp <= 0) return '#00bfff';       // Azul claro
  if (temp <= 15) return '#40e0d0';      // Turquesa
  if (temp <= 25) return '#f9d423';      // Amarelo
  if (temp <= 35) return '#fc913a';      // Laranja
  return '#ff4e50';                      // Vermelho
}
}