import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { UsersService } from '../users/users.services';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-register-step2',
  imports: [MatIcon, CommonModule, FormsModule],
  templateUrl: './register-step2.component.html',
  styleUrl: './register-step2.component.css',
})
export class RegisterStep2Component {
  options: string[] = ['KAM', 'Admin', 'Software', 'CAS'];
  selectedOption: string = '';

  @Input() username: string | undefined;
  @Input() email: string | undefined;
  @Input() password: string | undefined;

  name: string | undefined;
  lastname: string | undefined;
  ci: string | undefined;

  constructor(public userService: UsersService, public router: Router) {}
  register() {
    const user = {
      cedula: this.ci,
      nombre: this.name,
      apellido: this.lastname,
      nickname: this.username,
      correo: this.email,
      contrasena: this.password,
      dep_id: 1,
    };
    this.userService.register(user).subscribe((data) => {
      this.userService.setToken(data.token);
      this.router.navigateByUrl('/');
      console.log(data);
    });
  }
}
