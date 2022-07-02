import { TestBed } from '@angular/core/testing';

import { PracticallaboratoryService } from './practicallaboratory.service';

describe('PracticallaboratoryService', () => {
  let service: PracticallaboratoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticallaboratoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
