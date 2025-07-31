import { TestBed } from '@angular/core/testing';

import { Technincalservice } from './technincalservice';

describe('Technincalservice', () => {
  let service: Technincalservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Technincalservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
