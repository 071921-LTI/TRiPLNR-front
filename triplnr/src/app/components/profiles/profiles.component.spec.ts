import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesComponent } from './profiles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesComponent ],
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
});
