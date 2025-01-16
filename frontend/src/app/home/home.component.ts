import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.services';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(public userService: UsersService) {}
  ngOnInit() {
    this.getUserLogged();
  }
  getUserLogged() {
    console.log(this.userService.getToken());
    this.userService.getUser().subscribe((result) => {
      console.log(result);
    });
  }
}
