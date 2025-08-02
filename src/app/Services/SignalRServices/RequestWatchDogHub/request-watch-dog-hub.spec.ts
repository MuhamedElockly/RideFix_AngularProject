import { TestBed } from '@angular/core/testing';

import { RequestWatchDogHub } from './request-watch-dog-hub';

describe('RequestWatchDogHub', () => {
  let service: RequestWatchDogHub;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestWatchDogHub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
