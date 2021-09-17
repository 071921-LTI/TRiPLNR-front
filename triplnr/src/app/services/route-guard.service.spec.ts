import { TestBed } from '@angular/core/testing';

import { RouteGuardService } from './route-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
describe('RouteGuardService', () => {
  let service: RouteGuardService;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule,AuthModule.forRoot(testConfig)],
      providers: [Auth0ServiceService]});
    service = TestBed.inject(RouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
