import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmNavbarComponent } from './crm-navbar.component';

describe('CrmNavbarComponent', () => {
  let component: CrmNavbarComponent;
  let fixture: ComponentFixture<CrmNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
