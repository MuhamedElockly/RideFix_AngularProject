import { TestBed } from '@angular/core/testing';

import { GetLocation } from './get-location';

describe('GetLocation', () => {
  let service: GetLocation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLocation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
