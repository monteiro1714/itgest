import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [FormsModule, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  selectedCity = '';
  showSearchBar = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const city = params['city'] || '';
      this.showSearchBar = !!city; 
      this.selectedCity = city;
    });
  }

  onSearch() {
    if (this.selectedCity.trim()) {
      this.router.navigate([], {
        queryParams: { city: this.selectedCity }
      });
    }
  }
}
