import { Component, VERSION } from '@angular/core';
import { AppModule } from './app.module';
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CrmNavbarComponent } from './crm-navbar/crm-navbar.component';
import { CommonModule } from '@angular/common';
import { LoginHeaderComponent } from './login-header/login-header.component';

@Component({
  imports: [
    AppModule,
    RouterOutlet,
    CrmNavbarComponent,
    CommonModule,
    LoginHeaderComponent,
  ],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  showHeader: boolean = true;
  showHeaderlogin: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (
          val.url == '/' ||
          val.url == '/login' ||
          val.url == '/register' ||
          val.url == '/email-sent' ||
          val.url == '/pasword-email' ||
          val.url == '/new-password' ||
          val.url == '/password-change'
        ) {
          this.showHeader = false;
          this.showHeaderlogin = true;
          this.conditionRouter = false;
        } else {
          this.showHeader = true;
          this.showHeaderlogin = false;
          this.conditionRouter = true;
        }
      }
    });
  }

  conditionRouter: boolean = false;
}
