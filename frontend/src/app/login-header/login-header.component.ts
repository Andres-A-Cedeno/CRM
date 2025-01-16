import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-login-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './login-header.component.html',
  styleUrl: './login-header.component.css',
})
export class LoginHeaderComponent implements OnInit {
  isToggleVisible: boolean = true;

  name = '';
  @Output() burgerMenuClick = new EventEmitter<boolean>();

  constructor(private readonly router: Router) {
    router.events.subscribe((val) => {
      //this.name = sessionStorage.getItem('userDetail');
      if (val instanceof NavigationEnd) {
        if (val.url == '/home') {
          this.isToggleVisible = false;
        } else {
          this.isToggleVisible = true;
        }
      }
    });
  }

  ngOnInit(): void {}

  home() {}

  onExpandBar() {
    console.log('Button Clicked');
    this.burgerMenuClick.emit(true);
  }
}
