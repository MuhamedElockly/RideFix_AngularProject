import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { techGuard } from './tech-guard';

describe('techGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => techGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
