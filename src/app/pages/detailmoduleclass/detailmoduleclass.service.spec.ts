import { TestBed } from '@angular/core/testing';

import { DetailmoduleclassService } from './detailmoduleclass.service';

describe('DetailmoduleclassService', () => {
  let service: DetailmoduleclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailmoduleclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
