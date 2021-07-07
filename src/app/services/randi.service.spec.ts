import { TestBed } from '@angular/core/testing';

import { RandiService } from './randi.service';

describe('RandiService', () => {
  let service: RandiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
