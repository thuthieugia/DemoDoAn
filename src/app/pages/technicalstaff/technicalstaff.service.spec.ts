import { TestBed } from '@angular/core/testing';

import { TechnicalstaffService } from './technicalstaff.service';

describe('TechnicalstaffService', () => {
  let service: TechnicalstaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalstaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
