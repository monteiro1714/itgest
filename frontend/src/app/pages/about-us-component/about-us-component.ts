import { Component } from '@angular/core';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-about-us-component',
  imports: [NavBar, Footer],
  templateUrl: './about-us-component.html',
  styleUrl: './about-us-component.css'
})
export class AboutUsComponent {

}
