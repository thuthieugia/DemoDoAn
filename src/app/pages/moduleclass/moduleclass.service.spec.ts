import { TestBed } from '@angular/core/testing';

import { ModuleclassService } from './moduleclass.service';

describe('ModuleclassService', () => {
  let service: ModuleclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
