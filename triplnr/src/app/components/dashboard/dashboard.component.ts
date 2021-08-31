import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  trips : Trip[]= [];
  token?:string;
  currentTrips : Trip[] = [];
  futureTrips : Trip[] = [];
  pastTrips : Trip[] = [];
  
  constructor(private tripService: TripServiceService, private router:Router) { }

  ngOnInit(): void {
    this.token= sessionStorage.getItem("token") || '';
    console.log(this.token);
    this.tripService.getTrips(this.token).subscribe(
      response => {this.trips = response;
      console.log("here" + this.trips.length + "Trip");
      for(let i = 0; i< this.trips.length; i++){
        
        console.log("In for loop");

      if(this.trips[i].startTime === null) {
        console.log("future");
        
        this.futureTrips.push(this.trips[i]);
        console.log(this.futureTrips);
      }
      if(this.trips[i].startTime !== null && this.trips[i].endTime === null){
        console.log("current");
        this.currentTrips.push(this.trips[i]);
      }
      if(this.trips[i].startTime !== null && this.trips[i].endTime !== null){
        console.log("past");

        this.pastTrips.push(this.trips[i]);
      }
      
    }
   
    
  })
  console.log(this.futureTrips);
    console.log(this.currentTrips);
    console.log(this.pastTrips);
    
    }

}

