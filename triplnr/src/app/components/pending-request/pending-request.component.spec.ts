import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestComponent } from './pending-request.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FriendRequest } from 'src/app/models/friend-request';
import { FriendRequestServiceService } from 'src/app/services/friend-request-service.service';
describe('PendingRequestComponent', () => {
  let component: PendingRequestComponent;
  let fixture: ComponentFixture<PendingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule], 
      providers: [FriendRequestServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PendingRequestComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PendingRequestComponent Profile'`, () => {
    expect(component.title).toEqual('PendingRequestComponent');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created FriendRequestService', () => {
    const service: FriendRequestServiceService = TestBed.get(FriendRequestServiceService);
    expect(service).toBeTruthy();
   });

   it('should call ngOninit', () => {
    expect(component.ngOnInit).toBeTruthy();
   });

   it('should call getPotentialFriend', () => {
    expect(component.getPotentialFriend).toBeTruthy();
   });

   it('should get request', () => {
    expect(component.getRequests).toBeTruthy();
   });

   it('should accept request', () => {
    expect(component.acceptRequest).toBeTruthy();
   });

   it('should deny request', () => {
    expect(component.denyRequest).toBeTruthy();
   });

});
