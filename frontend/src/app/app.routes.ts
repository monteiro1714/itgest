import { Routes,  } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { AboutUsComponent } from './pages/about-us-component/about-us-component';



export const routes: Routes = [
    {path: '', title:"MeteoGo", component: HomeComponent},
    {path:'about-us', title:"Sobre Nós", component: AboutUsComponent},

];
