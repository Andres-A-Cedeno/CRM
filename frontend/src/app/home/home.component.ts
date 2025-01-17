import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.services';
import { MatIcon } from '@angular/material/icon';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RolPopupService } from '../rol-popup/rol-popup.service';

@Component({
  selector: 'app-home',
  imports: [MatIcon, CdkAccordionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  items = [
    ['Jessica Espejo', 'KAM'],
    ['David Avila', 'DEV'],
    ['Luis Fernando', 'CAS'],
  ];
  expandedIndex = 0;

  constructor(
    public userService: UsersService,
    private popupService: RolPopupService
  ) {}
  ngOnInit() {
    this.getUserLogged();
  }
  getUserLogged() {
    console.log(this.userService.getToken());
    this.userService.getUser().subscribe((result) => {
      console.log(result);
    });
  }
  openPopup() {
    this.popupService.openPopup();
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
  }
}
