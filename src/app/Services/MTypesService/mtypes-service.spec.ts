import { TestBed } from '@angular/core/testing';

import { MtypesService } from './mtypes-service';

describe('MtypesService', () => {
  let service: MtypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
