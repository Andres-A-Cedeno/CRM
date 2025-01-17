import { TestBed } from '@angular/core/testing';

import { RolPopupService } from './rol-popup.service';

describe('RolPopupService', () => {
  let service: RolPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
