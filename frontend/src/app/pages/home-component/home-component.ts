import { Component } from '@angular/core';
import { WeatherDisplayComponent } from "../../components/weather-display-component/weather-display-component";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-home-component',
  imports: [WeatherDisplayComponent, NavBar, Footer],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

}
