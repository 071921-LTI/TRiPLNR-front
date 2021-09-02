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
    this.tripService.getTrips(this.token).subscribe(
      response => {this.trips = response;

      for(let i = 0; i< this.trips.length; i++){


      if(this.trips[i].startTime === null) {

        this.futureTrips.push(this.trips[i]);

      }
      if(this.trips[i].startTime !== null && this.trips[i].endTime === null){

        this.currentTrips.push(this.trips[i]);
      }
      if(this.trips[i].startTime !== null && this.trips[i].endTime !== null){

        this.pastTrips.push(this.trips[i]);
      }
      
    }
   
    
  })
    
    }
openTrip(trip:Trip){

  sessionStorage.setItem('tripId', trip.tripId?.toString() || '');
  this.router.navigate(['/trip-dashboard']);

}
    
}

