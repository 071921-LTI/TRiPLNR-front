import { TestBed } from '@angular/core/testing';

import { HomeGuardService } from './home-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
describe('HomeGuardService', () => {
  let service: HomeGuardService;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [RouterTestingModule,HttpClientTestingModule,AuthModule.forRoot(testConfig)],
      providers: [Auth0ServiceService]});
    service = TestBed.inject(HomeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
