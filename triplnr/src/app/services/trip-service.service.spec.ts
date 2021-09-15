import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { TripServiceService } from './trip-service.service';

describe('TripServiceService', () => {
  let service: TripServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule], 
      providers: [TripServiceService]
    })

  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
