import { Component } from '@angular/core';
import { WeatherDisplayComponent } from "../../components/weather-display-component/weather-display-component";

@Component({
  selector: 'app-home-component',
  imports: [WeatherDisplayComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

}
