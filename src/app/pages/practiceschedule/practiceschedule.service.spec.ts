import { TestBed } from '@angular/core/testing';

import { PracticescheduleService } from './practiceschedule.service';

describe('PracticescheduleService', () => {
  let service: PracticescheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticescheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
