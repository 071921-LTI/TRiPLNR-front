import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { TripServiceService } from 'src/app/services/trip-service.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  constructor(private tripService: TripServiceService, private router:Router) { }

  destination: String = '';
  origin: String = '';
  tripName: String = '';
  startTime: String = '';

  ngOnInit(): void {
  }

}
