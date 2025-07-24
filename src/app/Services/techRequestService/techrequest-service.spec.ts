import { TestBed } from '@angular/core/testing';

import { TechrequestService } from './techrequest-service';

describe('TechrequestService', () => {
  let service: TechrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
