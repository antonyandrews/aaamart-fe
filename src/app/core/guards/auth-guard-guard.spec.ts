import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AUTH_GUARD } from './auth-guard-guard';

describe('authGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => AUTH_GUARD(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
