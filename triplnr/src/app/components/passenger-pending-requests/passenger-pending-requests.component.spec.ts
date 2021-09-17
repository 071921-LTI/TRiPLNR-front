import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerPendingRequestsComponent } from './passenger-pending-requests.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PassengerRequestServiceService } from 'src/app/services/passenger-request-service.service';

describe('PassengerPendingRequestsComponent', () => {
  let component: PassengerPendingRequestsComponent;
  let fixture: ComponentFixture<PassengerPendingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
      providers:[PassengerRequestServiceService],
      declarations: [ PassengerPendingRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerPendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PassengerPendingRequestsComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PassengerPendingRequestsComponent'`, () => {
    expect(component.title).toEqual('PassengerPendingRequestsComponent');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created UserService', () => {
    const service: PassengerRequestServiceService = TestBed.get(PassengerRequestServiceService);
    expect(service).toBeTruthy();
   });

   it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
   });

   it('should get requests', () => {
    expect(component.getRequests).toBeTruthy();
   });

   it('should get requests fail', () => {
    expect(component.getRequests()).toBeFalsy();
   });

   it('should accept requests', () => {
    expect(component.acceptRequest).toBeTruthy();
   });

   it('should deny requests', () => {
    expect(component.denyRequest).toBeTruthy();
   });

   it('should call prettierDatesAndSavePass', () => {
    expect(component.prettierDatesAndSavePass).toBeTruthy();
   });

});
