import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { UsersService } from '../users/users.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatIcon, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

//
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(public UserService: UsersService, public router: Router) {}
  login() {
    const user = { email: this.email, password: this.password };
    this.UserService.login(user).subscribe((data: any) => {
      this.UserService.setToken(data.token);
      this.router.navigateByUrl('/home');
    });
  }
}
