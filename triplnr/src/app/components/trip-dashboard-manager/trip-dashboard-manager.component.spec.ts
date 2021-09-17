import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDashboardManagerComponent } from './trip-dashboard-manager.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('TripDashboardManagerComponent', () => {
  let component: TripDashboardManagerComponent;
  let fixture: ComponentFixture<TripDashboardManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDashboardManagerComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDashboardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create trip dashboard manager Component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'TripDashboardManager'`, () => {
    expect(component.title).toEqual('TripDashboardManager');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
});
