import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ComplexOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { Component } from '@angular/core';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule, 
        HttpClientTestingModule, 
        AuthModule.forRoot(testConfig),
      ],
      providers:[Auth0ServiceService,UserServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Banner'`, () => {
    expect(component.title).toEqual('banner');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created Auth0ServiceService', () => {
    const service: Auth0ServiceService = TestBed.get(Auth0ServiceService);
    expect(service).toBeTruthy();
   });

   it('should be created UserService', () => {
    const service: UserServiceService= TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
   });

   it('should call ngOnInit()', () => {
    expect(component.ngOnInit).toBeTruthy();
   });


});
