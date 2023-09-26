import { TestBed } from '@angular/core/testing';

import { MenuShowServiceService } from './menu-show-service.service';

describe('MenuShowServiceService', () => {
  let service: MenuShowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuShowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
