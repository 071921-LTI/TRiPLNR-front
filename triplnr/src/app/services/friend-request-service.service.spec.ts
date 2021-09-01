import { TestBed } from '@angular/core/testing';

import { FriendRequestServiceService } from './friend-request-service.service';

describe('FriendRequestServiceService', () => {
  let service: FriendRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
