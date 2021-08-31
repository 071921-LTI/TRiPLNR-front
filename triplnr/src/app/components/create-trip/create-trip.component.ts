import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Trip } from 'src/app/models/trip'
import { User } from 'src/app/models/user';

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
  token?:string;
  trip?:Trip;
  user?:User;

  
  //either pass token through with trip data or 
  //add new header



  createTrip(): void {

    sessionStorage.setItem("token", "1:string");
    this.token= sessionStorage.getItem("token") || '';
  
    console.log(this.token);
    
    
    this.trip = {
      destination: this.destination,
      tripName: this.tripName
    }
    this.tripService.create(this.trip, this.token).subscribe(
      response => {
        if(response != null){
          this.router.navigate(['/trip-dashboard']);
        } else {
        this.error = "Trip Creation Error";
      }
    }
    )
  }

  ngOnInit(): void {
  }

}
