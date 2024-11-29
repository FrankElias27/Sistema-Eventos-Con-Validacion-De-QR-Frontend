import { TestBed } from '@angular/core/testing';

import { EmaillogService } from './emaillog.service';

describe('EmaillogService', () => {
  let service: EmaillogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmaillogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
