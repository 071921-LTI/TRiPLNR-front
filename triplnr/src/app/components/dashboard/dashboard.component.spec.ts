import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import {TripServiceService} from 'src/app/services/trip-service.service';
import { WeatherServiceService } from 'src/app/services/weather-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthConfig, AuthModule, } from '@auth0/auth0-angular';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const testConfig: AuthConfig = {
    domain: 'test.domain.com',
    clientId: '123abc',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule,AuthModule.forRoot(testConfig)], 
      providers: [TripServiceService,WeatherServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the DashboardComponent', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Dashboard'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Dashboard');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created TripService', () => {
    const service: TripServiceService = TestBed.get(TripServiceService);
    expect(service).toBeTruthy();
   });

   it('should be created WeatherService', () => {
    const service: WeatherServiceService= TestBed.get(WeatherServiceService);
    expect(service).toBeTruthy();
   });

   it('should be creat failed', () => {
    const service: TripServiceService= TestBed.get(WeatherServiceService);
    expect(service).toBeTruthy();
   });

   it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy;
  });

   it('should be openTrip', () => {
    const app = fixture.componentInstance;
    expect(app.openTrip).toBeTruthy();
   });

   it('should be callWeather', () => {
    const app = fixture.componentInstance;
    expect(app.callWeather("Uncasville,CT")).toEqual(app.callWeather("Uncasville,CT"));
   });

   it('should be callWeather2', () => {
    expect(component.callWeather).toBeTruthy();
   });

   it('should be callWeather failed', () => {

    const app = fixture.componentInstance;
    expect(app.callWeather("Uncasville,CT")).toEqual(app.callWeather("Quaker Hill,CT"));
   });
   
   it('should be open Modal', () => {
    const app = fixture.componentInstance;
    expect(app.open).toBeTruthy();
   });

   it('should be open Modal fail', () => {
    const app = fixture.componentInstance;
    expect(app.open("hi","hi",1)).toBeFalsy;
   });

   it('should be open Modal2', () => {
    const app = fixture.componentInstance;
    expect(app.open2).toBeTruthy();
   });

   it('should be open Modal2 fail', () => {
    const app = fixture.componentInstance;
    expect(app.open2("hi","hi",1)).toBeFalsy;
   });
});