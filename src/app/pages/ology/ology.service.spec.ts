import { TestBed } from '@angular/core/testing';

import { OlogyService } from './ology.service';

describe('OlogyService', () => {
  let service: OlogyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlogyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
