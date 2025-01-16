import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.services';
import { MatIcon } from '@angular/material/icon';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-home',
  imports: [MatIcon, CdkAccordionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  items = ['Jessica Espejo', 'David Avila', 'Luis Fernando'];
  expandedIndex = 0;

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
