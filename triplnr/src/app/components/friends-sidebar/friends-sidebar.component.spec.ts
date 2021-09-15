import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendsSidebarComponent } from './friends-sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
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
      declarations: [ FriendsSidebarComponent ]
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
  it('should have a response',()=>{
    expect(component.ngOnInit).toHaveBeenCalled
  })
  it('navigate', () => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.ngOnInit();
});
});