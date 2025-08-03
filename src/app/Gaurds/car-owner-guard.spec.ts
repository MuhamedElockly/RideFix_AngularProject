import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { carOwnerGuard } from './car-owner-guard';

describe('carOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => carOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
