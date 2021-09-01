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

  passengers: Array<User> = [];
  
  userId?: number;
  
  error: String = '';
  
  token?:string;
  user?:User;
  trip?:Trip;


  addPassenger(): void{
    this.user = {
      userId: this.userId
    }
    console.log(typeof this.userId)
      if(typeof this.userId === 'number'){
        this.passengers.push(this.user)
        console.log(this.passengers);
       this.userId = undefined;
      } else { 
        this.userId = undefined;
      }
      
    
  }
 

  createTrip(): void {

    this.token= sessionStorage.getItem("token") || '';
  
    console.log(this.token);
    
    this.trip = {
      destination: this.destination,
      tripName: this.tripName,
      passengers: this.passengers

    } 
    console.log(this.trip);
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
