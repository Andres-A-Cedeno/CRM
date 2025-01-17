import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolPopupComponent } from './rol-popup.component';

@Injectable({
  providedIn: 'root',
})
export class RolPopupService {
  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(RolPopupComponent);
  }
  closePopup() {
    this.dialog.closeAll();
  }
}
