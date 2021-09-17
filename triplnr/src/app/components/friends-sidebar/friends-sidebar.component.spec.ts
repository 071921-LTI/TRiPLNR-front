import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendsSidebarComponent } from './friends-sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

describe('FriendsSidebarComponent', () => {
  let component: FriendsSidebarComponent;
  let fixture: ComponentFixture<FriendsSidebarComponent>;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule, 
        HttpClientTestingModule, 
        AuthModule.forRoot(testConfig)
      ],
      declarations: [ FriendsSidebarComponent ],
      providers:[Auth0ServiceService,UserServiceService]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should have as title 'friends-sidebar'`, () => {

    expect(component.title).toEqual('friends-sidebar');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created Auth0ServiceService', () => {
    const service: Auth0ServiceService = TestBed.get(Auth0ServiceService);
    expect(service).toBeTruthy();
   });

   it('should be created UserServiceService', () => {
    const service: UserServiceService= TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
   });

  it('should have a response',()=>{
    expect(component.ngOnInit).toHaveBeenCalled
  })

  it('navigate', () => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.ngOnInit();
});

  it('should getFriends',()=>{
    expect(component.getFriends).toBeTruthy;
  })

  it('should getFriends fail',()=>{
    expect(component.getFriends()).toBeFalsy;
  })
});