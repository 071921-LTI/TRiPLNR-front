import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Router } from '@angular/router';
import { WeatherServiceService } from 'src/app/services/weather-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  trips : Trip[]= [];
  token?:string;
  //list of trips sorted by time
  currentTrips : Trip[] = [];
  futureTrips : Trip[] = [];
  pastTrips : Trip[] = [];
  
  constructor(private tripService: TripServiceService, private router:Router, private weather:WeatherServiceService) { }

  ngOnInit(): void {
    
    //Athorization token containing `[userId]:[username]` of current user
    this.token= sessionStorage.getItem("token") || '';
    //calls getTrips method in trip-sevice.sevice
    this.tripService.getTrips(this.token).subscribe(
      response => {this.trips = response;

      //loops through all trips and sorts into futre current and past trips list by startTime
      for(let i = 0; i< this.trips.length; i++){
        let startTime = new Date(this.trips[i].startTime!).getTime();
        let endTime = new Date(this.trips[i].endTime!).getTime();
        let timeNow = Date.now();
        let addressFrom = this.trips[i].origin;
        let addressTo = this. trips[i].destination;
        // let currWeaher = this.weather.getCurrentWeather(addressFrom)
        if(startTime > timeNow) {
          
          this.futureTrips.push(this.trips[i]);

        }
        else if(startTime < timeNow && endTime > timeNow){

          this.currentTrips.push(this.trips[i]);
        }
        else if(endTime < timeNow){

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

