import { TestBed } from '@angular/core/testing';

import { WeatherServiceService } from './weather-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('WeatherServiceService', () => {
  let service: WeatherServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
