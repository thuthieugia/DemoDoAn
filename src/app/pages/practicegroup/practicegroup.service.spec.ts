import { TestBed } from '@angular/core/testing';

import { PracticegroupService } from './practicegroup.service';

describe('PracticegroupService', () => {
  let service: PracticegroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticegroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
