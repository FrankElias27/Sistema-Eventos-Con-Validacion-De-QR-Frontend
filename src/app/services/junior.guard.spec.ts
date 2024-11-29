import { TestBed } from '@angular/core/testing';

import { JuniorGuard } from './junior.guard';

describe('JuniorGuard', () => {
  let guard: JuniorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JuniorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
