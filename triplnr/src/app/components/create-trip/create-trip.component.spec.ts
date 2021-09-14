import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user';

import { CreateTripComponent } from './create-trip.component';

describe('CreateTripComponent', () => {
  let component: CreateTripComponent;
  let fixture: ComponentFixture<CreateTripComponent>;
  let TestStreet: "565 Long Hill Road";
  let TestCity: "Groton";
  let TestState: "CT";
  let TestZip: "06340";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be more than 0', () => {
    const fixture = TestBed.createComponent(CreateTripComponent);
    fixture.componentInstance.stopStreetAddress = TestStreet;
    fixture.componentInstance.stopCity = TestCity;
    fixture.componentInstance.stopState = TestState;
    fixture.componentInstance.stopZip = TestZip;
    fixture.componentInstance.addStops();
    expect(fixture.componentInstance.stops.length).toBeGreaterThan(0);
  });

  it('should remove the row it just made', () => {
    const fixture = TestBed.createComponent(CreateTripComponent);
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
});
