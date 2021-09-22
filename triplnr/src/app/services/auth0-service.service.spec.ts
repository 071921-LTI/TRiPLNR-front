import { TestBed } from '@angular/core/testing';

import { Auth0ServiceService } from './auth0-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
describe('Auth0ServiceService', () => {
  let service: Auth0ServiceService;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot(testConfig)],
      providers: [
        Auth0ServiceService,
        ],
    });
    service = TestBed.inject(Auth0ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
