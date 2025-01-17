import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RolPopupService } from './rol-popup.service';

@Component({
  selector: 'app-rol-popup',
  imports: [MatDialogModule],
  templateUrl: './rol-popup.component.html',
  styleUrl: './rol-popup.component.css',
})
export class RolPopupComponent {
  constructor(private popupService: RolPopupService) {}
  closeDialog() {
    this.popupService.closePopup();
  }
}
