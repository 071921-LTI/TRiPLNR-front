import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Trip } from 'src/app/models/trip'

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  constructor(private tripService: TripServiceService, private router:Router) { }

  destination: String = '';
  tripName: String = '';
  manager: String = '';
  error: String = '';

  trip?:Trip;
  
  token = sessionStorage.getItem("token");
  //either pass token through with trip data or 
  //add new header



  createTrip(): void {
    this.trip = {
      destination: this.destination,
      tripName: this.tripName
    }
    this.tripService.create(this.trip).subscribe(
      response => {
        if(response != null){
          this.router.navigate(['/trip-dashboard']);
        } else {
        this.error = "Trip Creation Error"
      }
    )
  }

  ngOnInit(): void {
  }

}
