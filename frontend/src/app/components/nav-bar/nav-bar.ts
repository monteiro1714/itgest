import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  ngAfterViewInit(): void {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.getAttribute('data-target');
        const $target = document.getElementById(target);

        el.classList.toggle('is-active');
        $target?.classList.toggle('is-active');
      });
    });
  }
}
