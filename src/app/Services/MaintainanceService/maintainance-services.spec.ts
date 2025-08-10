import { TestBed } from '@angular/core/testing';

import { MaintainanceServices } from './maintainance-services';

describe('MaintainanceServices', () => {
  let service: MaintainanceServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintainanceServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
