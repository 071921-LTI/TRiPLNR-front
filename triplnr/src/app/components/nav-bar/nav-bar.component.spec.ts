import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot(testConfig)],
      providers: [
        Auth0ServiceService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'nav-bar'`, () => {
    expect(component.title).toEqual('nav-bar');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created AuthService', () => {
    const service: Auth0ServiceService = TestBed.get(Auth0ServiceService);
    expect(service).toBeTruthy();
   });

   it('should be call ogOnInit', () => {
    expect(component.ngOnInit).toBeTruthy;
   });

   it('should be clear Storage', () => {
    expect(component.clearStorage).toBeTruthy;
   });

   it('should be check login', () => {
    expect(component.checkLogin).toBeTruthy;
   });
});
