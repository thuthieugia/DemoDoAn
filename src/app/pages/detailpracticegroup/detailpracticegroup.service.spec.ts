import { TestBed } from '@angular/core/testing';

import { DetailpracticegroupService } from './detailpracticegroup.service';

describe('DetailpracticegroupService', () => {
  let service: DetailpracticegroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailpracticegroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
