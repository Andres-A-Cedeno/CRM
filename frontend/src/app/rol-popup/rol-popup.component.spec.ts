import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPopupComponent } from './rol-popup.component';

describe('RolPopupComponent', () => {
  let component: RolPopupComponent;
  let fixture: ComponentFixture<RolPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
