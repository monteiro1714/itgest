import { Component } from '@angular/core';
import { ForecastResponse } from '../../interfaces/weatherInterface';
import { WeatherService } from '../../services/weatherService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-weather-display-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './weather-display-component.html',
  styleUrl: './weather-display-component.css'
})
export class WeatherDisplayComponent {
  
  
}
