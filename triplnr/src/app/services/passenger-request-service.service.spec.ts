import { TestBed } from '@angular/core/testing';

import { PassengerRequestServiceService } from './passenger-request-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PassengerRequestServiceService', () => {
  let service: PassengerRequestServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
