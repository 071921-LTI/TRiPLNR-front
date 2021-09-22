import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user';
import { CreateTripComponent } from './create-trip.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
describe('CreateTripComponent', () => {
  let component: CreateTripComponent;
  let fixture: ComponentFixture<CreateTripComponent>;
  let TestStreet: "565 Long Hill Road";
  let TestCity: "Groton";
  let TestState: "CT";
  let TestZip: "06340";
  let testUser:User[]=[{userId:1,sub:"",firstName:"fName",lastName:"lName",
                        profilePic:"",bio:"Test bio",address:"123 street",trips:'',
                        friends:''}];
  let passengers: Array<User> = [{userId:1,sub:"",firstName:"fName",lastName:"lName",
  profilePic:"",bio:"Test bio",address:"123 street",trips:'',
  friends:''}];
  let passengerDeck: Array<User> = [];
  let stopStreetAddress :string = '1234';
  let stopCity :string = "space";
  let stopState :string = "NY";
  let stopZip :string = "77888";
  let stops: Array<string> = ["a stop"];
  let startTime: string = '2021-09-16T14:23';
  let endTime: string = '2021-09-23T14:23';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ CreateTripComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should call ngOninit',()=>{
    component.ngOnInit();
    expect(fixture.componentInstance.ngOnInit).toHaveBeenCalled
  })
  it('it should should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should should be more than 0', () => {
    fixture.componentInstance.stopStreetAddress = TestStreet;
    fixture.componentInstance.stopCity = TestCity;
    fixture.componentInstance.stopState = TestState;
    fixture.componentInstance.stopZip = TestZip;
    fixture.componentInstance.addStops();
    expect(fixture.componentInstance.stops.length).toBeGreaterThan(0);
  });
  it('it should should remove the row it just made', () => {
    fixture.componentInstance.stopStreetAddress = TestStreet;
    fixture.componentInstance.stopCity = TestCity;
    fixture.componentInstance.stopState = TestState;
    fixture.componentInstance.stopZip = TestZip;
    fixture.componentInstance.addStops();
    fixture.componentInstance.RemoveThisStop(
      fixture.componentInstance.stopStreetAddress + "," +
      fixture.componentInstance.stopCity + "," +
      fixture.componentInstance.stopState + "," +
      fixture.componentInstance.stopZip
    );
    expect(fixture.componentInstance.stops.length).toEqual(0);
  })
  it('it should should add a passenger to deck',()=>{
    fixture.componentInstance.addPassengerToDeck(testUser[0]);
    expect(fixture.componentInstance.passengerDeck.length).toBeGreaterThan(0)
  })
  it('it should remove a passenger from deck',()=>{
    fixture.componentInstance.addPassengerToDeck(testUser[0]);
    fixture.componentInstance.removePassengerFromDeck(testUser[0])
    expect(fixture.componentInstance.passengerDeck.length).toEqual(0)
  })
  it('it should move passenger from current passengers',()=>{
    fixture.componentInstance.addPassengers();
    expect(fixture.componentInstance.passengers.length).toEqual(0)
  })
  it('it should add a stop',()=>{
    fixture.componentInstance.addStops();
    expect(fixture.componentInstance.stops.length).toBeGreaterThan(0)
  })
  it('it should remove a stop',()=>{
    fixture.componentInstance.RemoveThisStop(0);
    expect(fixture.componentInstance.stops.length).toEqual(0)
  })
  it('should change the trip address',()=>{
    let address: any = {"street":"744 walker","city":"toen","state asd":"T T","zip":"77777"};
    fixture.componentInstance.handleAddressChangeTrip(address);
    expect(component.handleAddressChangeTrip).toBeTruthy();
  })
  it('should calculate currDayDiff',()=>{
    fixture.componentInstance.createTrip();
    expect(fixture.componentInstance);
  })
});