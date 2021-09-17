import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot(testConfig)],
      providers: [
        Auth0ServiceService,
        UserServiceService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create homepage', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'homepage'`, () => {
    expect(component.title).toEqual('homepage');
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

   it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
   });

});
