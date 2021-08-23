import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDashboardManagerComponent } from './trip-dashboard-manager.component';

describe('TripDashboardManagerComponent', () => {
  let component: TripDashboardManagerComponent;
  let fixture: ComponentFixture<TripDashboardManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDashboardManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDashboardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
