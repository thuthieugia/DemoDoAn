import { TestBed } from '@angular/core/testing';

import { DividepracticegroupsService } from './dividepracticegroups.service';

describe('DividepracticegroupsService', () => {
  let service: DividepracticegroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DividepracticegroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
