import { TestBed } from '@angular/core/testing';

import { Ecomerceservice } from './ecomerceservice';

describe('Ecomerceservice', () => {
  let service: Ecomerceservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ecomerceservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
