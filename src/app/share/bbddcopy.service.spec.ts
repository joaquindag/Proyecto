import { TestBed } from '@angular/core/testing';

import { BbddcopyService } from './bbddcopy.service';

describe('BbddcopyService', () => {
  let service: BbddcopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BbddcopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
