import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilesComponent } from './profiles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesComponent ,FilterPipe ],
      imports: [RouterTestingModule,HttpClientTestingModule,AuthModule.forRoot(testConfig)],
      providers: [
        Auth0ServiceService,
        UserServiceService],
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create Profile', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'profiles'`, () => {
    expect(component.title).toEqual('profiles');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created UserServiceService', () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
   });

   it('should be created Auth0ServiceService', () => {
    const service: Auth0ServiceService = TestBed.get(Auth0ServiceService);
    expect(service).toBeTruthy();
   });

   it('should call ngOninit', () => {
    expect(component.ngOnInit).toBeTruthy();
   });

   it('should call filterUsers', () => {
    expect(component.filterUsers).toBeTruthy();
   });

   it('should call openProfile', () => {
    expect(component.openProfile).toBeTruthy();
   });
});