import { TestBed } from '@angular/core/testing';

import { PorteroGuard } from './portero.guard';

describe('PorteroGuard', () => {
  let guard: PorteroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PorteroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
