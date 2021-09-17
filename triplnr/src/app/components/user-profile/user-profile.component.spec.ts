import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule], 
      providers: [UserServiceService]
    })
    .compileComponents();
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create User Profile Component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'User Profile'`, () => {
    expect(component.title).toEqual('User Profile');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created UserService', () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
   });

   it('should add Friend', () => {
    expect(component.addFriend).toBeTruthy();
   });

   it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
   });

});
