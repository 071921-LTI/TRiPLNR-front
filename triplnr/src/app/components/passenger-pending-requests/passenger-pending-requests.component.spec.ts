import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerPendingRequestsComponent } from './passenger-pending-requests.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PassengerPendingRequestsComponent', () => {
  let component: PassengerPendingRequestsComponent;
  let fixture: ComponentFixture<PassengerPendingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
      declarations: [ PassengerPendingRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerPendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
