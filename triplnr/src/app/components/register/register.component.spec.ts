import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule,AuthModule.forRoot(testConfig)],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'register'`, () => {
    expect(component.title).toEqual('register');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created UserServiceService', () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
   });

   it('should be created AuthService', () => {
    const service: Auth0ServiceService = TestBed.get(Auth0ServiceService);
    expect(service).toBeTruthy();
   });

   it('should register', () => {
    expect(component.register).toBeTruthy();
   });

   it('should get address', () => {
    expect(component.getAddress).toBeTruthy();
   });

   it('should ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
   });
});
