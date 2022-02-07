import { TestBed } from '@angular/core/testing';

import { FormAuthGuard } from './form-auth.guard';

describe('FormAuthGuard', () => {
  let guard: FormAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
