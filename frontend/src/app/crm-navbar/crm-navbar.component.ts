import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

type Route =
  | 'home'
  | 'calendar'
  | 'contacts'
  | 'accounts'
  | 'contracts'
  | 'board';

@Component({
  selector: 'app-crm-navbar',
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './crm-navbar.component.html',
  styleUrl: './crm-navbar.component.css',
})
export class CrmNavbarComponent implements OnInit {
  isToggleVisible: boolean = true;
  name = '';
  activeStates: Record<Route, boolean> = {
    home: true,
    calendar: false,
    contacts: false,
    accounts: false,
    contracts: false,
    board: false,
  };
  @Output() burgerMenuClick = new EventEmitter<boolean>();
  constructor(private readonly router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (
          val.url == '/home' ||
          val.url == '/calendar' ||
          val.url == '/contacts' ||
          val.url == '/accounts' ||
          val.url == '/contracts' ||
          val.url == '/board'
        ) {
          this.isToggleVisible = false;
        } else {
          this.isToggleVisible = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveState(event.url);
      }
    });
  }

  // Función para actualizar el estado de las rutas
  private updateActiveState(url: string): void {
    // Restablecer todos los estados a falso
    Object.keys(this.activeStates).forEach((key: string) => {
      // Convertimos 'key' a tipo 'Route'
      const routeKey = key as Route;
      this.activeStates[routeKey] = false;
    });

    // Activar el estado correspondiente según la URL
    const route = url.substring(1) as Route; // Quitar el '/' al inicio
    if (this.activeStates.hasOwnProperty(route)) {
      this.activeStates[route] = true;
    }
  }

  home() {}

  onExpandBar() {
    console.log('Button Clicked');
    this.burgerMenuClick.emit(true);
  }
}
