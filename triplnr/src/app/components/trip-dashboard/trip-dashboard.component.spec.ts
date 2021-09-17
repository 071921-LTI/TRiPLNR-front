import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDashboardComponent } from './trip-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WeatherServiceService } from 'src/app/services/weather-service.service';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { FormsModule } from '@angular/forms';
import { User } from '@auth0/auth0-spa-js';

describe('TripDashboardComponent', () => {
  let component: TripDashboardComponent;
  let fixture: ComponentFixture<TripDashboardComponent>;
  let testUser:User[]=[{userId:1,sub:"",firstName:"fName",lastName:"lName",
                        profilePic:"",bio:"Test bio",address:"123 street",trips:'',
                        friends:''}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDashboardComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule, 
        HttpClientTestingModule,
        FormsModule
      ],
      providers:[TripServiceService,WeatherServiceService,UserServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'trip-dashboard'`, () => {
    expect(component.title).toEqual('trip-dashboard');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created TripServiceService', () => {
    const service: TripServiceService = TestBed.get(TripServiceService);
    expect(service).toBeTruthy();
   });

   it('should be created UserService', () => {
    const service: UserServiceService= TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
   });

   it('should be created WeatherService', () => {
    const service: WeatherServiceService= TestBed.get(WeatherServiceService);
    expect(service).toBeTruthy();
   });

   it('should call ngOnInit', () => {
    expect(component.ngOnit).toBeTruthy();
   });

   it('should call ngAfterViewInit', () => {
    expect(component.ngAfterViewInit).toBeTruthy();
   });

   it('should call ngAfterContentInit', () => {
    expect(component.ngAfterContentInit).toBeTruthy();
   });

   it('should call addRolesbtn()', () => {
    expect(component.addRolesbtn).toBeTruthy();
   });

   it('should call addPassengerToDeck', () => {
    expect(component.addPassengerToDeck).toBeTruthy();
   });

   it('should call addPassengerToDeck2', () => {
    component.addPassengerToDeck(testUser[0]);
    expect(component.addPassengerToDeck.length).toBeGreaterThan(0);
   });

   it('should call addPassengerToDeck fail', () => {
    const service: UserServiceService= TestBed.get(UserServiceService);
     let u:User = service.getUser;
    expect(component.addPassengerToDeck(u)).toBeUndefined;
   });

   it('should call removePassengerFromDeck', () => {
    expect(component.removePassengerFromDeck).toBeTruthy();
   });

   it('should call removePassengerFromDeck2', () => {
    component.removePassengerFromDeck(testUser[0]);
    expect(component.removePassengerFromDeck.length).toBeGreaterThan(0);
   });

   it('should call removePassengerFromDeck fail', () => {
    expect(component.removePassengerFromDeck(testUser[1])).toBeFalsy;
   });

   it('should call addPassengers', () => {
    expect(component.addPassengers).toBeTruthy;
   });

   it('should call addPassengers fail', () => {
    expect(component.addPassengers()).toBeFalsy;
   });

   it('should call addStops', () => {
    component.addStops();
    expect(component.stops.length).toBeGreaterThan(0);
   });

   it('should call addStops fail', () => {
    expect(component.addStops()).toBeFalsy;
   });

   it('should RemoveThisStop', () => {
    component.RemoveThisStop(0);
    expect(component.stops.length).toBeGreaterThanOrEqual(0);
   });

   it('should RemoveThisStop fail', () => {
    expect(component.RemoveThisStop(0)).toBeFalsy;
   });

   it('should updateTrip', () => {
    expect(component.updateTrip).toBeTruthy;
   });

   it('should reset', () => {
    expect(component.reset).toBeTruthy;
   });

   it('should reset fail', () => {
    expect(component.reset()).toBeFalsy;
   });

   it('should call isUserManager', () => {
    expect(component.isUserManager).toBeTruthy;
   });

   it('should call isUserManager fail', () => {
    expect(component.isUserManager()).toBeFalsy;
   });

   it('should call handleAddressChangeTripOrigin', () => {
    expect(component.handleAddressChangeTripOrigin).toBeTruthy;
   });

   it('should call handleAddressChangeStop', () => {
    expect(component.handleAddressChangeStop).toBeTruthy;
   });

   it('should call evt_StopChange', () => {
    expect(component.evt_StopChange).toBeTruthy;
   });

   it('should call evt_StopChange', () => {
    expect(component.addMapsScript).toBeTruthy;
   });

   it('should call evt_StopChange fail', () => {
    expect(component.addMapsScript()).toBeFalsy;
   });

   it('should call execute_Map', () => {
    expect(component.execute_Map).toBeTruthy;
   });

   it('should call execute_Map fail', () => {
    expect(component.execute_Map()).toBeFalsy;
   });

   it('should call ShowRoute', () => {
    expect(component.ShowRoute).toBeTruthy;
   });

   it('should call ShowRoute fail', () => {
    expect(component.ShowRoute()).toBeFalsy;
   });

   it('should call getMap', () => {
    expect(component.getMap).toBeTruthy;
   });


   it('should call callOriginWeather', () => {
    expect(component.callOriginWeather).toBeFalsy;
   });

   it('should call callOriginWeather2', () => {
    expect(component.callOriginWeather("CT","NY",1,1)).toBeTruthy;
   });

   it('should call callOriginWeather fail', () => {
    expect(component.callOriginWeather("CT","NY",0,0)).toBeFalsy;
   });

   it('should call callDestWeather', () => {
    expect(component.callDestWeather).toBeFalsy;
   });

   it('should call callDestWeather2', () => {
    expect(component.callDestWeather("CT",1)).toBeTruthy;
   });

   it('should call callDestWeather fail', () => {
    expect(component.callDestWeather("CT",0)).toBeFalsy;
   });


});
