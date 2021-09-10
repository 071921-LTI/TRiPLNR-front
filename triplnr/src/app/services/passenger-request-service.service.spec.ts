import { TestBed } from '@angular/core/testing';

import { PassengerRequestServiceService } from './passenger-request-service.service';

describe('PassengerRequestServiceService', () => {
  let service: PassengerRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
