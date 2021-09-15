import { TestBed } from '@angular/core/testing';

import { FriendRequestServiceService } from './friend-request-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FriendRequestServiceService', () => {
  let service: FriendRequestServiceService;

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
    service = TestBed.inject(FriendRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
