import { TestBed } from '@angular/core/testing';

import { GlbalServiceService } from './glbal-service.service';

describe('GlbalServiceService', () => {
  let service: GlbalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlbalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
